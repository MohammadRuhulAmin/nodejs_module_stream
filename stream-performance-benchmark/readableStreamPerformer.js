import * as fsPromise from "node:fs/promises"
class readableStreamPerformer{
    constructor(filePath,operation){
        this.filePath = filePath
        this.operation = operation
    }


    /** Not an efficient API  for reading big file like 10GB file*/
    async readableStreamPromiseAPI(){
        let fileHandle;
        try{
            console.time("readableStreamPromiseAPI")
            fileHandle = await fsPromise.open(this.filePath,this.operation)
            const stream = fileHandle.createReadStream({highWaterMark:64 * 1024}) /** default highWaterMark = 64kb */
            stream.on("data",(chunk)=>{
                console.log('----------')
                console.log(chunk) /** chunk.length to check the highWaterMark value */
            })
            stream.on("end",()=>{
                console.timeEnd("readableStreamPromiseAPI")
            })
        }catch(error){
            console.error(error.message)
        }
    }

    /** process time: 25 ms memory: huge, 
     * instead of read the write may take more time.. 
     *  Not an efficient API  for reading big file like 10GB file.
     * */
    async readWriteStreamPromiseAPI(sourceFilePath,sourceOp,destFilePath,destOp){
        let fileHandleRead,fileHandleWrite;
        try{
            console.time('readWriteStreamPromiseAPI')
            fileHandleRead = await fsPromise.open(sourceFilePath,sourceOp)
            fileHandleWrite = await fsPromise.open(destFilePath,destOp)
            const streamRead = fileHandleRead.createReadStream({highWaterMark:64 * 1024})
            const streamWrite = fileHandleWrite.createWriteStream()
            
            streamRead.on('data',(chunk)=>{
                streamWrite.write(chunk)
            })
            streamRead.on('end',()=>{console.timeEnd('readWriteStreamPromiseAPI')})
        }catch(error){
            console.error(error.message)
        }
    }

    /** performance : 4 ms */
    async readWriteStreamMemoryEfficientFastAPI(sourceFilePath,sourceOp,destFilePath,destOp){
        let fileHandleRead,fileHandleWrite;
        try{
            console.time('readWriteStreamMemoryEfficientFastAPI')
            fileHandleRead = await fsPromise.open(sourceFilePath,sourceOp)
            fileHandleWrite = await fsPromise.open(destFilePath,destOp)
            const streamRead = fileHandleRead.createReadStream({highWaterMark: 64* 1024})
            const streamWrite = fileHandleWrite.createWriteStream()
            streamRead.on('data',(chunk)=>{
                /** when the  writableLength > highWaterMark, that time backpressure will be triggered and it will return false,
                 * then we will pause the read stream.
                 * */
                if(streamWrite.write(chunk) === false)streamRead.pause()
            })
            streamRead.on('error',(err)=>{console.error(err.message)})
            streamRead.on('close',()=>{console.log('ReadStream has been closed...')})


            /** When the writableLength  */
            streamWrite.on('drain',()=>streamRead.resume())
            streamWrite.on('finish',()=>{
                console.timeEnd('readWriteStreamMemoryEfficientFastAPI')
                console.log('writable stream has been finished')
            })

            streamWrite.on('error', (err) => {console.error(`Write stream error: ${err.message}`);});
    
            streamWrite.on('close', () => {console.log('Write stream closed.');});
        }catch(error){console.error(error)}
        finally{
            fileHandleRead?.close()
            fileHandleWrite?.close()
        }
    }
}


const r1 = new readableStreamPerformer("../public/files/srcFile.txt","r")
/*r1.readableStreamPromiseAPI() */
// r1.readWriteStreamPromiseAPI("../public/files/srcFile.txt","r","../public/files/destFile.txt","w")
r1.readWriteStreamMemoryEfficientFastAPI("../public/files/srcFile.txt","r","../public/files/destFile.txt","w")