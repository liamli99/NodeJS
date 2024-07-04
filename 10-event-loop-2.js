// Start operating system process

console.log('first')

// Event Loop offloads this operation
setTimeout(() => {
  console.log('second')
}, 0)

console.log('third')

// Complete and exit operating system process