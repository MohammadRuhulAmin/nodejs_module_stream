import fs from "node:fs/promises"

class ReadStream{
    constructor(filepathRead,filepathWrite,operationRead,operationWrite){
        this.filepathRead = filepathRead
        this.operationRead = operationRead 
        this.filepathWrite = filepathWrite
        this.operationWrite = operationWrite
    }
    async fileReadStream(){
        const fileHandleRead = await fs.open(this.filepathRead,this.operationRead)
        const fileHandleWrite = await fs.open(this.filepathWrite,this.operationWrite)
        const streamRead = fileHandleRead.createReadStream({highWaterMark:1})
        const streamWrite = fileHandleWrite.createWriteStream()
        streamRead.on('data',(chunk)=>{
            if(!streamWrite.write(chunk)){
                streamRead.pause()
            }
        })
        streamWrite.on('drain',()=>streamRead.resume())
        streamRead.on('close',()=>{
            fileHandleRead.close()
            console.log(`${this.filepathRead} has been closed!`)
        })
        streamWrite.on('finish',()=>{
            fileHandleWrite.close()
            console.log(`${this.filepathWrite} has been closed!`)
        })
    }
}

const rStream = new ReadStream('../public/files/source.txt','../public/files/destination.txt','r','w')
rStream.fileReadStream()