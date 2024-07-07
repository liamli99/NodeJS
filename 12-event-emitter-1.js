https://nodejs.org/api/events.html

const EventEmitter = require('events');

const customEmitter = new EventEmitter();

// on: register a listener for an event
// The first parameter is event, the second parameter is listener which is a callback
// When this event is emitted, the listener will be executed!
// Here response is just a custom event, you can define any string as an event name!
customEmitter.on('response', () => {
    console.log('hello');
});

// We can register multiple listeners for the same event!
// The event listener can also have parameters!
customEmitter.on('response', (name, id) => {
    console.log(`data received from ${name} with id: ${id}`);
});



// emit: emit an event, it should be after 'on'!!!
// The first parameter is event, the rest of the parameters are arguments that are passed to the listeners
// All listeners registered for this event will be executed in the order they were registered!
customEmitter.emit('response', 'Liam', '01');