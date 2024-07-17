const CustomError = require('../errors/custom-error');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    res.status(500).json({ msg: err.message });
  }
}

module.exports = errorHandler;
