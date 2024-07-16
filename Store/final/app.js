require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const productRouter = require('./routes/products');

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

const connectDB = require('./db/connect');


// Built-in Middleware
app.use(express.json()); // This is actually not used in this project, just include it for practice!

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Link</a>');
});
app.use('/api/v1/products', productRouter);

// Custom Middleware
app.use(errorHandler);
app.use(notFound);

// Connect to database and listen on the port
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