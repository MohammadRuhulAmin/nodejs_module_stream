
import * as fsPromise from "node:fs/promises"

/**
 * Notes:
 * file descriptor is a number which is assigned to open() function while open() is called.
 * Each open file has its own unique file descriptor
 * after completing the operation need to close, otherwise it will be memory lickage.
 * FileHandle object is an event that extends from EventEmitter Event Object.
 */

(async ()=>{
    
    /** commands **/
    const CREATE_FILE = "create a file"
    const DELETE_FILE = "delete a file"
    const RENAME_FILE = "rename the file"
    const ADD_TO_FILE = "add to the file"

    /** APIs */
    const createFile = async(path)=>{
        let existingFileHandle,newFileHandle;
        try{
            existingFileHandle = await fsPromise.open(path,'r')
            console.log(`The file ${path} already exist.`)
        }catch(error){
            newFileHandle = await fsPromise.open(path,"w")
            console.log(`${path} file has been successfully created.`)
        }finally{
            existingFileHandle?.close()
            newFileHandle?.close()
        }
    }
    const deleteFile = async(path)=>{
        let existingFileHandle;
        try{
            existingFileHandle =await fsPromise.open(path,'r')
            await fsPromise.unlink(path)
            console.log('File Deleted Successfully')
        }catch(error){
            console.log(`${path}, file does not exist.`)
        }finally{
            existingFileHandle?.close()
        }
    }
    const renameFile = async (oldPath,newPath)=>{
        console.log("called")
        let renameFileHandler;
        try{
            renameFileHandler = await fsPromise.rename(oldPath,newPath)
            console.log(`${oldPath} renamed to ${newPath} successfully!`)
        }catch(error){
            console.log(`No file found in ${oldPath} this name.`)
        }finally{
           await renameFileHandler?.close()
        }
    }

    const addToFile = async(path,content)=>{
        let contentAdded;
        if(contentAdded === content)return;
        let appendFileHandle;
        try{
            appendFileHandle = await fsPromise.appendFile(path,content)
            contentAdded = content
            console.log(`Appended successfully!`)
        }catch(error){
            console.error(error.message)
        }finally{
           await appendFileHandle?.close()
        }
    }

    
    const commandFilehandler = await fsPromise.open("./files/command.txt",'r') 
    commandFilehandler.on('change',async()=>{
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
        const position = 0 /** position of the string index in the file */
        /** how many bytes we ant to read */
        const length = buffer.byteLength
        await commandFilehandler.read(buffer,offset,length,position)
        console.log(buffer.toString('utf-8'))
        const command = buffer.toString()
        if(command.includes(CREATE_FILE)){
            const filePath = command.substring(CREATE_FILE.length + 1)
            createFile(filePath)
        }
        if(command.includes(DELETE_FILE)){
            const filePath = command.substring(DELETE_FILE.length + 1)
            deleteFile(filePath) 
        }
        if(command.includes(RENAME_FILE)){
            const _idx = command.indexOf(" to ")
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx)
            const newFilePath = command.substring(_idx + 4)
            renameFile(oldFilePath,newFilePath)
        }
        if(command.includes(ADD_TO_FILE)){
            const _idx = command.indexOf(" this content: ")
            const filePath = command.substring(ADD_TO_FILE.length + 1, _idx)
            const content = command.substring(_idx + 15)
            addToFile(filePath,content)
        }
        else{
            console.log('No API found for this Command')
        }
    })
    /** This will just assign a file discriptor in memory 
    sothat we can read/ write in later. */
    // const watcher = fsPromise.watch("./files") /** it will watch the whole directory */
    const watcher = fsPromise.watch("./files/command.txt")
    
    /** Here watcher is an async iterator */
    for await (const event of watcher){
        if(event.eventType === "change" && event.filename === "command.txt"){
            commandFilehandler.emit("change")
        }
    }
})()