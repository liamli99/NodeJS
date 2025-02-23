const UnauthenticatedError = require('../errors/unauthenticated');
const jwt = require('jsonwebtoken');

// Create a middleware that can verify the token before getting data in dashboard! So that this middleware should be loaded before dashboard!
// All the requests' headers must include 'Authorization: Bearer <token>'!!! This token is created in login!
// Authentication: verify who a user is; Authorization: verify what a user has access to!
const authentication = async (req, res, next) => {
    console.log(req.headers);

    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new UnauthenticatedError('No token provided'));

        // Alternative solution
        // throw new UnauthenticatedError('No token provided');
    }

    const token = authorization.split(' ')[1];
    console.log(token);

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        // Delete this line:
        // res.status(200).json({ msg: `Hello, ${decoded.username}`, secret: 'This is a secret' });

        // Add these lines:
        // Middleware can make changes to the request/response object! So that we can access the username in dashboard!
        req.username = decoded.username;
        // Pass to the next middleware, which is dashboard in this project!
        next();
    } catch (error) {
        next(new UnauthenticatedError('Not authenticated'));

        // Alternative solution
        // throw new UnauthenticatedError('Not authenticated');
    }
}

module.exports = authentication;