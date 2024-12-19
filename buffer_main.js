import {Buffer,constants} from "node:buffer"

/**
 * By allocating the size 4 of the buffer will be 4 byte or 4*8 = 32 bits
 * In each index there are 8 bits to be allocated
 * 
 */
const memoryContainer = Buffer.alloc(4) /** allocate 4 bytes */
console.log(memoryContainer) /** print <Buffer 00 00 00 00> this represents hexadecimal format  */

/** In each index minimum value 0 and maximum 255 in decimal representation can hold */
memoryContainer[0] = 0xF4
memoryContainer[1] = 0xFf
memoryContainer[2] = 0x00
// memoryContainer.writeInt8(-34,2) /** for writing negative integer and the offset is the second parameter */
memoryContainer[3] = 0xff

console.log(memoryContainer[0])
console.log(memoryContainer[1])
console.log(memoryContainer.readInt8(2)) /** To print the negative integer of index 2 in the buffer */
console.log(memoryContainer[3])

console.log(memoryContainer.toString('hex'))

const buff = Buffer.from([0x48,0x69,0x21])
console.log(buff.toString())
