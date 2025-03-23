const AppError = require("./AppError");

exports.prismaErrorHandler = (err) => {
  switch (err.code) {
    case "P2002":
      return new AppError(
        `The ${err.meta.target} already exists.`,
        "FIELD_EXISTS",
        400,
        err.meta.target
      );
    case "P2011":
      return new AppError(
        `The ${err.meta.target} cannot be null.`,
        "FIELD_NULL",
        400,
        err.meta.target
      );
    case "P20006":
      return new AppError("Record not found.", "NOT_FOUND", 404);
    case "P2025":
      return new AppError(
        "Record to update or delete not found.",
        "NOT_FOUND",
        404
      );
    case "P1000":
      return new AppError(
        "Could not connect to the database.",
        "DATABASE_ERROR",
        500
      );
    default:
      return new AppError("Something went wrong.", "UNKNOWN_ERROR", 500);
  }
};
