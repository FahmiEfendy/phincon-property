const _ = require("lodash");
const Boom = require("boom");
const { v4: uuidv4 } = require("uuid");

const db = require("../../models");
const generalHelper = require("../helpers/generalHelper");

const fileName = "server/helpers/favoriteHelper.js";

const postAddHouseToFavorite = async (user_id, house_id) => {
  try {
    const selectedHouse = await db.Houses.findOne({
      where: { id: house_id },
    });

    if (_.isEmpty(selectedHouse)) {
      throw Boom.notFound(`Cannot find house with id of ${house_id}`);
    }

    await db.Favorites.create({
      id: uuidv4(),
      user_id,
      house_id,
    });

    console.log([fileName, "POST Add House To Favorite", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "POST Add House To Favorite", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getMyFavorite = async (user_id) => {
  try {
    const myFavorite = await db.Favorites.findAll({ where: { user_id } });

    console.log([fileName, "GET My Favorite", "INFO"]);

    return Promise.resolve(myFavorite);
  } catch (err) {
    console.log([fileName, "GET My Favorite", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const deleteHouseFromFavorite = async (house_id) => {
  try {
    const selectedHouse = await db.Houses.findOne({
      where: { id: house_id },
    });

    if (_.isEmpty(selectedHouse)) {
      throw Boom.notFound(`Cannot find house with id of ${house_id}`);
    }

    await db.Favorites.destroy({ where: { house_id } });

    console.log([fileName, "DELETE House From Favorite", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE House From Favorite", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

module.exports = {
  postAddHouseToFavorite,
  getMyFavorite,
  deleteHouseFromFavorite,
};
