const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const mongoose = require('mongoose');
const moment = require('moment');

// POST /api/v1/jobs
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    
    res.status(StatusCodes.CREATED).json({ job });
}

// GET /api/v1/jobs
// The additional implementation of request query is similar to 2-Store!
const getAllJobs = async (req, res) => {
    // const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt');


    // 1. Find

    const queryObject = { createdBy: req.user.userId };
    const { search, status, jobType, sort } = req.query;

    // Find all documents whose 'position' field contains 'req.query.search' and is case-insensitive!
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' };
    }

    // Find all documents whose 'status' and 'jobType' must be the same as 'req.query.status' and 'req.query.jobType'!
    if (status && status !== 'all') {
        queryObject.status = status;
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }

    let result = Job.find(queryObject);

    // 2. Sort

    if (sort === 'latest') {
        result = result.sort('-createdAt');
    } else if (sort === 'oldest') {
        result = result.sort('createdAt');
    } else if (sort === 'a-z') {
        result = result.sort('position');
    } else if (sort === 'z-a') {
        result = result.sort('-position');
    }

    // 3. Pagination

    const page = Number(req.query.page) || 1; // current page number
    const limit = Number(req.query.limit) || 10; // maximum number of documents on a page
    const skip = (page - 1) * limit; // number of documents to skip

    result = result.skip(skip).limit(limit);

    const totalJobs = await Job.countDocuments(queryObject); // total number of filtered documents
    const numOfPages = Math.ceil(totalJobs / limit); // total number of pages

    const jobs = await result;
    
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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

// GET /api/v1/jobs/stats
const showStats = async (req, res) => {
    // Note that req.user.userId is a String! We need to convert it to an ObjectId because $match expects types to match exactly!!! However, when using create and find functions, mongoose automatically handles the conversion!!!
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId.createFromHexString(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // console.log(stats);
    
    // Reduce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    stats = stats.reduce((acc, curr) => {
        const { _id, count } = curr;
        acc[_id] = count;
        return acc;
    }, {});

    // console.log(stats);

    // In case some properties doesn't exist!
    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId.createFromHexString(req.user.userId) } },
        { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 }
    ]);

    // console.log(monthlyApplications);

    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count } = item;
        // In MondoDB, 1 is Jan, but in moment, 0 is Jan!!!
        // https://momentjs.com/docs/#/displaying/format/
        const date = moment().month(month - 1).year(year).format('MMM Y');
        
        return { count, date };
    }).reverse();

    // console.log(monthlyApplications);


    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob, showStats };