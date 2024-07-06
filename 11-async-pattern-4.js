// Async/Await

const { readFile, writeFile } = require('fs');

const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const writeFilePromise = (path, content) => {
    return new Promise((resolve, reject) => {
        writeFile(path, content, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

async function readAndWrite() {
    try {
        const first = await readFilePromise('./content/first.txt')
        const second = await readFilePromise('./content/second.txt')
        console.log(first, second)
        await writeFilePromise('./content/result-async.txt', `${first}, ${second}`)
    } catch (err) {
        console.log(err)
    }
}

readAndWrite();