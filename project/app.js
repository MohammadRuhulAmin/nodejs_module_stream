import * as fsPromise from "node:fs/promises"

(async ()=>{
    // const watcher = fsPromise.watch("./files") /** it will watch the whole directory */
    const watcher = fsPromise.watch("./files/command.txt")
    /** Here watcher is an async iterator */
    for await (const event of watcher){
        if(event.eventType === "change" && event.filename === "command.txt"){
            console.log('file changed!')
        }
        console.log(event)
    }
})()