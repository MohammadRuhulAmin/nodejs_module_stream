import { EventEmitter } from 'node:events';
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('x'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');

myEE.emit('foo');

console.log(myEE.removeAllListeners()) /** returns object */

