const express = require('express');
const router = express.Router();

const { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } = require('../controllers/userController');

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

// /api/v1/users
// Only admin can get all users!
router.route('/').get(authentication, authorization(['admin']), getAllUsers);

// Note that the following codes must be placed before `router.route('/:id')`!!!
// /api/v1/users/showMe
router.route('/showMe').get(authentication, showCurrentUser);
// /api/v1/users/updateUser
router.route('/updateUser').patch(authentication, updateUser);
// /api/v1/users/updateUserPassword
router.route('/updateUserPassword').patch(authentication, updateUserPassword);

// /api/v1/users/:id
router.route('/:id').get(authentication, getSingleUser);

module.exports = router;