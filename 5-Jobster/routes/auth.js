const express = require('express');
const router = express.Router();

const { register, login, updateUser } = require('../controllers/auth');
const authentication = require('../middleware/authentication');
const testUser = require('../middleware/testUser');

const { rateLimit } = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Remember requests for 15 min
  limit: 10, // Limit each IP to 10 requests per 'window' (here, per 15 min)
  message: {
    msg: 'Too many requests, please try again after 15 minutes!'
  }
});

// Different from 4-Job, here we only apply rate limit to register and login!
// /api/v1/auth/register
router.route('/register').post(limiter, register);
// /api/v1/auth/login
router.route('/login').post(limiter, login);

// /api/v1/auth/updateUser
// Similar to jobsRouter, we can load authentication middleware before updateUser to verify the token before updating the user! Moreover, we should load testUser middleware before updateUser to restrict this operation for test user!
router.route('/updateUser').patch(authentication, testUser, updateUser);

module.exports = router;