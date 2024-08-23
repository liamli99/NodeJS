require('dotenv').config(); // Or import 'dotenv/config'

const express = require('express');
const app = express();

const taskRouter = require('./routes/taskRouter');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const connectDB = require('./db/connect');


// Built-in Middleware
// It serves static files from a directory. If we navigate to root url ('/'), Express will look for a default file (index.html) to serve: https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// This is only used in POST and PUT requests! So that we can use 'req.body' to access the data in the body of POST and PUT requests: https://expressjs.com/en/4x/api.html#express.json
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRouter);

// Custom Middleware
app.use(notFound); // Handle all undefined routes
app.use(errorHandler); // Handle errors! Note that error-handling middleware is defined last, after other app.use() and routes call!!!

// We should first connect to the database, then listen for connections!
// Note that we don't have to set the PORT environment variable in .env because this is always provided by cloud services! If not, then use 3000 instead! However, if we want to override the provided port, we can set it in .env!
const port = process.env.PORT || 3000;
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