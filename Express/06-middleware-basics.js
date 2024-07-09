const express = require('express');
const app = express();

// Create a middleware function
const logger = (req, res, next) => {
    console.log('Hello World');

    // If the middleware function doesn't end the request-resonse cycle, e.g. res.send, we must call next()!
    next();
}

// Apply middleware functions globally to all routes!
// app.use(logger);

// Apply middleware functions locally to specific routes! 
// Note that the callback is also a middleware function!!! So that next() in logger actually passes control to this callback!!! The logger executes first, then the callback executes!
app.get('/', logger, (req, res) => {
    res.status(200).send('<h1>Home Page</h1>');
});

app.get('/about', logger, (req, res) => {
    res.status(200).send('<h1>About Page</h1>');
});

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});