// https://nodejs.org/docs/latest/api/http.html

const http = require('http'); // Object!

// User request and Server response, the callback is executed each time the server receives a request!
// https://nodejs.org/docs/latest/api/http.html#httpcreateserveroptions-requestlistener
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

// After running this file, go to localhost:5001, 5001 is port number!
// The callback is executed once the server starts listening
// https://nodejs.org/docs/latest/api/http.html#serverlisten
server.listen(5001, () => {
    console.log('Server listening on port : 5001....');
});