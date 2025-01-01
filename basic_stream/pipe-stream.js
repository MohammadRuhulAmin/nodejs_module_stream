import { log } from "node:console";
import * as fsPromise from "node:fs/promises";
import { PassThrough } from "node:stream";

(async () => {
    try {
        const srcFile = await fsPromise.open('../public/videos/pool.mp4', 'r');
        const destFile = await fsPromise.open('../public/videos/dp-cp.mp4', 'w');
        const destFile2 = await fsPromise.open('../public/videos/dp-cp2.mp4', 'w');

        const readStream = srcFile.createReadStream({ highWaterMark: 64 * 1024 });
        const writeStream = destFile.createWriteStream();
        const writeStream2 = destFile2.createWriteStream();
        
        const passThrough = new PassThrough(); // Create a PassThrough stream to duplicate the stream data

        // Pipe the readable stream through the PassThrough and to both writable streams
        readStream.pipe(passThrough);
        passThrough.pipe(writeStream);
        passThrough.pipe(writeStream2);


        writeStream.on('finish', () => log('First copy done!'));
        writeStream2.on('finish', () => log('Second copy done!'));

        readStream.on('end', () => {
            srcFile.close();
            destFile.close();
            destFile2.close();
            log('Operation completed successfully!');
        });
    } catch (err) {
        log('Error occurred:', err.message);
    }
})();
