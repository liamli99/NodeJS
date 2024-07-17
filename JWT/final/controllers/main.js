const CustomError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

// Note that there is no need to include try catch block in the async function! This is because we load 'express-async-errors' in app.js which can automatically catch errors (rejected or thrown) in async function and passing them to the next error-handling middleware!!! So that we only need to keep the code in 'try'!

// POST /api/v1/login
const login = async (req, res, next) => {
    console.log(req.body);

    const { username, password } = req.body;
    if (!username || !password) {
        // Since error-handling middleware includes res.json and further execution also includes res.json, we must write 'return next' to exit the function!!! Different from 'next', 'throw' can exit the function immediately!
        return next(new CustomError('Please provide your username and password', 400));

        // Alternative solution, 'express-async-errors' can help catch errors (rejected or thrown) in async function!
        // throw new CustomError('Please provide your username and password', 400);
    }

    // In production, id is normally provided by the database!
    const payload = {
        id: new Date().getDate(),
        username
    }
    // In production, use long, complex, and unguessable string value as secret!
    const secret = process.env.JWT_SECRET;
    
    // Sign the token
    const token = jwt.sign(payload, secret, {
        expiresIn: '30d'
    });

    res.status(200).json({ msg: 'User Created', token });
}

// Since this project doesn't include a database, the frontend stores the token in the Local Storage!

// GET /api/v1/dashboard
// Whenever the user wants to access a protected route or resource, the user should send the JWT, typically in the 'Authorization' header using the 'Bearer' schema, so that the request header should include 'Authorization: Bearer <token>'!!!
const dashboard = async (req, res, next) => {
    console.log(req.headers);

    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new CustomError('No token provided', 401));

        // Alternative solution
        // throw new CustomError('No token provided', 401);
    }

    const token = authorization.split(' ')[1];
    console.log(token);



}

module.exports = { login, dashboard };