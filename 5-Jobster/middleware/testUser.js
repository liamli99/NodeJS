const { BadRequestError } = require('../errors');

// We should load this middleware after authentication middleware and before updateUser, createJob, updateJob, and deleteJob to restrict these operations for test user!!!
const testUser = (req, res, next) => {
  // Make sure this is the test user's ObjectID!
  if (req.user.userId === '66c7953c7da4359d6fe9a3ae') {
    throw new BadRequestError('Test User. Read Only!');
  } else {
    next();
  }
}

module.exports = testUser;