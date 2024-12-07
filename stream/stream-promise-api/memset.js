import { pipeline } from "node:stream/promises";
import * as fs from "node:fs";
import zlib from "node:zlib";

class TransformStream {
    constructor(sourceFile, destinationFile) {
        this.sourceFile = sourceFile;
        this.destinationFile = destinationFile;
    }

    logMemoryUsage(stage) {
        const memoryUsage = process.memoryUsage();
        console.log(`Memory usage (${stage}):`);
        console.log(`  RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  External: ${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  Array Buffers: ${(memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2)} MB`);
    }

    async run() {
        console.time('run');
        this.logMemoryUsage('start');
        
        await pipeline(
            fs.createReadStream(this.sourceFile, {}),
            zlib.createGzip(),
            fs.createWriteStream(this.destinationFile)
        );

        this.logMemoryUsage('end');
        console.timeEnd('run');
    }
}

const T1 = new TransformStream("../../public/movies/mv.mp4", "../../public/movies/mx.mp4.gz");
T1.run();
