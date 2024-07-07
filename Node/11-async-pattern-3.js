// Promise

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

readFilePromise('./content/first.txt')
    .then(first => {
        return readFilePromise('./content/second.txt')
            .then(second => {
                return writeFilePromise('./content/result-async.txt', `${first}, ${second}`)
            })
    })
    .catch(err => {
        console.log(err)
    })