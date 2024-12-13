import {Buffer} from "node:buffer"

console.log(Buffer.poolSize)
Buffer.poolSize = Buffer.poolSize >>> 1
console.log(Buffer.poolSize >>> 1)