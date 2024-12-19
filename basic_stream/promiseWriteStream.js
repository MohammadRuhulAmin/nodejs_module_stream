import * as fs from "node:fs/promises"


class writeStream{
    constructor(filepath,operation){
        this.filepath = filepath;
        this.operation = operation;
    }
    async promiseWriteStream(){
        const fileHandle = await fs.open(this.filepath,this.operation)
        for(const i of Array.from({length:1000}).keys()){
            fileHandle.write(` ${i} `)
        }
    }
}

const c1 = new writeStream('../public/files/source-p.pdf','w')
console.time('startTime')
c1.promiseWriteStream()
console.timeEnd('startTime')