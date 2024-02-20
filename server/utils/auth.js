const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const jwtSecretToken =
  process.env.JWT_SECRET_TOKEN || "PHINCON_PROPERTY_STRONG_KEY";

const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const __comparePassword = (payloadPass, dbPass) => {
  return bcrypt.compareSync(payloadPass, dbPass);
};

const __generateToken = (data) => {
  return jwt.sign(data, jwtSecretToken);
};

module.exports = {
  __hashPassword,
  __comparePassword,
  __generateToken,
};
