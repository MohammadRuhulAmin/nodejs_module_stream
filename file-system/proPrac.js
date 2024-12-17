import {log} from "node:console"
import * as fsPromises from "node:fs/promises"
import { Buffer } from "node:buffer";

async function readFile(position){
    let fileHandle;
    try{
        fileHandle = await fsPromises.open("../public/files/input.txt","r")
        const fileLength = (await fileHandle.stat()).size
        if(fileLength === 0)throw new Error('File Has no Data!')
        if(position>fileLength)return null;
        else{
            const content = await fileHandle.read({
                offset:0,
                buffer:Buffer.alloc(8),
                position:position,
                length:8
            })
            return content.buffer
        }    
    }catch(error){
        console.error(error.message)
    }finally{
        await fileHandle.close()
    }
}

let message = ''
let iterator = 0;
const fetchByte = 8;
while(true){
    const chunk = await readFile(iterator)
    if(chunk === null)break;
    message += chunk;
    iterator+=fetchByte;
}

log(message)
