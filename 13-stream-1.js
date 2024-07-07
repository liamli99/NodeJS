// Writable Stream
const { createWriteStream } = require('fs');

// All streams are instances of EventEmitter!
// https://nodejs.org/api/fs.html#fscreatewritestreampath-options
const writableStream = createWriteStream('./content/large.txt')

// Create large data
let data = '';
for (let i = 0; i < 10000; i++) {
    data += `hello world ${i}\n`;
}

// https://nodejs.org/api/stream.html#class-streamwritable

writableStream.write(data);
writableStream.end();

writableStream.on('finish', () => {
    console.log('All writes are now complete.');
});

writableStream.on('error', (err) => {
    console.error('Error:', err);
});