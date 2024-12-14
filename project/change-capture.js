import * as fsPromise from "node:fs/promises"
import {Buffer} from "node:buffer"

let data = {
    content:"" 
}
async function changeCapture(){
    const fileHandler = await fsPromise.open("./files/command.txt",'r')
    fileHandler.on("change", async()=>{
        const fileSize = (await fileHandler.stat()).size
        const buffer = Buffer.alloc(fileSize)
        const offset = 0
        const position = 0
        const length = buffer.byteLength /** how much buffer i want to use */
        await fileHandler.read(buffer,offset,length,position)
        console.log(buffer)
        console.log(buffer.byteLength)
        
    })
    const watcher = fsPromise.watch("./files")
    for await(const event of watcher){
        if(event.eventType === "change" && event.filename === "command.txt"){
            fileHandler.emit("change")
        }
    }
}
/** */
changeCapture()