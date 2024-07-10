// Equivalent to 01-http-multiple-files.js

const path = require('path');

const express = require('express');
const app = express();

// It serves static files from a directory, e.g. 'browser-app.js' is loaded in 'localhost:5001/browser-app.js'!
// It loads the front end project: https://expressjs.com/en/starter/static-files.html
app.use(express.static('./resources/public'));

app.get('/', (req, res) => {
    // The path must be absolute!
    res.status(200).sendFile(path.join(__dirname, './resources/navbar-app/index.html'));
});

// Note that since index.html is also a static file, we can actually put index.html to public folder and comment the above piece of code! This works because if we navigate to root url ('/'), Express will look for a default file (index.html) to load!!! This means that 'localhost:5001' and 'localhost:5001/index.html' can load the same webpage!!!

app.get('/about', (req, res) => {
    res.status(200).send('<h1>About Page</h1>');
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});