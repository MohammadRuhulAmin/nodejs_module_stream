import {EventEmitter} from 'node:events'

class myEvent extends EventEmitter{

}

const myx = new myEvent()

myx.on('error',()=>{
    return new Promise(async(resolve,reject)=>{
       try{
        throw new Error('kaboom!')
       }catch(error){
        reject(error.message)
       }
    }).catch(err=>{console.log(err)})
})

myx.emit('error')