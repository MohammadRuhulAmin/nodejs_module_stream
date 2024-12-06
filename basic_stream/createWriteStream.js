import * as fs from "node:fs/promises"
import { Buffer } from "node:buffer"

class createWriteStream{
    constructor(filepath,operation){
        this.filepath = filepath
        this.operation = operation
    }
    async myStream(){
        const fileHandle = await fs.open(this.filepath,this.operation)
        const stream = fileHandle.createWriteStream()
        console.log(stream.writableHighWaterMark)
        let i = 0;
        const numberOfWrites = 100000;

        const writeMany = ()=>{
            while(i<numberOfWrites){
                const buffer = new Buffer.from(` ${i} `,'utf-8')
                if(i === numberOfWrites -1)return stream.end(buffer) /** Last writable stream */
                if(!stream.write(buffer))break; /** Attempts to write the data (buffer) to the stream. 
                If the stream cannot handle the data immediately (because of backpressure),
                this method will return false. */
                i++;
            }
        }
        writeMany()
        stream.on('drain',()=>{writeMany()})
        stream.on("finish",()=>fileHandle.close())

    }
}

const c1 = new createWriteStream("../public/files/bigSource.txt",'w')
c1.myStream()