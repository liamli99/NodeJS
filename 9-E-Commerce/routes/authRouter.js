const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/authController');

// /api/v1/auth/register
router.route('/register').post(register);
// /api/v1/auth/login
router.route('/login').post(login);
// /api/v1/auth/logout
router.route('/logout').get(logout);

module.exports = router;