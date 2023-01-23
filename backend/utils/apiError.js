const httpStatus = require("http-status");

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const badRequest = (message = "Invalid params") => {
  return new ApiError(message, httpStatus.BAD_REQUEST);
};

const unauthorized = (message = "Unauthorized") => {
  return new ApiError(message, httpStatus.UNAUTHORIZED);
};

const notFound = (message = "Not found") => {
  return new ApiError(message, httpStatus.NOT_FOUND);
};

const internalServer = (message = "Unexpected server error") => {
  return new ApiError(message, httpStatus.INTERNAL_SERVER_ERROR);
};

module.exports = {
  badRequest,
  unauthorized,
  notFound,
  internalServer,
  ApiError,
};
