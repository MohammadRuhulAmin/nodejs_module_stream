import {Writable} from "node:stream";
import fs from "node:fs";
import { log } from "node:console";

class FileWriteStream extends Writable{
    constructor({highWaterMark,fileName}){
        super({highWaterMark});
        this.fileName = fileName;
        this.fd = null;
        this.chunks = [];
        this.chunksSize = 0;
        this.writesCount = 0;
    }
    /** This will run after the constructor and 
     * it will put off all calling the other methods until we call the callback function */
    _construct(callback){
        fs.open(this.fileName,'w',(err,fd)=>{
            if(err){
                callback(err)
            }else{
                this.fd = fd;
            /** No Arguments means it was successful */
                callback();
            }
            
        })
    }
    _write(chunk,encoding,callback){
        log(this.fd)
        this.chunks.push(chunk)
        this.chunksSize += chunk.length;
        if(this.chunksSize > this.writableHighWaterMark){
            fs.write(this.fd, Buffer.concat(this.chunks),(err)=>{
                if(err){
                    return callback(err);
                }
                this.chunk = []
                this.chunksSize = 0;
                ++this.writesCount;
                callback()
            })
        }
        else callback()
    }
    _final(callback){
        fs.write(this.fd,Buffer.concat(this.chunks),(err)=>{
            if(err)return callback(err);
        })
        this.chunks = [];
        callback();
    }
    /** destroy method will be called after final method called! */
    _destroy(error,callback){
        log('Number of writes: ',this.writesCount)
        if(this.fd){
            fs.close(this.fd,(err)=>{
                callback(err | error)
            })
        }else{
            callback(error)
        }
    }

}

const stream = new FileWriteStream({
    highWaterMark:1800,
    fileName:"../public/customfile.txt"
})
stream.write(Buffer.from("This is a string."))
stream.end(Buffer.from("The file Ended!"))
stream.on('finish',()=>{log('finished!')})


/**
 * Do not use this.emit inside the class
 * Do not use throw new Error inside the class
 * 
 * if you want to handle error, pass the error to the callback function!
 * 
 */