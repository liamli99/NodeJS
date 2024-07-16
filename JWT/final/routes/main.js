const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

// /api/v1/login
router.route('/login').post(login);
// /api/v1/dashboard
router.route('/dashboard').get(dashboard);

module.exports = router;