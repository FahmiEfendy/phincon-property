const router = require("express").Router();

const generalHelper = require("../helpers/generalHelper");
const favoriteHelper = require("../helpers/favoriteHelper");
const userMiddleware = require("../middlewares/userMiddleware");
const validationHelper = require("../../server/helpers/validationHelper");

const addHouseToFavorite = async (req, res) => {
  try {
    validationHelper.idValidation(req.params);

    await favoriteHelper.postAddHouseToFavorite(
      req.body.user_id,
      req.params.id
    );

    res.status(201).send({ message: "Successfully Add House to Favorite" });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const myFavorite = async (req, res) => {
  try {
    const response = await favoriteHelper.getMyFavorite(req.body.user_id);

    res
      .status(200)
      .send({ message: "Successfully GET My Favorite List", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const deleteHouseFromFavorite = async (req, res) => {
  try {
    await favoriteHelper.deleteHouseFromFavorite(req.params.id);

    res
      .status(200)
      .send({ message: "Successfully Delete House From Favorite" });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

router.post("/add/:id", userMiddleware.tokenValidation, addHouseToFavorite);
router.get("/list", userMiddleware.tokenValidation, myFavorite);
router.delete(
  "/delete/:id",
  userMiddleware.tokenValidation,
  deleteHouseFromFavorite
);

module.exports = router;
