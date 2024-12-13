import * as fs from "node:fs/promises"
import * as fsSyncCallback from "node:fs"
import * as fsSync from "node:fs"

const sourcePath = "../public/files/input.txt"
const destinationPath = "../public/files/output.txt"

/** Promises API */
const copyPromise = async ()=>{
    try{
        await fs.copyFile(sourcePath, destinationPath)
        console.log('File has been copied to the specific location!')
    }catch(error){
        console.error(error.message)
    }
}

console.log(copyPromise()) 

/** Callback API */
const copyCallBack = ()=>fsSyncCallback.copyFile(sourcePath,destinationPath,(error)=>{
    if(error)console.log(error.message)
})

console.log(copyCallBack())

/** Synchronous API */
const copySync = ()=>{
    fsSync.copyFileSync(sourcePath,destinationPath)
}
console.log(copySync())