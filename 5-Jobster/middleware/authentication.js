const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

// All the requests' headers must include 'Authorization: Bearer <token>'!!!
const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedError('No token provided');
    }

    const token = authorization.split(' ')[1];

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId, userName: decoded.userName };
        next();
    } catch (error) {
        throw new UnauthorizedError('Not authorized');
    }
}

module.exports = authentication;