// https://nodejs.org/docs/latest/api/os.html

const os = require('os'); // Object!

// Info about current user
console.log(os.userInfo());

// System uptime in seconds
console.log(os.uptime());

// Info about current OS
const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem()
}
console.log(currentOS);