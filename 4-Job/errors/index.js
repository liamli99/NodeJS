const CustomError = require('./custom-error');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');

// We can write `const { ... } = require('./errors')` to access these 4 errors!
module.exports = { CustomError, UnauthenticatedError, NotFoundError, BadRequestError };