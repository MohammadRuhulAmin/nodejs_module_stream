import {log} from "node:console"
import * as fsPromise from "node:fs/promises"
class CustomFetchFromFile{
    constructor(filePath,operationMode,operation){
        this.filePath = filePath
        this.operationMode = operationMode
        this.operation = operation
    }

    async readFile(){
        let readFileHandle;
        try{
            readFileHandle = await fsPromise.open(this.filePath,this.operationMode)
            const fileSize = (await readFileHandle.stat()).size
            if(fileSize === 0 )throw new Error('File has no data')
            else{
                const buffer = Buffer.alloc(fileSize)
                return await readFileHandle.read({buffer})
            }
        }catch(error){
            throw error.message
        }finally{
           await readFileHandle?.close()
        }
    }
}

const f1 = new CustomFetchFromFile("../public/files/input.txt",'r',"read")
f1.readFile().then((data)=>{
    console.log(data.buffer)
})
.catch((error)=>{console.log(error)})
.finally(()=>{
    console.log('operation closed')
})