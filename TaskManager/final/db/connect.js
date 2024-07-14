const mongoose = require('mongoose');

// Connection: https://mongoosejs.com/docs/connections.html

// uri is the connection string which is stored in .env!
const connectDB = (uri) => {
    // https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.connect()
    // The return value of mongoose.connect() is Promise! 
    return mongoose.connect(uri);
}

module.exports = connectDB;