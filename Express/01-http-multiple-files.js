// Response body is a file's content, multiple files

const http = require('http');
const { readFileSync } = require('fs');

// Get the content of the file
const homePage = readFileSync('./resources/navbar-app/index.html', 'utf8');
const homeStyles = readFileSync('./resources/navbar-app/styles.css');
const homeImage = readFileSync('./resources/navbar-app/logo.svg');
const homeLogic = readFileSync('./resources/navbar-app/browser-app.js');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(homePage);
        res.end();
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>About Page</h1>');
        res.end();
    
    // Since in index.html, it loads './styles.css', './browser-app.js', and './logo.svg', we should also send these codes as response body to the request when the request url is '/styles.css', '/browser-app.js', and '/logo.svg'!
    // Note that the value of Content-Type should also be modified accordingly!

    } else if (req.url === '/styles.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(homeStyles);
        res.end();
    } else if (req.url === '/browser-app.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(homeLogic);
        res.end();
    } else if (req.url === '/logo.svg') {
        res.writeHead(200, { 'content-type': 'image/svg+xml' });
        res.write(homeImage);
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