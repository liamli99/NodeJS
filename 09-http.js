// https://nodejs.org/docs/latest/api/http.html

const http = require('http'); // Object!

// User request and Server response
const server = http.createServer((req, res) => {
    // localhost:5001
    if (req.url === '/') {
        res.end('Welcome to our home page');
    // localhost:5001/about
    } else if (req.url === '/about') {
        res.end('Welcome to about page');
    } else {
        res.end(`
            <h1>Oops! We cannot find the page!</h1>
            <a href='/'>Go back to home page</a>
        `);
    }

})

// After running this file, go to localhost:5001
server.listen(5001);