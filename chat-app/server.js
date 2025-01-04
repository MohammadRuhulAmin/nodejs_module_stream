import { log } from "node:console"
import net from "node:net"

const clients = [];


const server = net.createServer() /** It returns net.server */
try{
    /** Actually if there are 100 people connected there will be 100 socket object ! */
    server.on("connection",(socket)=>{
        log("A new Connection added to the server")
        const clientId = clients.length + 1;
        clients.push({id:clientId.toString(), socket})
        socket.write(`id-${clientId}`)
        
        socket.on('data',(data)=>{ /** reading the stream */
            //socket.write(data.toString()) 
            // /** writing the stream at the same time */
            const dataString = data.toString('utf-8')
            log(dataString)
            let id = dataString.substring(0,dataString.indexOf("-"))
            log(id)
            const message = dataString.substring(dataString.indexOf("-message-")+9)
            clients.map((client)=>{
                client.socket.write(`> user ${id}: ${message}`)

            })
        })
    })
    
    server.listen(3008, "127.0.0.1",()=>{
        log("opened server on : ",server.address())
    })
}
catch(error){
    log(error.message)
}