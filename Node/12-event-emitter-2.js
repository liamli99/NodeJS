// HTTP Server as Event Emitter

const http = require('http'); 

// 'http.createServer()' returns an HTTP server which is also an instance of EventEmitter!
// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
const server = http.createServer();
// The 'request' event is emitted each time there is an incoming request 
// https://nodejs.org/api/http.html#class-httpserver
server.on('request', (req, res) => {
    res.end('Welcome');
})

// The above code works the same as:
// const server = http.createServer((req, res) => {
//     res.end('Welcome');
// })

server.listen(5001);