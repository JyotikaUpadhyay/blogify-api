const ApiError = require("../utils/ApiError");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // If it's not an ApiError, hide internal details
  const message =
    err instanceof ApiError ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
