require('dotenv').config();

const express = require('express');
const app = express();

const taskRouter = require('./routes/taskRouter');

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

const connectDB = require('./db/connect');




// Built-in Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRouter);

// Custom Middleware
app.use(errorHandler); // Handle errors that are passed to this middleware in taskController.js
app.use(notFound); // Handle all undefined routes

// We should first connect to the database!!!
port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();