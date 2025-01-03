import { log } from 'node:console'
import net from 'node:net'
const PORT = 3000
/** TCP server  */
const server = net.createServer((socket)=>{
    socket.on('data',(data)=>{
        log(data.byteLength)
        log(data)
    })
}).listen(PORT,'127.0.0.1',()=>{
    log(server.address())
    console.log(`Server is running at port ${PORT}`)
})

/**
 * 
 * Net Module is for TCP
 * Dgram Module is for UDP  (it is super fast, it does not think for data packet loss / not concern for data packet loss
 * wheather the receiver has received the data or not )
 *
 * localhost is the DNS of 127.0.0.1 (loop back IP address)
 */

