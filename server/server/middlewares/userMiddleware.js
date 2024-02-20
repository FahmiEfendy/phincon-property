const _ = require("lodash");
const Boom = require("boom");
const Moment = require("moment");
const jwt = require("jsonwebtoken");

const generalHelper = require("../helpers/generalHelper");

const fileName = "./server/middlewares/userMiddleware.js";
const jwtSecretToken = process.env.JWT_SECRET_TOKEN || "PHINCOFFEE_SECRET_KEY";

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (_.isEmpty(authorization)) throw Boom.unauthorized();

    const token = authorization.split(" ")[1];
    const verifiedUser = jwt.verify(token, jwtSecretToken);

    if (_.isEmpty(verifiedUser)) {
      throw Boom.unauthorized();
    }

    const isTokenExpired = verifiedUser.exp < Moment().unix();
    if (isTokenExpired) throw Boom.unauthorized();

    req.body = {
      ...req.body,
      user_id: verifiedUser.id,
      role: verifiedUser.role,
    };

    return next();
  } catch (err) {
    console.log(fileName, "Token Validation", "ERROR", { info: err });

    if (Boom.isBoom(err) && err.output.statusCode === 401) {
      return res.status(err.output.statusCode).send(err.output.payload);
    } else {
      const unauthorizedError = Boom.unauthorized("Unauthorized");
      return res
        .status(unauthorizedError.output.statusCode)
        .send(unauthorizedError.output.payload);
    }
  }
};

module.exports = {
  tokenValidation,
};
