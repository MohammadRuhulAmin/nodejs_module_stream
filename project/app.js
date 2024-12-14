import * as fsPromise from "node:fs/promises"

(async ()=>{
    const watcher = fsPromise.watch("./") /** it will watch the whole directory */
    /** Here watcher is an async iterator */
    for await (const event of watcher){
        console.log(event)
    }
})()