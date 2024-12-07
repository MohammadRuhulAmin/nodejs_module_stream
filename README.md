# Stream In Node.js

### Stream in Node.js: 
A stream is an abstract interface for working with streaming data in Node.js. The `node:stream` module provides
an API for implementing the stream interface.

### Types of Streams: 
1. `Writable`: streams to which data can be written, Example: fs.createWriteStream()
2. `Readable`: Streams from which data can be read, Example: fs.createReadStream()
3. `Duplex`: Streams that are both `Readable` and `Writable`, Example: net.Socket class
4. `Transform`: Duplex streams that can be modify or transform the data as it is wriiten and read, Example: zlib.createDeflate()


### Prerequsites: Buffer
`Buffer is a location in memory that holds specific amount of data.`
![Buffer is a location in memory that holds specific amount of data.](./public/images/bufferExample.png)
