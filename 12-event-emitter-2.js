// Event Emitter with HTTP module

const http = require('http'); 

const server = http.createServer();
server.on('request', (req, res) => {
    res.end('Welcome');
})

// The above code works the same as:
// const server = http.createServer((req, res) => {
//     res.end('Welcome');
// })

server.listen(5001);