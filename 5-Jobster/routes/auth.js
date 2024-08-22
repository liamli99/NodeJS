const express = require('express');
const router = express.Router();

const { register, login, updateUser } = require('../controllers/auth');
const authentication = require('../middleware/authentication');

// /api/v1/auth/register
router.route('/register').post(register);
// /api/v1/auth/login
router.route('/login').post(login);

// /api/v1/auth/updateUser
// Similar to jobsRouter, we can load authentication middleware before updateUser to verify the token before updating the user!
router.route('/updateUser').patch(authentication, updateUser);

module.exports = router;