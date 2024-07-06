const EventEmitter = require('events');

const customEmitter = new EventEmitter();

// on: listen for an event
// Here response is just a custom event, you can define any string as an event name!
// When this event is emitted, the callback function will be executed
customEmitter.on('response', () => {
    console.log('data received');
})

customEmitter.on('response', () => {

})



// emit: emit an event, it should be after 'on'!!!
customEmitter.emit('response');