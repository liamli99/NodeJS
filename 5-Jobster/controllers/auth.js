const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// The server sends JWT as part of the response, the frontend then stores the token in Local Storage! When the frontend sends requests, the token is retrieved from the Local Storage and sent as part of the request header 'Authorization: Bearer <token>'! Then the authentication middleware can retrieve the token from the request header!

// POST /api/v1/auth/register
const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = user.createJWT();

    // // The following code doesn't work because user is a document instead of an object, so that spread syntax doesn't work!
    // res.status(StatusCodes.CREATED).json({
    //     user: { ...user, token }
    // });

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

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token
        }
    });
}

// PATCH /api/v1/auth/updateUser
// Update name, email, lastName, and location in Profile! No password!
const updateUser = async (req, res) => {
    // Note that 'req.user' is created during authentication middleware!
    const user = await User.findOneAndUpdate({ _id: req.user.userId }, req.body, {
        new: true,
        runValidators: true
    });

    // This user must exist because it is authenticated! The authentication middleware is placed before updateUser!

    // Since we may update the user name and it is part of JWT payload, we should create/sign a new token!
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            token
        }
    });
}

module.exports = { register, login, updateUser };