const router = require("express").Router();

const generalHelper = require("../helpers/generalHelper");
const userMiddleware = require("../middlewares/userMiddleware");
const appointmentHelper = require("../helpers/appointmentHelper");
const validationHelper = require("../../server/helpers/validationHelper");

const createAppointment = async (req, res) => {
  try {
    const validateData = {
      house_id: req.body.house_id,
      seller_id: req.body.seller_id,
      date: req.body.date,
      message: req.body.message,
    };

    validationHelper.appointmentRequestValidation(validateData);

    const objectData = {
      ...validateData,
      user_id: req.body.user_id,
    };

    const response = await appointmentHelper.postCreateAppointment(objectData);

    res
      .status(201)
      .send({ message: "Successfully Create New Appointment", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const appointmentList = async (req, res) => {
  try {
    const response = await appointmentHelper.getAppointmentList(req.query);

    res
      .status(200)
      .send({ message: "Successfully GET All Appointment", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const appointmentDetail = async (req, res) => {
  try {
    validationHelper.idValidation(req.params);

    const response = await appointmentHelper.getAppointmentDetail(req.params);

    res
      .status(200)
      .send({ message: "Successfully Get Appointment Detail", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const updateAppointment = async (req, res) => {
  try {
    const validateData = {
      status: req.body.status,
    };

    validationHelper.idValidation(req.params);
    validationHelper.appointmentRequestValidation(validateData, true);

    const objectData = {
      ...validateData,
      user_id: req.body.user_id,
      role: req.body.role,
    };

    const response = await appointmentHelper.patchUpdateAppointment(
      req.params,
      objectData
    );

    res
      .status(200)
      .send({ message: "Successfully Update Appointment", data: response });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

const deleteAppointment = async (req, res) => {
  try {
    validationHelper.idValidation(req.params);

    await appointmentHelper.deleteAppointment(req.params, req.body);

    res.status(200).send({ message: "Successfully Deleted a Appointment" });
  } catch (err) {
    return res
      .status(err.output.statusCode)
      .send(generalHelper.errorResponse(err).output.payload);
  }
};

router.post("/create", userMiddleware.tokenValidation, createAppointment);
router.get("/list", userMiddleware.tokenValidation, appointmentList);
router.get("/detail/:id", userMiddleware.tokenValidation, appointmentDetail);
router.patch("/update/:id", userMiddleware.tokenValidation, updateAppointment);
router.delete("/delete/:id", userMiddleware.tokenValidation, deleteAppointment);

module.exports = router;
