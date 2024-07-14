// CommonJS modules

const names = require('./03-variables');
console.log(names); // Object!
console.log(names.john);

const { john } = require('./03-variables');
console.log(john);

const sayHi123 = require('./03-functions');
console.log(sayHi123);
sayHi123('Liam');