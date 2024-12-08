import { createServer } from 'http'
const PORT = 3000
const server = createServer((req,res)=>{

}).listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})