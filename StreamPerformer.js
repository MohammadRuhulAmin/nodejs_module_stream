import * as fs from "node:fs/promises"

class StreamPerformer{
    constructor(filePath,operation,iteration){
        this.filePath = filePath
        this.operation = operation 
        this.iteration = iteration
    }

    /** process time:6sec, memory: 60%*/
    async writeStreamProcessP1(){
        const fileHandle = await fs.open(this.filePath,this.operation,this.iteration)
        try{
            console.time('p1')
            for(let i = 0;i< this.iteration;i++){
                fileHandle.write(`${i}`)
            }
            console.timeEnd('p1')
        }catch(error){console.error(error.message)}
        finally{
            await fs.unlink(this.filePath)
            await fileHandle.close()
            console.log(`${this.filePath} has been removed and fileHandle has been closed!`)
        }
        
        
        

    }
}
const iteration = 1000000;
const s1 = new StreamPerformer("./public/files/writeFile.txt",'w',iteration)
s1.writeStreamProcessP1()