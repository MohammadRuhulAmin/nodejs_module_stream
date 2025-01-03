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
const socket =  net.createConnection(options, async ()=>{
    log('Connected to the Server!')
    const message = await  rl.question("Message >")
    socket.write(message)
}) 

socket.on('data',(data)=>{
    log(data.toString())
})

socket.on('close',()=>{
    log('closed!')
})

socket.on('end',()=>{
    log('ended!')
})
