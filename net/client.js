import {createConnection} from "node:net"

/** Using this  createConnection we can establish tcp connection */
const connection = createConnection({host:'127.0.0.1',port:3000},()=>{
    connection.write('connection added')
    
})