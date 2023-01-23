const httpStatus = require("http-status");
/**
 * Reponse handlers
 *
 */

// this value should come from .env file
const env = "dev";

/**
 * Send success response
 *
 * @param data: data that response sends to client
 * @param created: whether new data is created or modified
 * @param status: specific http status code that we want to send
 */
const successResponse = (res, data, status = httpStatus.OK) => {
  const responseData = typeof data === "string" ? { message: data } : data;

  return res.status(status).json({
    data: responseData,
  });
};

/**
 * Send error response
 *
 * @param error error object passed from error handler middleware
 */
const errorResponse = (error) => {
  const { status, message } = error;

  // Only return error stack if env is develop and status is 500
  const stack =
    env == "dev" && status === httpStatus.INTERNAL_SERVER_ERROR
      ? error.stack
      : undefined;

  return {
    status,
    message,
    stack,
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
