// This example illustrates the importance of using asynchronous code!

const http = require('http'); 

const server = http.createServer((req, res) => {
    // localhost:5001
    if (req.url === '/') {
        res.end('Home page');
    // localhost:5001/about
    } else if (req.url === '/about') {
        // Time comsuming blocking code! 
        // When the url is localhost:5001/about, it takes the server a long time to response because of the loop! Meanwhile, if we go to localhost:5001, the server cannot response until the loop finishes! 
        // To solve this issue, we should use asynchronous code!
        for (let i = 0; i < 1000000; i++) {
            console.log(i);
        }

        res.end('About page');
    } else {
        res.end('Error');
    }

})

server.listen(5001, () => {
    console.log('Server listening on port : 5001....');
});