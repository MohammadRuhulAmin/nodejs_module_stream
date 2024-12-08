import * as fsPromise from "node:fs/promises"
class runTimeWritableModifier{
    async runTimeModifyReadStreamAndWriteOnFile(sourceFilePath,sourceOperation,destinationFilePath,destOperation){
        let fileHandleRead,fileHandleWrite;
        try{
            console.time('runTimeModifyReadStreamAndWriteOnFile')
            fileHandleRead = await fsPromise.open(sourceFilePath,sourceOperation)
            fileHandleWrite = await fsPromise.open(destinationFilePath,destOperation)
            const streamRead =  fileHandleRead.createReadStream()
            const streamWrite =  fileHandleWrite.createWriteStream()
            
            streamRead.on('error',(err)=>{console.error(err.message)})
            streamRead.on('close',()=>{console.log('ReadStream has been closed...')})
            streamRead.on('data',(chunk)=>{
                console.log(chunk.toString('utf-8'))
                if(!streamWrite.write(chunk))streamRead.pause()
            })
            streamWrite.on('drain',()=>streamRead.resume())
            streamWrite.on('finish',()=>{
                console.log('writable stream has been finished')
            })

            streamWrite.on('error', (err) => {console.error(`Write stream error: ${err.message}`);});
            streamWrite.on('close', () => {console.log('Write stream closed.');});
        }catch(err){
            console.error(err.message)
        }finally{
            await fileHandleRead.close()
            await fileHandleWrite.close()
        }
    }
}

const r1 = new runTimeWritableModifier()
r1.runTimeModifyReadStreamAndWriteOnFile("../public/files/srcFile.txt","r","../public/files/destFile.txt","w")