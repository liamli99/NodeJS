const BadRequestError = require('../errors/bad-request');
const jwt = require('jsonwebtoken');

// Note that there is no need to include try catch block in the async function! This is because we load 'express-async-errors' in app.js which can automatically catch errors (rejected or thrown) in async function and passing them to the next error-handling middleware!!! So that we only need to keep the code in 'try'!

// POST /api/v1/login
// Submit button
const login = async (req, res, next) => {
    console.log(req.body);

    const { username, password } = req.body;
    if (!username || !password) {
        // Since there is further execution after next, we must write 'return next' to exit the function to prevent further execution!!! Different from 'next', 'throw' can exit the function immediately!
        return next(new BadRequestError('Please provide your username and password'));

        // Alternative solution, 'express-async-errors' can help catch errors (rejected or thrown) in async function and pass them to the next error-handling middleware!
        // throw new BadRequestError('Please provide your username and password');
    }

    // In production, id is normally provided by the database!
    const payload = {
        id: new Date().getDate(),
        username
    };
    // In production, use long, complex, and unguessable string value as secret!
    const secret = process.env.JWT_SECRET;
    
    // Sign the token
    const token = jwt.sign(payload, secret, {
        expiresIn: '30d'
    });

    res.status(200).json({ msg: 'User Created', token });
}

// Since this project doesn't include a database, after clicking the Submit button, the token is created and stored in the Local Storage! After clicking the Get Data button, the token is retrieved from the Local Storage and sent as part of the request header!

// GET /api/v1/dashboard
// Get Data button
// Whenever the user wants to access a protected route or resource, the user should send the JWT, typically in the 'Authorization' header using the 'Bearer' schema, so that the request header should include 'Authorization: Bearer <token>'!!!
const dashboard = async (req, res, next) => {
    // Original Code:

    // console.log(req.headers);

    // const { authorization } = req.headers;
    // if (!authorization || !authorization.startsWith('Bearer ')) {
    //     return next(new CustomError('No token provided', 401));

    //     // Alternative solution
    //     // throw new CustomError('No token provided', 401);
    // }

    // const token = authorization.split(' ')[1];
    // console.log(token);

    // // Verify the token
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     console.log(decoded);
    //     res.status(200).json({ msg: `Hello, ${decoded.username}`, secret: 'This is a secret' });
    // } catch (error) {
    //     next(new CustomError('Not authorized', 401));

    //     // Alternative solution
    //     // throw new CustomError('Not authorized', 401);
    // }

    

    // New Code: We can create an authentication middleware to verify the token before getting data in dashboard! 
    // There are 2 updates: (1) Create an authentication middleware 'middleware/auth.js' based on the above original code (2) Load that authentication middleware before dashboard in 'routes/main.js'!
    res.status(200).json({ msg: `Hello, ${req.username}`, secret: 'This is a secret' });

}

module.exports = { login, dashboard };