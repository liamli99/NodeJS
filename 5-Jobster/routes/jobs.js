const express = require('express');
const router = express.Router();

const { getAllJobs, getJob, createJob, updateJob, deleteJob, showStats } = require('../controllers/jobs');
const testUser = require('../middleware/testUser');

// /api/v1/jobs
// We should load testUser middleware before createJob to restrict this operation for test user! Note that testUser is also loaded after authentication middleware, see app.js!
router.route('/').get(getAllJobs).post(testUser, createJob);

// /api/v1/jobs/stats
// This line of code must be placed before '/:id'!!!!!!!
router.route('/stats').get(showStats);

// /api/v1/jobs/:id
// We should load testUser middleware before updateJob and deleteJob to restrict these operations for test user!
router.route('/:id').get(getJob).patch(testUser, updateJob).delete(testUser, deleteJob);


module.exports = router;