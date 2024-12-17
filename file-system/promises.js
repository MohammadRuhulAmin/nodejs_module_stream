import {log} from "node:console"
import { Buffer } from "node:buffer"
import {open as fileOpenPromise} from "node:fs/promises"

class StreamBuffer{
    static BUFFER_CONSTANTS = Object.freeze({
        bufferOffset:0,
        bufferLength:10,
        bufferAllocationByte:10,
        bufferLength:10
    })
    constructor(filePath,operation,stringPosition){
        this.filePath = filePath
        this.operation = operation
        this.stringPosition = stringPosition
    }
    async FreeUpMemory(){

    }
    async readStreamByChunk(){
        let bufferData = "";
        try{
            while(true){
                let chunk = await this.readChunkData()
                if(chunk.bytesRead === 0)break;
                log(chunk.buffer)
                bufferData += chunk.buffer
                this.stringPosition += StreamBuffer.BUFFER_CONSTANTS.bufferLength
            }
            return bufferData
        }catch(error){
            return error.message;
        }
    }
    async readChunkData(){  
        let readFileHandle,buffer;
        try{
            readFileHandle = await fileOpenPromise(this.filePath,this.operation)
            // let fileSize = (await readFileHandle.stat()).size 
            const chunk = await readFileHandle.read({
                position: this.stringPosition,
                buffer: Buffer.alloc(StreamBuffer.BUFFER_CONSTANTS.bufferAllocationByte),
                offset :StreamBuffer.BUFFER_CONSTANTS.bufferOffset,
                length:StreamBuffer.BUFFER_CONSTANTS.bufferLength
            })
            return chunk 

        }catch(error){
            return error
        }finally{
            await readFileHandle.close()
            buffer = null
        }
    }
}

const chunkBuffer = new StreamBuffer("../public/files/input.txt",'r',0)
let bufferData = await chunkBuffer.readStreamByChunk()
log(bufferData)