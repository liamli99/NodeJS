// https://nodejs.org/docs/latest/api/path.html

const path = require('path'); // Object!

// Platform-specific path segment separator
console.log(path.sep);

// Join all given path segments together using the platform-specific separator as a delimiter, then normalize the resulting path
console.log(path.join('content///', '/subfoloder', 'test.txt'));

// The last portion of a path
console.log(path.basename('/foo/bar/baz/asdf/quux.html'));

// Resolve a sequence of paths or path segments into an absolute path
console.log(path.resolve(__dirname, 'content', 'subfoloder', 'test.txt'));