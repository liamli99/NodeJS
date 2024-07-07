// HTTP Server with Stream Response

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // It is not a good idea to read the whole file
    // const text = fs.readFileSync('./content/large.txt', 'utf8');
    // res.end(text);

    // Instead, we should use stream! Now the Transfer-Encoding is chunked!
    const readableStream = fs.createReadStream('./content/large.txt', 'utf8');
    // https://nodejs.org/api/fs.html#event-open
    readableStream.on('open', () => {
        // https://nodejs.org/api/stream.html#readablepipedestination-options
        // Note that res is a writable stream!
        readableStream.pipe(res);
    })
});

server.listen(5001);