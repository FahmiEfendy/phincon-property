const _ = require("lodash");
const Boom = require("boom");
const Redis = require("redis");
const { v4: uuidv4 } = require("uuid");

const db = require("../../models");
const maps = require("../../utils/maps");
const redis = require("../services/redis");
const generalHelper = require("../helpers/generalHelper");
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
  cloudinaryDeleteFolder,
} = require("../../utils/cloudinary");

const fileName = "server/helpers/houseHelper.js";

const postCreateHouse = async (objectData) => {
  const {
    title,
    description,
    price,
    address,
    city,
    state,
    zipCode,
    bedrooms,
    bathrooms,
    role,
    images,
    user_id,
  } = objectData;

  let id;
  let imageResult;
  let imageList = [];

  try {
    if (role === "customer") {
      throw Boom.unauthorized("You have no access to create house!");
    }

    id = uuidv4();
    const coordinates = await maps.addressToCoordinates(address);
    for (i in images) {
      imageResult = await uploadToCloudinary(
        images[i],
        "image",
        `image/house/${id}`
      );

      if (!imageResult?.url) {
        throw Boom.badImplementation(imageResult.error);
      }

      imageList.push({
        image_url: imageResult?.url,
        image_id: imageResult?.public_id,
      });
    }

    const newHouse = await db.Houses.create({
      id,
      title,
      description,
      price,
      location: {
        address,
        city,
        state,
        zipCode,
        coordinates,
      },
      bedrooms,
      bathrooms,
      images: imageList,
      seller_id: user_id,
    });

    console.log([fileName, "POST Create House", "INFO"]);

    return Promise.resolve(newHouse);
  } catch (err) {
    console.log([fileName, "POST Create House", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getHouseList = async (query) => {
  try {
    let houseList = [];

    if (query?.seller_id) {
      houseList = await redis.getKey({ key: `house-${query.seller_id}` });

      if (houseList) {
        console.log("Seller houseList Redis Found");

        houseList = JSON.parse(houseList);
      } else {
        console.log("Seller houseList Redis Not Found");

        houseList = await db.Houses.findAll({
          where: { seller_id: query.seller_id },
        });

        houseList = houseList.map((data) => data.dataValues);

        await redis.setKey({
          key: `house-${query.seller_id}`,
          value: JSON.stringify(houseList),
        });
      }
    } else {
      houseList = await redis.getKey({ key: "house" });

      if (houseList) {
        console.log("houseList Redis Found");

        houseList = JSON.parse(houseList);
      } else {
        console.log("houseList Redis Not Found");

        houseList = await db.Houses.findAll({
          include: [
            {
              model: db.Favorites,
              as: "favorites",
            },
          ],
        });

        houseList = houseList.map((data) => data.dataValues);

        await redis.setKey({ key: "house", value: JSON.stringify(houseList) });
      }
    }

    if (_.isEmpty(houseList)) {
      throw Boom.notFound("No house found!");
    }

    const parsedHouseList = houseList?.map((house) => {
      return {
        ...house,
        location: JSON.parse(house.location),
        images: JSON.parse(house.images),
        isFavorited: !_.isEmpty(
          house?.favorites?.find((data) => data.user_id === query?.user_id)
        ),
      };
    });

    console.log([fileName, "GET House List", "INFO"]);

    return Promise.resolve(parsedHouseList);
  } catch (err) {
    console.log([fileName, "GET House List", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getHouseDetail = async (params) => {
  const { id } = params;

  try {
    const selectedHouse = await db.Houses.findOne({
      where: { id },
      include: [
        {
          model: db.Users,
          as: "seller",
          attributes: ["id", "fullName"],
        },
        {
          model: db.Favorites,
          as: "favorites",
        },
      ],
    });

    if (_.isEmpty(selectedHouse)) {
      throw Boom.notFound(`Cannot find house with id of ${id}`);
    }

    const parsedHouseDetail = {
      ...selectedHouse.dataValues,
      location: JSON.parse(selectedHouse.dataValues.location),
      images: JSON.parse(selectedHouse.dataValues.images),
      countFavorites: selectedHouse.dataValues.favorites.length,
    };

    console.log([fileName, "GET House Detail", "INFO"]);

    return Promise.resolve(parsedHouseDetail);
  } catch (err) {
    console.log([fileName, "GET House Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const patchUpdateHouse = async (params, objectData) => {
  const { id } = params;
  const {
    title,
    description,
    price,
    address,
    city,
    state,
    zipCode,
    bedrooms,
    bathrooms,
    images,
    user_id,
  } = objectData;

  let selectedHouse;
  let imageList;
  let imageResult;
  let selectedHouseLocation;
  let coordinates;

  try {
    selectedHouse = await db.Houses.findOne({
      where: { id },
    });

    if (_.isEmpty(selectedHouse)) {
      throw Boom.notFound(`Cannot find house with id of ${id}!`);
    }

    if (user_id !== selectedHouse.seller_id) {
      throw Boom.unauthorized("You have no access to update this house!");
    }

    if (images) {
      imageList = JSON.parse(selectedHouse.dataValues.images);

      for (i in images) {
        imageResult = await uploadToCloudinary(
          images[i],
          "image",
          `image/house/${id}`
        );

        if (!imageResult?.url) {
          throw Boom.badImplementation(imageResult.error);
        }

        imageList.push({
          image_url: imageResult?.url,
          image_id: imageResult?.public_id,
        });
      }
    }

    selectedHouseLocation = JSON.parse(selectedHouse.dataValues.location);

    if (!_.isUndefined(address) && address !== selectedHouseLocation.address) {
      coordinates = await maps.addressToCoordinates(address);
    } else {
      coordinates = selectedHouseLocation.coordinates;
    }

    const newSelectedHouseLocation = {
      address: address || selectedHouseLocation.address,
      city: city || selectedHouseLocation.city,
      state: state || selectedHouseLocation.state,
      zipCode: zipCode || selectedHouseLocation.zipCode,
      coordinates,
    };

    await db.Houses.update(
      {
        title: title || selectedHouse.dataValues.title,
        description: description || selectedHouse.dataValues.description,
        price: price || selectedHouse.dataValues.price,
        location: newSelectedHouseLocation,
        bedrooms: bedrooms || selectedHouse.bedrooms,
        bathrooms: bathrooms || selectedHouse.bathrooms,
        images: imageList,
      },
      { where: { id } }
    );

    selectedHouse = await db.Houses.findOne({
      where: { id },
    });

    const parsedUpdatedSelectedHouse = {
      ...selectedHouse.dataValues,
      location: JSON.parse(selectedHouse.dataValues.location),
      images: JSON.parse(selectedHouse.dataValues.images),
    };

    console.log([fileName, "PATCH Update House", "INFO"]);

    return Promise.resolve(parsedUpdatedSelectedHouse);
  } catch (err) {
    console.log([fileName, "PATCH Update House", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const deleteHouseImage = async (params, objectData) => {
  const { id } = params;
  const { image_id, user_id } = objectData;

  let imageList;

  try {
    const selectedHouse = await db.Houses.findOne({ where: { id } });

    if (_.isEmpty(selectedHouse)) {
      throw Boom.badRequest(`House with id of ${id} not found!`);
    }

    if (user_id !== selectedHouse.seller_id) {
      throw Boom.unauthorized("You have no access to delete this image!");
    }

    imageList = JSON.parse(selectedHouse.dataValues.images);

    if (_.size(imageList) === 1) {
      throw Boom.badRequest(
        "You need to at least have 1 image on your listing!"
      );
    }

    const filteredImagelist = imageList.filter(
      (image) => image.image_id !== image_id
    );

    await cloudinaryDeleteImg(image_id, "image");
    await db.Houses.update({ images: filteredImagelist }, { where: { id } });

    console.log([fileName, "DELETE House Image", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE House Image", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const deleteHouse = async (params, objectData) => {
  const { id } = params;
  const { user_id } = objectData;

  let imageList;

  try {
    const selectedHouse = await db.Houses.findOne({ where: { id } });

    if (_.isEmpty(selectedHouse)) {
      throw Boom.badRequest(`House with id of ${id} not found!`);
    }

    if (user_id !== selectedHouse.seller_id) {
      throw Boom.unauthorized("You have no access to delete house!");
    }

    imageList = JSON.parse(selectedHouse.dataValues.images);

    if (!_.isEmpty(imageList)) {
      for (i in imageList) {
        await cloudinaryDeleteImg(imageList[i].image_id, "image");
      }

      await cloudinaryDeleteFolder(`image/house/${id}`);
    }

    await db.Houses.destroy({ where: { id } });

    console.log([fileName, "DELETE House", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE House", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

module.exports = {
  postCreateHouse,
  getHouseList,
  getHouseDetail,
  patchUpdateHouse,
  deleteHouseImage,
  deleteHouse,
};
