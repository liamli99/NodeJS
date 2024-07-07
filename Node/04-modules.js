// CommonJS modules, the results should be exactly the same as 03-modules.js!

const names = require('./03-variables');
const { john } = require('./03-variables');

console.log(names); // object
console.log(names.john);
console.log(john);

const sayHi = require('./03-functions');

sayHi('Liam');