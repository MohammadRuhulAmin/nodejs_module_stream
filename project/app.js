import * as fsPromise from "node:fs/promises"

/**
 * Notes:
 * file descriptor is a number which is assigned to open() function while open() is called.
 * Each open file has its own unique file descriptor
 * after completing the operation need to close, otherwise it will be memory lickage.
 * FileHandle object is an event that extends from EventEmitter Event Object.
 */

(async ()=>{
    const commandFilehandler = await fsPromise.open("./files/command.txt",'r') 
    commandFilehandler.on('change',async()=>{
        
        console.log('file changed!')
        /*
        const content = await commandFilehandler.read() // here the default buffer with a big allocation 
        will hold data.
        */
       /** get the size of our file */
        const size = (await commandFilehandler.stat()).size
        /** allocate our buffer with the size of the file */
        const buffer = Buffer.alloc(size)
        /** the location at which we want to start filling our buffer */
        const offset = 0
        const position =0 /** position of the string index in the file */
        /** how many bytes we ant to read */
        const length = buffer.byteLength
        await commandFilehandler.read(buffer,offset,length,position)


        
    })
    /** This will just assign a file discriptor in memory 
    sothat we can read/ write in later. */
    // const watcher = fsPromise.watch("./files") /** it will watch the whole directory */
    const watcher = fsPromise.watch("./files/command.txt")
    
    /** Here watcher is an async iterator */
    for await (const event of watcher){
        if(event.eventType === "change" && event.filename === "command.txt"){
            console.log(event)
            commandFilehandler.emit("change")
        }
    }
})()