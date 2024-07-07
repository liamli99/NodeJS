// Event Emitter with HTTP module

const http = require('http'); 

// 'http.createServer()' returns an instance of an HTTP server which is also an EventEmitter!
const server = http.createServer();
// The 'request' event is emitted each time there is an incoming request 
server.on('request', (req, res) => {
    res.end('Welcome');
})

// The above code works the same as:
// const server = http.createServer((req, res) => {
//     res.end('Welcome');
// })

server.listen(5001);