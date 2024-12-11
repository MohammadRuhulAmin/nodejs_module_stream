import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Use `newListener` only if additional logic is necessary
myEmitter.once('newListener', (event, listener) => {
    console.log(`A new listener was added for event: ${event}, ${listener}`);
});

myEmitter.on('eventx', () => {
    console.log('A');
});
myEmitter.on('eventy', () => {
    console.log('B');
});
myEmitter.on('eventz', () => {
    console.log('C');
});

// Emit events
myEmitter.emit('eventx'); // Outputs: A
myEmitter.emit('eventy'); // Outputs: B
myEmitter.emit('eventz'); // Outputs: C
