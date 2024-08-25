const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError, UnauthenticatedError } = require('../errors');
const { createPayload, setCookies } = require('../utils/jwt');

// GET /api/v1/users
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  
  res.status(StatusCodes.OK).json({ users });
}

// GET /api/v1/users/:id
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');

  if (!user) {
    throw new NotFoundError('User Not Found');
  }

  res.status(StatusCodes.OK).json({ user });
}

// GET /api/v1/users/showMe
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
}

// POST /api/v1/users/updateUser
// Update user name and email!
const updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.user.userId }, req.body, {
    new: true,
    runValidators: true
  });

  // Since we may update the user name and it is part of JWT payload, we should set a new token as a signed cookie!
  const payload = createPayload(user);
  setCookies(res, payload);

  res.status(StatusCodes.OK).json({ user: payload });
}

// POST /api/v1/users/updateUserPassword
// Update user password!
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both passwords');
  }

  // This user must exist because it is authenticated! The authentication middleware is placed before userRouter!
  const user = await User.findOne({ _id: req.user.userId });

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
      throw new UnauthenticatedError('Password Not Correct');
  }

  // Here we use save instead of findOneAndUpdate because save can trigger pre middleware in models/User.js to hash the password before saving it to database!!!
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).send('Success');
}

module.exports = { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword };