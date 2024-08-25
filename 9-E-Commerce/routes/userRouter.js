const express = require('express');
const router = express.Router();

const { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword } = require('../controllers/userController');

// /api/v1/users
router.route('/').get(getAllUsers);

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