const CustomError = require('./custom-error');
const UnauthorizedError = require('./unauthorized');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');

// We can write `const { ... } = require('./errors')` to access these 4 errors!
module.exports = { CustomError, UnauthorizedError, NotFoundError, BadRequestError };
