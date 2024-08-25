const jwt = require('jsonwebtoken');

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

// This is used in controllers/authController.js
const setCookies = (res, payload) => {
  const token = createJWT(payload);
  
  const oneDay = 1000 * 60 * 60 * 24;
  
  // https://expressjs.com/en/api.html#res.cookie
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
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

module.exports = { createJWT, verifyJWT, setCookies, clearCookies }