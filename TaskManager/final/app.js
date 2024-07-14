require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const taskRouter = require('./routers/taskRouter');

const notFound = require('./middleware/not-found');

// Built-in Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRouter);
app.use(notFound);

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