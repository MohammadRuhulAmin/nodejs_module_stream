import {EventEmitter} from 'node:events'
const myEmitter = new EventEmitter()

const listenerA=()=>{
    console.log('listener A executed')
}
const listenerB = ()=>{
    console.log('listener B executed')
}


myEmitter.on('eA',listenerA)
myEmitter.on('eA',listenerB)

myEmitter.emit('eA')

myEmitter.off('eA',listenerA)
myEmitter.emit('eA')
console.log(myEmitter.errorMonitor)