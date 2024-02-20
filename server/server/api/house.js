const router = require("express").Router();

const houseHelper = require("../helpers/houseHelper");
const generalHelper = require("../helpers/generalHelper");
const uploadMedia = require("../middlewares/uploadMedia");
const userMiddleware = require("../middlewares/userMiddleware");
const validationHelper = require("../../server/helpers/validationHelper");

const createHouse = async (req, res) => {
  const validateData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    images: req.files.images,
  };

  try {
    validationHelper.houseRequestValidation(validateData);

    const objectData = {
      ...validateData,
      images: req.files.images,
      role: req.body.role,
      user_id: req.body.user_id,
    };

    const response = await houseHelper.postCreateHouse(objectData);

    res
      .status(201)
      .send({ message: "Successfully Create New House", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const houseList = async (req, res) => {
  try {
    const response = await houseHelper.getHouseList();

    res
      .status(200)
      .send({ message: "Successfully GET All House", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const houseDetail = async (req, res) => {
  try {
    validationHelper.idValidation(req.params);

    const response = await houseHelper.getHouseDetail(req.params);

    res
      .status(200)
      .send({ message: "Successfully Get House Detail", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const updateHouse = async (req, res) => {
  const validateData = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    images: req?.files?.images || "",
  };

  try {
    validationHelper.idValidation(req.params);
    validationHelper.houseRequestValidation(validateData, true);

    const objectData = {
      ...validateData,
      images: req?.files?.images,
      role: req.body.role,
    };

    const response = await houseHelper.patchUpdateHouse(req.params, objectData);

    res
      .status(200)
      .send({ message: "Successfully Update House", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const deleteHouseImage = async (req, res) => {
  try {
    const validateData = {
      id: req.body.image_id,
    };

    validationHelper.idValidation(req.params);
    validationHelper.idValidation(validateData);

    await houseHelper.deleteHouseImage(req.params, req.body);

    res.status(200).send({ message: "Successfully Deleted a House Image" });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const deleteHouse = async (req, res) => {
  try {
    validationHelper.idValidation(req.params);

    await houseHelper.deleteHouse(req.params, req.body);

    res.status(200).send({ message: "Successfully Deleted a House" });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

router.post(
  "/create",
  uploadMedia.fields([{ name: "images" }]),
  userMiddleware.tokenValidation,
  createHouse
);
router.get("/list", houseList);
router.get("/detail/:id", houseDetail);
router.patch(
  "/update/:id",
  uploadMedia.fields([{ name: "images" }]),
  userMiddleware.tokenValidation,
  updateHouse
);
router.delete(
  "/delete-image/:id",
  userMiddleware.tokenValidation,
  deleteHouseImage
);
router.delete("/delete/:id", userMiddleware.tokenValidation, deleteHouse);

module.exports = router;
