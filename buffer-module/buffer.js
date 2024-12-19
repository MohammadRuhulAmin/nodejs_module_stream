import * as fsPromise from "node:fs/promises"
import { log } from "node:console"

(async ()=>{
    console.time('writeMany')
    const fileHandle  = await fsPromise.open("../prac.txt",'w')
    const stream = fileHandle.createWriteStream()
    log(stream.writableHighWaterMark)
    log(stream.writableLength)

    const writeMany = ()=>{
        let iterator = 0;
        while(iterator < 1000000){
            const buffer = Buffer.from(`${iterator} `,'utf-8')
            if(!stream.write(buffer))break;
            iterator++;
        }
    }
    writeMany();
    stream.on('drain',()=>{
        writeMany();
    })
    fileHandle.close()
    stream.on('close',()=>{
        console.timeEnd('writeMany')
    })


})()