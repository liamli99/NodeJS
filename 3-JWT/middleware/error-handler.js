const CustomError = require('../errors/custom-error');
const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  // Both BadRequestError and UnauthenticatedError extend CustomError, so they are still instances of CustomError!
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
}

module.exports = errorHandler;
