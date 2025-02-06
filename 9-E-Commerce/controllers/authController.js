const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { createPayload, setCookies, clearCookies } = require('../utils/jwt');

// In previous projects, the server sends JWT as part of the response, the frontend then stores the token in Local Storage! When the frontend sends requests, the token is retrieved from the Local Storage and sent as part of the request header 'Authorization: Bearer <token>'!!! Then the authentication middleware can retrieve the token from the request header!

// In this project, the server sets the JWT as a signed cookie! When the frontend sends requests, the browser automatically includes the cookie in the requests! Then the authentication middleware can retrieve the token by using 'req.signedCookies.token' since we load 'cookie-parser' in app.js!


// POST /api/v1/auth/register
const register = async (req, res) => {
  // How to be an admin: (1) the first registered user (2) change role in the database 
  // The user cannot be an admin by simply sending request in the frontend!
  const { name, email, password } = req.body;
  const role = (await User.countDocuments({})) === 0 ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  
  const payload = createPayload(user);
  setCookies(res, payload);

  res.status(StatusCodes.CREATED).json({ user: payload });
}

// POST /api/v1/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      throw new BadRequestError('Please provide your email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
      throw new UnauthenticatedError('User Not Found');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
      throw new UnauthenticatedError('Password Not Correct');
  }

  const payload = createPayload(user);
  setCookies(res, payload);

  res.status(StatusCodes.OK).json({ user: payload });
}

// GET /api/v1/auth/logout
// In previous projects, there is no logout! This is because when the user logout, the frontend simply removes the token from the Local Storage!
// In this project, since we use cookie, when the user logout, we need to manually clear the cookie!
const logout = async (req, res) => {
  clearCookies(res);

  res.status(StatusCodes.OK).send('logout');
}

module.exports = { register, login, logout };