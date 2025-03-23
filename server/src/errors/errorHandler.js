function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    errorCode: err.errorCode,
    statusCode: err.statusCode,
    field: err.field || null,
  });
}

module.exports = errorHandler;
