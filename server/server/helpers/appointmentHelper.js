const _ = require("lodash");
const Boom = require("boom");
const { v4: uuidv4 } = require("uuid");

const db = require("../../models");
const generalHelper = require("../helpers/generalHelper");

const fileName = "server/helpers/appointmenteHelper.js";

const postCreateAppointment = async (objectData) => {
  const { user_id, house_id, seller_id, date, message } = objectData;

  try {
    if (house_id && user_id === seller_id) {
      throw Boom.badRequest(
        "You cannot request appointment for your own house!"
      );
    }

    const appointmentExist = await db.Appointments.findOne({
      where: { house_id, customer_id: user_id },
    });

    if (!_.isEmpty(appointmentExist)) {
      throw Boom.badRequest(
        `Appointment for house with id of ${house_id} from user with id of ${user_id} already exist!`
      );
    }

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

const getAppointmentList = async (objectData) => {
  const { role, user_id } = objectData;

  try {
    const appointmentList = await db.Appointments.findAll({
      where:
        role === "customer" ? { customer_id: user_id } : { seller_id: user_id },
      include: [
        {
          model: db.Houses,
          as: "house",
        },
      ],
      order: [
        [
          db.sequelize.literal(
            "(CASE WHEN status = 'pending' THEN 1 WHEN status = 'accepted' THEN 2 WHEN status = 'rejected' THEN 3 ELSE 4 END)"
          ),
          "ASC",
        ],
      ],
    });

    if (_.isEmpty(appointmentList)) {
      throw Boom.notFound("No appointment found!");
    }

    const parsedAppointmentList = appointmentList.map((data) => ({
      ...data.dataValues,
      house: {
        ...data.dataValues.house.dataValues,
        images: JSON.parse(data.dataValues.house.dataValues.images),
        location: JSON.parse(data.dataValues.house.dataValues.location),
      },
    }));

    console.log([fileName, "GET Appointment List", "INFO"]);

    return Promise.resolve(parsedAppointmentList);
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

module.exports = {
  postCreateAppointment,
  getAppointmentList,
  getAppointmentDetail,
};
