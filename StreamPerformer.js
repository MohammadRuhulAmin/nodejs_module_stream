import * as fsPromise from "node:fs/promises"
import * as fsCallBack from "node:fs"

class StreamPerformer{
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
    /**process time:2 sec, memory: */
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
                    fsCallBack.writeSync(fileDescriptor, `${i}` )
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
}
const iteration = 1000000;
const s1 = new StreamPerformer("./public/files/writeFile.txt",'w',iteration)
// await s1.writeStreamProcessPromiseAPI()
s1.writeStreamProcessCallbackAPI()