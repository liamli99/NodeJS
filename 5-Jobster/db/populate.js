// Populate a MongoDB database with MOCK_DATA.json

require('dotenv').config();
const connectDB = require('./connect');
const Job = require('../models/Job');
const data = require('./MOCK_DATA.json'); 

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Job.deleteMany();
        await Job.create(data);
        
        console.log('Success');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
start();