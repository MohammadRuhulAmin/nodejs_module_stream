import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();


/**
 * newListener Hooks
 * Runs only once when the first listener is added
 * 
 */

myEmitter.once('newListener',(event,listener)=>{
    if(event === 'event')console.log('event registered')
    
})

const listenerA = ()=>console.log('A called')
const listenerB = ()=>console.log('B called')
myEmitter.on('event',listenerA)
myEmitter.on('event',listenerB)
myEmitter.emit('event')