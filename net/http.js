import { log } from "node:console"
import http from "node:http"

const hostIp = "192.168.0.109"
const port = 4040


const server = http.createServer((req,res)=>{
    const data = {"message":"hi there!"}
    res.setHeader("Content-Type","application/json")
    res.setHeader("connection","close")
    res.end(JSON.stringify(data))
})

server.listen(port,hostIp,()=>{
    log(`Server is listening at http://${hostIp}:${port}`)
})

/**
 * port 80 is the default port for http
 * 0-1023 ports are for system 
 * 1024-41000+ for users
 * https://www.udemy.com/course/rabbitmq-in-practice/?couponCode=NEWYEARCAREER
 * 
 * 
 */