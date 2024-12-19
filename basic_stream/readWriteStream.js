import { log } from "node:console"
import * as fsPromise from "node:fs/promises"

(async ()=>{
    let fsReadHandle,fsWriteHandle;
    try{
        const fsReadHandle = await fsPromise.open('../public/videos/dpool.mp4','r')
        const fsWriteHandle = await fsPromise.open('../public/videos/dpool-cp.mp4','w')
        const readStream = fsReadHandle.createReadStream({highWaterMark: 64* 1024 })
        const writeStream = fsWriteHandle.createWriteStream()
        readStream.on('data',(chunk)=>{if(!writeStream.write(chunk))readStream.pause()})
        writeStream.on('drain',()=>{
            log('writableHigherWaterMark: ' , writeStream.writableHighWaterMark)
            log('drained!')

            readStream.resume()
        })
        readStream.on('end',()=>log('read stream ended'))
        writeStream.on('error',(err)=>{log(err.message)})
        writeStream.on('finish',()=>{
            log('write done!')
        })
    }catch(error){
        log(error)
    }finally{
        await fsReadHandle?.close()
        await fsWriteHandle?.close()
    }
})()