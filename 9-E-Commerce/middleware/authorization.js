const { UnauthorizedError } = require('../errors');

// Authentication: verify who a user is; Authorization: verify what a user has access to!
// Authorization should be done after Authentication!!!
// Only requests with certain roles can access the resource!
const authorization = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Not authorized');
    }
  
    next();
  }
}

module.exports = authorization;