const _ = require("lodash");
const Boom = require("boom");
const { v4: uuidv4 } = require("uuid");

const db = require("../../models");
const generalHelper = require("../helpers/generalHelper");

const fileName = "server/helpers/appointmenteHelper.js";

const postCreateAppointment = async (objectData) => {
  const { user_id, house_id, seller_id, date, message } = objectData;

  try {
    const newAppointment = await db.Appointments.create({
      id: uuidv4(),
      house_id,
      customer_id: user_id,
      seller_id,
      date,
      message,
      status: "pending",
    });

    console.log([fileName, "POST Create Appointment", "INFO"]);

    return Promise.resolve(newAppointment);
  } catch (err) {
    console.log([fileName, "POST Create Appointment", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getAppointmentList = async (query) => {
  try {
    const appointmentList = await db.Appointments.findAll({
      where: query?.seller_id ? { seller_id: query.seller_id } : {},
    });

    if (query?.seller_id && _.isEmpty(appointmentList)) {
      throw Boom.notFound(
        `Cannot find appointment for seller with id of ${query.seller_id}!`
      );
    }

    if (_.isEmpty(appointmentList)) {
      throw Boom.notFound("No appointment found!");
    }

    console.log([fileName, "GET Appointment List", "INFO"]);

    return Promise.resolve(appointmentList);
  } catch (err) {
    console.log([fileName, "GET Appointment List", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getAppointmentDetail = async (params) => {
  const { id } = params;

  try {
    const selectedAppointment = await db.Appointments.findOne({
      where: { id },
    });

    if (_.isEmpty(selectedAppointment)) {
      throw Boom.notFound(`Cannot find appointment with id of ${id}`);
    }

    console.log([fileName, "GET Appointment Detail", "INFO"]);

    return Promise.resolve(selectedAppointment);
  } catch (err) {
    console.log([fileName, "GET Appointment Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const patchUpdateAppointment = async (params, objectData) => {
  const { id } = params;
  const { user_id, role, status } = objectData;

  let selectedAppointment;

  try {
    selectedAppointment = await db.Appointments.findOne({
      where: { id },
    });

    if (_.isEmpty(selectedAppointment)) {
      throw Boom.notFound(`Cannot find appointment with id of ${id}!`);
    }

    if (
      role !== "seller" ||
      selectedAppointment.dataValues.seller_id !== user_id
    ) {
      throw Boom.unauthorized("You have no access to update appointment!");
    }

    await db.Appointments.update(
      {
        status: status || selectedAppointment.dataValues.status,
      },
      { where: { id } }
    );

    selectedAppointment = await db.Appointments.findOne({
      where: { id },
    });

    console.log([fileName, "PATCH Update Appointment", "INFO"]);

    return Promise.resolve(selectedAppointment);
  } catch (err) {
    console.log([fileName, "PATCH Update Appointment", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const deleteAppointment = async (params, objectData) => {
  const { id } = params;
  const { user_id, role } = objectData;

  let selectedAppointment;

  try {
    selectedAppointment = await db.Appointments.findOne({
      where: { id },
    });

    if (_.isEmpty(selectedAppointment)) {
      throw Boom.notFound(`Cannot find appointment with id of ${id}!`);
    }

    if (
      role !== "seller" ||
      selectedAppointment.dataValues.seller_id !== user_id
    ) {
      throw Boom.unauthorized("You have no access to update appointment!");
    }

    await db.Appointments.destroy({ where: { id } });

    console.log([fileName, "DELETE Appointment", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE Appointment", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

module.exports = {
  postCreateAppointment,
  getAppointmentList,
  getAppointmentDetail,
  patchUpdateAppointment,
  deleteAppointment,
};
