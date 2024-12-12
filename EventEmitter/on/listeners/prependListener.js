import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('x'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');

myEE.emit('foo');

myEE.removeAllListeners()
