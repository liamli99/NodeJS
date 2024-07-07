// https://nodejs.org/docs/latest/api/fs.html

// This is the same as const fs = require('fs') and fs.readFileSync() and fs.writeFileSync()!
const { readFileSync, writeFileSync } = require('fs');

// The content of the file
const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');

console.log(first);
console.log(second);

// Create a new file if doesn't exist or overwrite the file if exists
writeFileSync('./content/result-sync.txt', 'This is the sync result');

// Note that readFileSync/writeFileSync reads/writes the file synchronously, this means that these functions block the execution of the program until the file is fully read/written!!!
console.log('done');