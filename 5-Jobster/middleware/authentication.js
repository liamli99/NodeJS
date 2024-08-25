const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

// All the requests' headers must include 'Authorization: Bearer <token>'!!! This toke is created in controllers/auth.js!
const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
    }

    const token = authorization.split(' ')[1];

    // Verify the token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, userName: payload.userName };
        next();
    } catch (error) {
        throw new UnauthorizedError('Not authorized');
    }
}

module.exports = authentication;