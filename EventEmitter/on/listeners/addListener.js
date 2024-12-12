import {EventEmitter} from 'node:events'
/** 
 * addListener method in Node.js EventEmitter class is an alias for the on Method
 * 
 */

const lisA = (name)=>{
    console.log(`hellow A !${name}`)
}

const lisB = (name)=>{
    console.log(`hellow B !${name}`)
}

const emitter = new EventEmitter()
emitter.addListener('greet',lisA)


emitter.emit('greet', 'Alice'); 
emitter.emit('greet', 'Bob');  

emitter.addListener('greet',lisB)

emitter.emit('greet', 'Alice'); 
emitter.emit('greet', 'Bob');  
