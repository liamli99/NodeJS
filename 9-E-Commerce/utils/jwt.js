const jwt = require('jsonwebtoken');

// This is used in controllers/authController.js
const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });

  return token;
}

// This is used in middleware/authentication.js
const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { createJWT, verifyJWT }