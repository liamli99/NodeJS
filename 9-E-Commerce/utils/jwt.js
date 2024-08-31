const jwt = require('jsonwebtoken');

// This is used in controllers/authController.js and controllers/userController.js
const createPayload = (user) => {
  return {
    userId: user._id,
    userName: user.name,
    role: user.role
  }
}

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

// This is used in controllers/authController.js and controllers/userController.js
const setCookies = (res, payload) => {
  const token = createJWT(payload);
  
  const oneDay = 1000 * 60 * 60 * 24;
  
  // https://expressjs.com/en/api.html#res.cookie
  res.cookie('token', token, {
    // Cookie is accessible only by the server!
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // Cookie can be used only with HTTPS
    secure: process.env.NODE_ENV === 'production',
    // Signed cookie
    signed: true
  });
}

// This is used in controllers/authController.js
const clearCookies = (res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  });
}

module.exports = { createPayload, createJWT, verifyJWT, setCookies, clearCookies }