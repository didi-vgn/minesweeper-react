const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return next(
      new AppError("Not authenticated. Token is missing.", "UNAUTHORIZED", 401)
    );
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return next(
        new AppError(err.message || "Access denied.", "FORBIDDEN", 403)
      );
    }
    req.user = user;
    next();
  });
};
