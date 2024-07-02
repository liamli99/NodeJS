// https://nodejs.org/docs/latest/api/fs.html

// This is the same as const fs = require('fs') and fs.readFile() and fs.writeFile()!
// Different from readFileSync and writeFileSync, here readFile and writeFile also have callback as parameter!
const { readFile, writeFile } = require('fs');

// The content of the file is data!
readFile('./content/first.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
});

readFile('./content/second.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
});


// Create a new file if doesn't exist or overwrite the file if exists
writeFile('./content/result-async.txt', 'This is the async result', (err) => {
    if (err) {
        throw err;
    }
});