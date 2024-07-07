// Readable Stream
const { createReadStream } = require('fs');

// All streams are instances of EventEmitter!
// https://nodejs.org/api/fs.html#fscreatereadstreampath-options
// const readableStream = createReadStream('./content/large.txt', {
//     highWaterMark: 90000,
//     encoding: 'utf8'
// });
const readableStream = createReadStream('./content/large.txt');

// https://nodejs.org/api/stream.html#class-streamreadable
readableStream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
})