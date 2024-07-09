const http = require('http');

// Create an HTTP server that takes a callback as an argument. The callback is executed each time the server receives a request!
// The callback takes two arguments which are user request and server response
// https://nodejs.org/docs/latest/api/http.html#httpcreateserveroptions-requestlistener
const server = http.createServer((req, res) => {
    // Request method
    // console.log(req.method);

    // Request url, the request url of home page (localhost:portNumber) is '/'!
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Home Page</h1>');
        res.end();
    // The request url of about page (localhost:portNumber/about) is '/about'!
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>About Page</h1>');
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>Page Not Found</h1>');
        res.end();
    }
});

// localhost:5001
// https://nodejs.org/docs/latest/api/net.html#serverlisten
server.listen(5001, () => {
    console.log('Server is listening on port 5001');
});


