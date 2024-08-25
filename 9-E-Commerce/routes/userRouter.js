const express = require('express');
const router = express.Router();

const { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } = require('../controllers/userController');

const authorization = require('../middleware/authorization');

// /api/v1/users
// Only admin can get all users!
router.route('/').get(authorization(['admin']), getAllUsers);

// Note that the following codes must be placed before `router.route('/:id')`!!!
// /api/v1/users/showMe
router.route('/showMe').get(showCurrentUser);
// /api/v1/users/updateUser
router.route('/updateUser').patch(updateUser);
// /api/v1/users/updateUserPassword
router.route('/updateUserPassword').patch(updateUserPassword);

// /api/v1/users/:id
router.route('/:id').get(getSingleUser);

module.exports = router;