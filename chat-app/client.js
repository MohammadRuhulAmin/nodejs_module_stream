import net from "node:net"
import { log } from "node:console"
import readline from "node:readline/promises"
/** when there are two networking end point to communicate that time it is called socket 
 * 
 * Point A     <------>     Point B
 * 
 * Stream --> Net (TCP/UDP) --> HTTP
 * NeT --> TCP
 * DGram --> UDP 
*/

const clearLine = (dir) =>{
    return new Promise((resolve,reject)=>{
        process.stdout.clearLine(dir,()=>{
            resolve();
        })
    })
}

const moveCursor = (dx,dy) =>{
    return new Promise((resolve,reject)=>{
        process.stdout.moveCursor(dx,dy,()=>{
            resolve();
        })
    })
}

const options = {host:"127.0.0.1",port:3008}
const rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/** it returns socket object */
/** And the socket object is a duplex stream, so after completing the stream the close and end event will 
 * be emitted. 
 * as it is a duplex stream, that is why you can both write and read from it!
 */

let id;
const socket =  net.createConnection(options, async ()=>{
    log('Connected to the Server!')
    
    const ask = async()=>{
        const message = await  rl.question("Message >")
        await moveCursor(0,-1);
        await clearLine(0);
        socket.write(`${id}-message-${message}`);
    }
    ask()
    socket.on('data',async (data)=>{
        log()
        /** move the cursor one line up */
        await moveCursor(0,-1)
        /** clear the line that cursor just moved into */
        await clearLine(0)
        if(data.toString("utf-8").substring(0,2) === "id"){
            id = data.toString("utf-8").substring(3)
            log(`Client Id:${id}`)
        }else{
            /**Log an empty line */
            
            log(data.toString())
        }
        ask()
    })
    
}) 



socket.on('close',()=>{
    log('closed!')
})

socket.on('end',()=>{
    log('ended!')
})
