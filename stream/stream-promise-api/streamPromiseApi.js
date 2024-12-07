import {pipeline} from "node:stream/promises"
import * as fs from "node:fs"
import zlib from "node:zlib"


class TransformStream{
    constructor(sourceFile,destinationFile){
        this.sourceFile = sourceFile;
        this.destinationFile = destinationFile;
    }
    async run(){
        console.time('run')
        await pipeline(
            fs.createReadStream(this.sourceFile,{}),
            zlib.createGzip(),
            fs.createWriteStream(this.destinationFile)
        )
        console.timeEnd('run')
    }
}

const T1 = new TransformStream("../../public/movies/mv.mp4","../../public/movies/mx.mp4.gz")
T1.run()
