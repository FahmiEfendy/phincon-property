const router = require("express").Router();

const userHelper = require("../helpers/userHelper");
const generalHelper = require("../helpers/generalHelper");
const uploadMedia = require("../middlewares/uploadMedia");
const userMiddleware = require("../middlewares/userMiddleware");
const { encryptPayload } = require("../../utils/encryptPayload");
const { decryptTextPayload } = require("../../utils/decryptPayload");
const validationHelper = require("../../server/helpers/validationHelper");

const register = async (req, res) => {
  const { email, fullName, password, confirmPassword, role } = req.body;

  const decryptedEmail = decryptTextPayload(email);
  const decryptedFullName = decryptTextPayload(fullName);
  const decryptedPassword = decryptTextPayload(password);
  const decryptedConfirmPassword = decryptTextPayload(confirmPassword);

  const objectData = {
    email: decryptedEmail,
    fullName: decryptedFullName,
    password: decryptedPassword,
    confirmPassword: decryptedConfirmPassword,
    role,
  };

  try {
    validationHelper.registerValidation(objectData);

    const response = await userHelper.postRegister(objectData);

    res
      .status(201)
      .send({ message: "Successfully Create New User", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const decryptedEmail = decryptTextPayload(email);
  const decryptedPassword = decryptTextPayload(password);

  const objectData = {
    email: decryptedEmail,
    password: decryptedPassword,
  };

  try {
    validationHelper.loginValidation(objectData);

    const response = await userHelper.postLogin(objectData);

    res.status(200).send({ message: "Successfully Login", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const userList = async (req, res) => {
  try {
    const response = await userHelper.getUserList(req.query);

    res
      .status(200)
      .send({ message: "Successfully Get User List", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const userDetail = async (req, res) => {
  try {
    validationHelper.userIdValidation(req.params);

    const response = await userHelper.getUserDetail(req.params);

    res
      .status(200)
      .send({ message: "Successfully Get User Detail", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const updateUser = async (req, res) => {
  try {
    const objectData = {
      fullName: req.body.fullName,
      image: req?.files?.image,
    };

    validationHelper.userIdValidation(req.params);
    validationHelper.updateUserValidation(objectData);

    const response = await userHelper.patchUpdateUser(req.params, objectData);

    res
      .status(200)
      .send({ message: "Successfuly Update User", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const objectData = {
    oldPassword: decryptTextPayload(oldPassword),
    newPassword: decryptTextPayload(newPassword),
    confirmNewPassword: decryptTextPayload(confirmNewPassword),
  };

  try {
    validationHelper.userIdValidation(req.params);
    validationHelper.changePasswordValidation(objectData);

    await userHelper.patchChangePassword(req.params, objectData);

    res.status(200).send({ message: "Successfully Change User's Password" });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const deleteUser = async (req, res) => {
  try {
    validationHelper.userIdValidation(req.params);

    await userHelper.deleteUser(req.params, req.body);

    res.status(200).send({ message: "Successfully Deleted a User" });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const encryptedPayload = async (req, res) => {
  const { email, fullName, password, confirmPassword, newPassword } = req.body;

  const encryptedEmail = encryptPayload(email);
  const encryptedFullName = encryptPayload(fullName);
  const encryptedPassword = encryptPayload(password);
  const encryptedconfirmPassword = encryptPayload(confirmPassword);

  try {
    const response = {
      email: encryptedEmail,
      fullName: encryptedFullName,
      password: encryptedPassword,
      confirmPassword: encryptedconfirmPassword,
    };

    res
      .status(200)
      .send({ message: "Successfully GET Encrypted Value", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

router.post("/register", register);
router.post("/login", login);
router.get("/list", userList);
router.get("/detail/:id", userDetail);
router.patch(
  "/update/:id",
  uploadMedia.fields([{ name: "image", maxCount: 1 }]),
  userMiddleware.tokenValidation,
  updateUser
);
router.patch(
  "/change-password/:id",
  userMiddleware.tokenValidation,
  changePassword
);
router.delete("/delete/:id", userMiddleware.tokenValidation, deleteUser);
router.get("/encrypt", encryptedPayload);

module.exports = router;
