import * as fs from "node:fs"
import {Buffer} from "node:buffer"
class SyncStream{
    constructor(filepath,operation){
        this.filepath = filepath;
        this.operation = operation;
    }
    /**
     * fd = file descriptor
     */
    fileStreamWrite(){
        fs.open(this.filepath,this.operation,(err,fd)=>{
            if(err)console.error(err)
            try{
                for(const i of Array.from({length:100}).keys()){
                    const buffer = Buffer.from(`${i}`,'utf-8')
                    fs.writeSync(fd,buffer)
                }
            }catch(err){
                console.error(err.message)
            }finally{
                fs.close(fd,(closeErr)=>{
                    if(closeErr)console.error('Error Closing File')
                })
            }
        })
    }
}

const s1 = new SyncStream("../public/files/source.txt",'w')
console.time('streamStart')
s1.fileStreamWrite()
console.timeEnd('streamStart')