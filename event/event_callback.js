import { EventEmitter } from 'node:events';
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
/** registering a listener */
myEmitter.on('event', (a, b)=>{
    /** this key doesnot work here, arrow function do not have their own this context.  */
    console.log(a, b, this, this === myEmitter);
})

myEmitter.emit('event','a','b')


