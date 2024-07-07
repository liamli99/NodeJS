// CommonJS modules

const names = require('./03-variables');
const { john } = require('./03-variables');

console.log(names); // Object!
console.log(names.john);
console.log(john);

const sayHi = require('./03-functions');

sayHi('Liam');