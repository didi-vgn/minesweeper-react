function errorHandler(err, req, res, nect) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "An unexpected error occured.",
  });
}
module.exports = errorHandler;
