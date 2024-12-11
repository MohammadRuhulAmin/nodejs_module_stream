import {EventEmitter} from "node:events"
class MyEmitter extends EventEmitter{}
const myEmitter = new MyEmitter()
myEmitter.on('error',(err)=>{
    console.log(`Error: ${err.message}`)
}).emit('error',new Error('Hi this is an error message'))
myEmitter.emit('error',new Error('Error 2'))