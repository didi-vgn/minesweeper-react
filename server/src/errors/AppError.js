class AppError extends Error {
  constructor(message, errorCode, statusCode, field = null) {
    super(message);
    this.status = "error";
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.field = field;
  }
}

module.exports = AppError;
