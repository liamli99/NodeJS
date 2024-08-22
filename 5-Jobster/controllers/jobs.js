const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// POST /api/v1/jobs, create a job for a specific user
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    
    res.status(StatusCodes.CREATED).json({ job });
}

// GET /api/v1/jobs
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt');
    
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

// GET /api/v1/jobs/:id
const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findOne({ createdBy: req.user.userId, _id: id });

    if (!job) {
        throw new NotFoundError('Job Not Found');
    }

    res.status(StatusCodes.OK).json({ job });
}

// PATCH /api/v1/jobs/:id
const updateJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findOneAndUpdate({ createdBy: req.user.userId, _id: id }, req.body, {
        new: true, 
        runValidators: true
    });

    if (!job) {
        throw new NotFoundError('Job Not Found');
    }

    res.status(StatusCodes.OK).json({ job });
}

// DELETE /api/v1/jobs/:id
const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findOneAndDelete({ createdBy: req.user.userId, _id: id });

    if (!job) {
        throw new NotFoundError('Job Not Found');
    }

    res.status(StatusCodes.OK).json({ job });
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };