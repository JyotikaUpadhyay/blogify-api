const ApiError = require("../utils/ApiError");

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return next(new ApiError(401, "User role missing"));
    }

    if (!allowedRoles.includes(userRole)) {
      return next(
        new ApiError(
          403,
          `role '${userRole}' not authorized. required role '${allowedRoles.join(
            " or "
          )}'`
        )
      );
    }

    next();
  };
};
