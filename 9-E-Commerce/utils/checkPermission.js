const { UnauthorizedError } = require('../errors');

// Only admin or user himself can access his resource!
// This is used in userController.js, reviewController.js, 
const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.role !== 'admin' && requestUser.userId !== resourceUserId.toString()) {
    throw new UnauthorizedError('Not authorized');
  }
}

module.exports = checkPermission;
