const CustomError = require('../errors/custom-error');

// Note that there is no need to include try catch block in the async function because we load 'express-async-errors' in app.js which can automatically catch errors and passing them to the next middleware!!!

// POST /api/v1/login
const login = async (req, res, next) => {
    console.log(req.body);

    const { username, password } = req.body;
    if (!username || !password) {
        next(new CustomError('Please provide your username and password', 400));
    }
}

// GET /api/v1/dashboard
const dashboard = async (req, res) => {

}

module.exports = { login, dashboard };