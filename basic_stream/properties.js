import {log} from "node:console"
import * as fsPromise from "node:fs/promises"

(async ()=>{
    
    try{
      const fileHandle = await fsPromise.open('../prac.txt','w')
      const stream = fileHandle.createWriteStream()
      log(stream.writableHighWaterMark)
      log("writableLength: ",stream.writableLength)
      const buffer = Buffer.alloc(16384,'a')
      stream.write(buffer)
      
      log("writableLength: ",stream.writableLength) /** the current size of the buffer */
      stream.end('ok bye') /** if stream.end() is called, 
      stream.writableEnded will be true otherwise it will be false */
      log("writableEnded: ",stream.writableEnded) 
      
      log("destroyed: ",stream.destroyed)
      log("writableNeedDrain: ", stream.writableNeedDrain)
      log("writableFinished: ", stream.writableFinished)
      log("writableObjectMode: ", stream.writableObjectMode)
      stream.on('error',()=>{log('error')})
      log("errored", stream.errored) /**The errored property in a Node.js writable stream is used to determine whether an error has occurred during the stream's operation. 
      This property helps track if the stream encountered an issue during writing or its lifecycle. */
      stream.destroy(new Error('error')); /** when it is called stream.writableAborted = true 
      otherwise it will be false */
      log("writableAborted: ", stream.writableAborted)
    }catch(error){
      log(error.message)
    }

})()


