const { CustomError } = require('../errors/index');
const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ msg: err.message });

  } else if (err.code && err.code === 11000) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: `Duplicate value entered for ${Object.keys(err.keyValue)}` });

  } else if (err.name === 'ValidationError') {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: Object.values(err.errors).map(item => item.message).join(', ') });
  
  } else if (err.name === 'CastError') {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No item found with id: ${err.value}` });
  }
  
  else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err })
  }
}

module.exports = errorHandler;
