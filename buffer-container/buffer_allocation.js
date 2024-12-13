import {Buffer} from "node:buffer"

const buffer = Buffer.alloc(1000, 0)


/** security risk may occure*/
const bufferUnsafe = Buffer.allocUnsafe(10000)

for(let i = 0;i<bufferUnsafe.length;i++){
    if(bufferUnsafe[i] !== 0)console.log(bufferUnsafe[i].toString(8))
}

/*
Buffer.from() and Buffer.concat() are from allocUnsafe()

*/