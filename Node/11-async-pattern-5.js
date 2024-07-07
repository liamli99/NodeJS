// In Node.js, we don't have to write promise by ourselves! 
// We can use util.promisify to convert, or 
// we can use const { readFile, writeFile } = require('fs').promises!

const { readFile, writeFile } = require('fs');
const util = require('util');

const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

// const readAndWrite = async () => { ... }
async function readAndWrite() {
    try {
        const first = await readFilePromise('./content/first.txt', 'utf8')
        const second = await readFilePromise('./content/second.txt', 'utf8')
        console.log(first, second)
        await writeFilePromise('./content/result-async.txt', `${first}, ${second}`)
    } catch (err) {
        console.log(err)
    }
}

readAndWrite();