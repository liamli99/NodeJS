const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

const authentication = require('../middleware/authentication');

// /api/v1/login
router.route('/login').post(login);
// /api/v1/dashboard
// The authentication middleware should be loaded before dashboard to verify the token!
router.route('/dashboard').get(authentication, dashboard);

module.exports = router;