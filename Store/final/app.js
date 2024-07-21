require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const productRouter = require('./routes/products');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const connectDB = require('./db/connect');

// Note that this project doesn't need this middleware because this is used only for POST and PUT requests!!! This middleware can recognize the incoming request object as a JSON Object so that we can use 'req.body' to access the data within POST and PUT requests!!!
// app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Link</a>');
});
app.use('/api/v1/products', productRouter);

// Custom Middleware
app.use(notFound);
app.use(errorHandler);

// Connect to database and listen on the port
const port = process.env.PORT || 5000;
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