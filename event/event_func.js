import {EventEmitter} from "node:events"
class MyEmitter extends EventEmitter{}
const myEmitter  = new MyEmitter()
/**Dynamic (bound to myEmitter) */
myEmitter.on('event',function(a,b){
    console.log(a,b,this,this === myEmitter)
})

myEmitter.emit('event')