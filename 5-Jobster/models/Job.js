const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: String, 
        required: [true, 'Company is required'],
        maxlength: 50
    },
    position: {
        type: String, 
        required: [true, 'Position is required'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
        required: [true, 'User is required']
    },

    // Additional fields
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time'
    },
    jobLocation: {
        type: String,
        required: [true, 'Job Location is required']
    },
}, { timestamps: true }); 
 
module.exports = mongoose.model('Job', JobSchema);