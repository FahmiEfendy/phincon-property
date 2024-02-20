const _ = require("lodash");
const Boom = require("boom");
const { v4: uuidv4 } = require("uuid");

const db = require("../../models");
const auth = require("../../utils/auth");
const generalHelper = require("../helpers/generalHelper");
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
} = require("../../utils/cloudinary");

const fileName = "server/helpers/userHelper.js";

const postRegister = async (objectData) => {
  const { email, fullName, password, role } = objectData;

  try {
    const userExist = await db.Users.findOne({ where: { email } });

    if (!_.isEmpty(userExist)) {
      throw Boom.badRequest(`User with email ${email} already exist!`);
    }

    const userList = await db.Users.findAll({ where: { role } });
    const hashedPassword = auth.__hashPassword(password);

    const newUser = await db.Users.create({
      id: uuidv4(),
      email,
      fullName,
      password: hashedPassword,
      role,
    });

    console.log([fileName, "POST Register", "INFO"]);

    return Promise.resolve(newUser);
  } catch (err) {
    console.log([fileName, "POST Register", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const postLogin = async (objectData) => {
  const { email, password } = objectData;

  try {
    const selectedUser = await db.Users.findOne({ where: { email } });

    if (_.isEmpty(selectedUser)) {
      throw Boom.badRequest(`User with email ${email} not found!`);
    }

    const isPasswordMatched = auth.__comparePassword(
      password,
      selectedUser.password
    );

    if (!isPasswordMatched) {
      throw Boom.badRequest(`Invalid password!`);
    }

    const token = auth.__generateToken({
      id: selectedUser.id,
      email: selectedUser.email,
      fullName: selectedUser.fullName,
      role: selectedUser.role,
    });

    console.log([fileName, "POST Register", "INFO"]);

    return Promise.resolve({ token });
  } catch (err) {
    console.log([fileName, "POST Login", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getUserList = async (query) => {
  const { role } = query;

  try {
    const userList = await db.Users.findAll({
      where: query?.role ? { role } : {},
    });

    if (query?.role && _.isEmpty(userList)) {
      throw Boom.notFound(`Cannot find user with role of ${role}!`);
    }

    if (_.isEmpty(userList)) {
      throw Boom.notFound("No user found!");
    }

    console.log([fileName, "GET User List", "INFO"]);

    return Promise.resolve(userList);
  } catch (err) {
    console.log([fileName, "GET User List", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const getUserDetail = async (params) => {
  const { id } = params;

  try {
    const selectedUser = await db.Users.findOne({
      where: { id },
    });

    if (_.isEmpty(selectedUser)) {
      throw Boom.notFound(`Cannot find user with id of ${id}!`);
    }

    console.log([fileName, "GET User Detail", "INFO"]);

    return Promise.resolve(selectedUser);
  } catch (err) {
    console.log([fileName, "GET User Detail", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const patchUpdateUser = async (params, objectData) => {
  const { id } = params;
  const { fullName, image } = objectData;
  let imageResult;
  let selectedUser;

  try {
    selectedUser = await db.Users.findOne({
      where: { id },
    });

    if (_.isEmpty(selectedUser)) {
      throw Boom.notFound(`Cannot find user with id of ${id}!`);
    }

    if (image) {
      imageResult = await uploadToCloudinary(
        image[0],
        "image",
        "image/profile"
      );

      if (!imageResult?.url) {
        throw Boom.badImplementation(imageResult.error);
      }

      if (selectedUser?.image_id) {
        await cloudinaryDeleteImg(selectedUser?.image_id, "image");
      }
    }

    await db.Users.update(
      image
        ? {
            fullName,
            image_url: imageResult?.url,
            image_id: imageResult?.public_id,
          }
        : { fullName },
      { where: { id } }
    );

    selectedUser = await db.Users.findOne({
      where: { id },
    });

    console.log([fileName, "PATCH Update User", "INFO"]);

    return Promise.resolve(selectedUser);
  } catch (err) {
    console.log([fileName, "PATCH Update User", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const patchChangePassword = async (params, objectData) => {
  const { id } = params;
  const { oldPassword, newPassword } = objectData;

  try {
    const selectedUser = await db.Users.findOne({
      where: { id },
    });

    if (_.isEmpty(selectedUser)) {
      throw Boom.notFound(`Cannot find user with id of ${id}!`);
    }

    const isPasswordMatched = auth.__comparePassword(
      oldPassword,
      selectedUser.password
    );

    if (!isPasswordMatched) {
      throw Boom.badRequest(`Invalid old password!`);
    }

    const hashedNewPassword = auth.__hashPassword(newPassword);

    await db.Users.update(
      {
        password: hashedNewPassword,
      },
      { where: { id } }
    );

    console.log([fileName, "PATCH Change Password", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "PATCH Change Password", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

const deleteUser = async (params, objectData) => {
  const { id } = params;
  const { role } = objectData;

  try {
    if (role !== "admin") {
      throw Boom.unauthorized(`You have no access to delete user!`);
    }

    const selectedUser = await db.Users.findOne({ where: { id } });

    if (_.isEmpty(selectedUser)) {
      throw Boom.badRequest(`User with id of ${id} not found!`);
    }

    await db.Users.destroy({ where: { id } });

    console.log([fileName, "DELETE User", "INFO"]);

    return Promise.resolve([]);
  } catch (err) {
    console.log([fileName, "DELETE User", "ERROR"], {
      message: { info: `${err}` },
    });

    return Promise.reject(generalHelper.errorResponse(err));
  }
};

module.exports = {
  postRegister,
  postLogin,
  getUserList,
  getUserDetail,
  patchUpdateUser,
  patchChangePassword,
  deleteUser,
};
