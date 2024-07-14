// https://expressjs.com/en/guide/error-handling.html

// Handle errors that are passed to this middleware function in taskController.js
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ msg: err.message });
}

module.exports = errorHandler;