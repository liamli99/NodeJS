const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require('../errors');
const { createJWT } = require('../utils/jwt');

// In previous projects, the server sends JWT as part of the response, the frontend then stores the token in Local Storage! When the frontend sends requests, the token is retrieved from the Local Storage and sent as part of the request header 'Authorization: Bearer <token>'!!!
// In this project, 


// POST /api/v1/auth/register
const register = async (req, res) => {
  // How to be an admin: (1) the first registered user (2) change role in the database 
  // The user cannot be an admin by simply sending request in the frontend!
  const { name, email, password } = req.body;
  const role = (await User.countDocuments({})) === 0 ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  
  const payload = {
    userId: user._id,
    userName: user.name,
    role: user.role
  };
  const token = createJWT(payload);

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay)
  });


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
      throw new UnauthorizedError('User Not Found');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
      throw new UnauthorizedError('Password Not Correct');
  }

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      token
    }
  });
}

// GET /api/v1/auth/logout
const logout = async (req, res) => {
  res.send('logout');
}

module.exports = { register, login, logout };