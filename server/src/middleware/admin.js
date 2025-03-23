const AppError = require("../errors/AppError");

exports.authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return next(
      new AppError(
        "You are not authorized to make this request.",
        "FORBIDDEN",
        403
      )
    );
  }
  next();
};
