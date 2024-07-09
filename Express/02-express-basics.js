// Equivalent to 01-http-request.js

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // If the data is a string, then the default 'Content-Type' is 'text/html'!
    res.status(200).send('<h1>Home Page</h1>');
});

app.get('/about', (req, res) => {
    res.status(200).send('<h1>About Page</h1>');
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});

// Common methods: https://expressjs.com/en/api.html
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen