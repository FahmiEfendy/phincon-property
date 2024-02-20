const Joi = require("joi");
const Boom = require("boom");

const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .description("User's email, i.e. johndoe@gmail.com"),
    fullName: Joi.string()
      .required()
      .description("User's full name, i.e. John Doe"),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .description("User's password, should be 6-20 characters"),
    confirmPassword: Joi.string()
      .min(6)
      .max(20)
      .required()
      .valid(Joi.ref("password"))
      .description("Should match user's password"),
    role: Joi.string()
      .required()
      .description("User's role, i.e. customer, seller, or admin"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .description("User's email, i.e. johndoe@gmail.com"),
    password: Joi.string()
      .min(6)
      .max(20)
      .required()
      .description("User's password, should be 6-20 characters"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const userIdValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().required().description("User id, generated from uuid"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .required()
      .description("User's full name, i.e. John Doe"),
    image: Joi.array().optional().description("User's images"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const changePasswordValidation = (data) => {
  const schema = Joi.object({
    oldPassword: Joi.string()
      .min(6)
      .max(20)
      .required()
      .description("User's old password, should be 6-20 characters"),
    newPassword: Joi.string()
      .min(6)
      .max(20)
      .required()
      .description("User's new password, should be 6-20 characters"),
    confirmNewPassword: Joi.string()
      .min(6)
      .max(20)
      .required()
      .valid(Joi.ref("newPassword"))
      .description("Should match user's new password"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  userIdValidation,
  updateUserValidation,
  changePasswordValidation,
};
