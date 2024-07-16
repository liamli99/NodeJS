// https://expressjs.com/en/guide/error-handling.html

const { CustomError } = require('../errors/custom-error');

// Handle errors that are passed to this middleware function in taskController.js
// Different from other middleware functions, error-handling middleware takes 4 arguments!!!
const errorHandler = (err, req, res, next) => {
    // Check if the error is the custom error!
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ msg: err.message });
    } else {
        res.status(500).json({ msg: err.message });
    }
}

module.exports = errorHandler;