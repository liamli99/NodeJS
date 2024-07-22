const express = require('express');
const router = express.Router();

const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// /api/v1/tasks
router.route('/').get(getAllTasks).post(createTask);

// /api/v1/tasks/:id
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;