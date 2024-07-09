// Response body is a file's content, single file

const http = require('http');
const { readFileSync } = require('fs');

// Get the content of the file
// There are 2 reasons that we use readFileSync here: (1) We only read the file once before creating the server, we don't read the file each time the server receives a request, so that it won't waste much time (2) Easy to understand
const homePage = readFileSync('./resources/index.html', 'utf8');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // 'Content-Type' cannot be 'text/plain'!
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(homePage);
        res.end();
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

server.listen(5001, () => {
    console.log('Server is listening on port 5001');
});