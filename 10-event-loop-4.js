const http = require('http');

// The callback is executed each time the server receives a request
const server = http.createServer((req, res) => {
  console.log('request event');
  res.end('Hello World');
})

// The callback is executed once the server starts listening
server.listen(5001, () => {
  console.log('Server listening on port : 5001....');
})