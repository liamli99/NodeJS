// Callback hell

const { readFile, writeFile } = require('fs');

readFile('./content/first.txt', 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    const first = data;

    readFile('./content/second.txt', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const second = data;

        writeFile('./content/result-async.txt', `${first}, ${second}`, (err) => {
            if (err) {
                throw err;
            }
        });
    })
});

