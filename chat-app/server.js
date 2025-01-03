import { log } from "node:console"
import net from "node:net"

const clients = [];


const server = net.createServer() /** It returns net.server */
try{
    /** Actually if there are 100 people connected there will be 100 socket object ! */
    server.on("connection",(socket)=>{
        clients.push(socket)
        
        log("A new Connection added to the server")
        socket.on('data',(data)=>{ /** reading the stream */
            //socket.write(data.toString()) /** writing the stream at the same time */
            clients.map((s)=>{s.write(data)})
        })
    })
    
    server.listen(3008, "127.0.0.1",()=>{
        log("opened server on : ",server.address())
    })
}
catch(error){
    log(error.message)
}