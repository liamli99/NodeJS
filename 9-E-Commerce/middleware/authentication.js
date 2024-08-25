const { UnauthorizedError } = require('../errors');
const { verifyJWT } = require('../utils/jwt');

// In controllers/authController.js, the server sets the JWT as a signed cookie! Since we load 'cookie-parser' in app.js, the authentication middleware can retrieve the token by using 'req.signedCookies.token'! 
// We don't need to include 'Authorization: Bearer <token>' in request header!
const authentication = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        throw new UnauthorizedError('No token provided');
    }

    // Verify the token
    try {
        const payload = verifyJWT(token);
        req.user = { userId: payload.userId, userName: payload.userName, role: payload.role };
        next();
    } catch (error) {
        throw new UnauthorizedError('Not authorized');
    }
}

module.exports = authentication;