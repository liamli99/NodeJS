const express = require('express');
const app = express();

// Create middleware functions
const logger = (req, res, next) => {
    console.log('Hello World');

    // If the middleware function doesn't end the request-resonse cycle, e.g. res.send, we must call next()!
    next();
}
const authorize = (req, res, next) => {
    const { user } = req.query;
    if (user === 'Liam') {
        // Add a new property value to the request object!!!
        req.user = { name: 'Liam', id: 1 };
        next();
    } else {
        // End the request-response cycle, so that callbacks in specific routes won't be executed!
        res.status(401).send('Unauthorized');
    }
};

// Apply middleware functions to specific routes: https://expressjs.com/en/4x/api.html#app.use
// If no path argument, then apply middleware functions globally to all routes!
// The middleware functions that are loaded first are also executed first! So that logger executes first, authorize executes second, and the callbacks in specific routes execute last!
app.use([logger, authorize]);

app.get('/', (req, res) => {
    console.log(req.user);
    res.status(200).send('<h1>Home Page</h1>');
});

app.get('/about', (req, res) => {
    console.log(req.user);
    res.status(200).send('<h1>About Page</h1>');
});

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});