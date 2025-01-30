const jwt = require("jsonwebtoken");

exports.generateJwt = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};
