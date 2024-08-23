const express = require('express');
const router = express.Router();

const { getAllJobs, getJob, createJob, updateJob, deleteJob, showStats } = require('../controllers/jobs');

// /api/v1/jobs
router.route('/').get(getAllJobs).post(createJob);

// /api/v1/jobs/stats
// It must be placed before '/:id'!!!!!!!
router.route('/stats').get(showStats);

// /api/v1/jobs/:id
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);


module.exports = router;