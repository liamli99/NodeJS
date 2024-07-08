const http = require('http');

// Create an HTTP server that takes a callback as an argument. The callback is executed each time the server receives a request!
// The callback takes two arguments which are user request and server response
// https://nodejs.org/docs/latest/api/http.html#httpcreateserveroptions-requestlistener
const server = http.createServer((req, res) => {
    // This method sends a response header to the request
    // https://nodejs.org/docs/latest/api/http.html#responsewriteheadstatuscode-statusmessage-headers
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    // This method sends a chunk of the response body to the request. This method may be called multiple times to provide successive parts of the response body
    // https://nodejs.org/docs/latest/api/http.html#responsewritechunk-encoding-callback
    res.write('<h1>Hello World!</h1>');

    // This method signals to the server that all of the response headers and body have been sent, it MUST be called on each response!
    // https://nodejs.org/docs/latest/api/http.html#responseenddata-encoding-callback
    res.end();
});

// localhost:5001
// https://nodejs.org/docs/latest/api/net.html#serverlisten
server.listen(5001);


