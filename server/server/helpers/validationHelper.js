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

const idValidation = (data) => {
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

const houseRequestValidation = (data, isUpdate = false) => {
  const schema = Joi.object({
    title: isUpdate
      ? Joi.string()
          .optional()
          .description("House's title, i.e. Spacious Family Home")
      : Joi.string()
          .required()
          .description("House's title, i.e. Spacious Family Home"),
    description: isUpdate
      ? Joi.string()
          .optional()
          .description(
            "House's description, i.e. A perfect home for your family with ample space and a beautiful backyard."
          )
      : Joi.string()
          .required()
          .description(
            "House's description, i.e. A perfect home for your family with ample space and a beautiful backyard."
          ),
    price: isUpdate
      ? Joi.number().optional().description("House's price, i.e. 2500")
      : Joi.number().required().description("House's price, i.e. 2500"),
    address: isUpdate
      ? Joi.string()
          .optional()
          .description("House's address, i.e. 789 Oak Avenue")
      : Joi.string()
          .required()
          .description("House's address, i.e. 789 Oak Avenue"),
    city: isUpdate
      ? Joi.string().optional().description("House's city, i.e. Suburbia")
      : Joi.string().required().description("House's city, i.e. Suburbia"),
    state: isUpdate
      ? Joi.string().optional().description("House's state, i.e. CA")
      : Joi.string().required().description("House's state, i.e. CA"),
    zipCode: isUpdate
      ? Joi.number().optional().description("House's zip code, i.e. 56789")
      : Joi.number().required().description("House's zip code, i.e. 56789"),
    bedrooms: isUpdate
      ? Joi.number().optional().description("House's bedroom's count, i.e. 4")
      : Joi.number().required().description("House's bedroom's count, i.e. 4"),
    bathrooms: isUpdate
      ? Joi.number().optional().description("House's bathroom's count, i.e. 2")
      : Joi.number().required().description("House's bathroom's count, i.e. 2"),
    images: Joi.any(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  idValidation,
  updateUserValidation,
  changePasswordValidation,
  houseRequestValidation,
};
