// Read File Asynchrnously

const { readFile } = require('fs');

console.log('started a first task');

// Event Loop offloads this operation
readFile('./content/first.txt', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log('completed first task');
})

console.log('starting next task');