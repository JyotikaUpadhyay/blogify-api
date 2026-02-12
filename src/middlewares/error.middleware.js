// src/middlewares/error.middleware.js

const errorHandler = (err, req, res, next) => {
  // Duplicate key error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const value = err.keyValue?.[field];

    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists. Please use a different ${field}.`;

    return res.status(400).json({
      success: false,
      error: { message, field },
    });
  }

  // Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");

    return res.status(400).json({
      success: false,
      error: { message },
    });
  }

  // Default error
  return res.status(500).json({
    success: false,
    error: { message: err.message || "Server Error" },
  });
};

module.exports = errorHandler;
