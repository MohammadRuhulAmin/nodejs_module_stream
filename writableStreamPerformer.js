import * as fsPromise from "node:fs/promises"
import * as fsCallBack from "node:fs"

class writableStreamPerformer{
    constructor(filePath,operation,iteration){
        this.filePath = filePath
        this.operation = operation 
        this.iteration = iteration
    }
    /** process time:6sec, memory: 60%*/
    async writeStreamProcessPromiseAPI(){
        const fileHandle = await fsPromise.open(this.filePath,this.operation,this.iteration)
        try{
            console.time('WriteStreamPromiseAPI')
            for(let i = 0;i< this.iteration;i++){
                fileHandle.write(`${i}`)
            }
            console.timeEnd('WriteStreamPromiseAPI')
        }catch(error){console.error(error.message)}
        finally{
            await fsPromise.unlink(this.filePath)
            await fileHandle.close()
            console.log(`${this.filePath} has been removed and fileHandle has been closed!`)
        }
    }

    /**process time:2 sec, memory: 20% */
    async writeStreamProcessCallbackAPI(){
        /** fd stands for file descriptor, each file open has a unique file descriptor, data type Number */
        fsCallBack.open(this.filePath,this.operation,(error,fileDescriptor)=>{
            if(error){
                console.error(error.message)
                return
            }
            console.time('writeStreamCallbackAPI')
            for(let i =0;i<this.iteration;i++){
                try{
                    const buffer = Buffer.from(`${i}`,'utf-8')
                    fsCallBack.writeSync(fileDescriptor, buffer )
                    /**Very Bad performance in term of memory usage */
                    /* fsCallBack.write(fileDescriptor,`${i}`,()=>{}) */ 
                }catch(writeError){
                    console.error(writeError.message)
                }
            }
            console.timeEnd('writeStreamCallbackAPI')
            if(fileDescriptor){
                fsCallBack.unlink(this.filePath,()=>{
                console.log(`${this.filePath} has been removed...`)
                fsCallBack.close(fileDescriptor,(closeError)=>{
                    if(closeError)console.error(closeError.message)
                    else console.log(`${this.filePath} has been closed successfully`)
                    })
                })
            }
        })
    }

    /**process execution time: 263.785 MS memory usage: 200 mb*/
    /** This code is not a good practise, do not use it for production */
    async writeStreamProcessStreamPromiseAPI(){
        let fileHandle;
        try{
            fileHandle = await fsPromise.open(this.filePath,this.operation)
            const stream = fileHandle.createWriteStream()
            console.time('writeStreamProcessStreamPromiseAPI')
            for(let i = 0;i<this.iteration;i++){
                const buffer = Buffer.from(`${i}`,'utf-8')
                stream.write(buffer)
            }
            console.timeEnd('writeStreamProcessStreamPromiseAPI')
        }catch(error){console.log(error.message)}
        finally{
            fileHandle.close().finally(()=>{console.log('file has been closed...')})   
        }
    }
    /** process time: 20 ms, memory usage: 19MB  */
    async writeStreamProcessStreamMemoryEficientPromiseAPI(){
        let fileHandle;
        try{
            fileHandle = await fsPromise.open(this.filePath,this.operation)
            const stream = fileHandle.createWriteStream();
            console.time('writeStreamProcessStreamMemoryEficientPromiseAPI')
            /** The writableHighWaterMark property of a writable stream in Node.js represents the maximum number of bytes that 
            can be written to the internal buffer before the stream starts applying backpressure. */
            /* console.log(stream.writableHighWaterMark) */
            /** The amount of bytes inside a buffer before insert is 0 */
            console.log(`The amount of bytes of a buffer: ${stream.writableLength}`) 
            /**
             * 8bits = 1 byte
             * 1000 bytes = 1 Kilobyte
             * 1000 Kilobytes = 1 megabyte
             */
            const buffSize = stream.writableHighWaterMark
            // console.log(`Is write possible: ${stream.write(buffer)}`)/** return type True | False */
            /** Return False: The stream's internal buffer has accumulated more data than the writableHighWaterMark, 
             * at This point the stream signals backpressure, indicating that you should pause writing until the buffer
             * is drained...
             * 
             * The internal buffer is used to temporarily store chunks of data written to the stream.
             * If the producer (e.g., your program writing data) writes data faster 
             * than the consumer (e.g., the file system or network) 
             * can process it, the buffer fills up, and stream.write() starts returning false.
             */

            /** To implement stream.writableLength < stream.writableHighWaterMark we will use drain event */
            /** Always use it for memory efficient and fast performance  */
            let i = 0;
            const producer = ()=>{
                while(i<this.iteration){
                    const buffer = Buffer.from(`${i}`,'utf-8')
                    /**console.log(buffer.toString()) */
                    if(this.iteration - 1 === i){
                        return stream.end(buffer)
                    }
                    
                    stream.write(buffer)
                    /*console.log(`is empty?: ${stream.write(buffer)}`)*/
                    if(stream.write(buffer) === false) break;
                    i++;
                }
            }
            producer()
            stream.on('drain',()=>{
                /**console.log('drain event emitted') */
                producer()
                
            })
            stream.on('finish',()=>{
                console.timeEnd('writeStreamProcessStreamMemoryEficientPromiseAPI')
                fileHandle?.close().then(()=>{console.log('file closed...')})
            })
            
            /** The amount of bytes inside a buffer after insert is 12 */
            console.log(stream.writableLength)
        }catch(error){console.error(error.message)}
        
    }


}
const iteration = 1000000;
const s1 = new writableStreamPerformer("./public/files/writeFile.txt",'w',iteration)
// await s1.writeStreamProcessPromiseAPI()
// s1.writeStreamProcessCallbackAPI()
// s1.writeStreamProcessStreamPromiseAPI()
await s1.writeStreamProcessStreamMemoryEficientPromiseAPI()