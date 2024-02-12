// 0100 1000 0110 1001 0010 0001

const {Buffer} = require("buffer")

const memoryContainer = Buffer.alloc(3)   // 3 bytes or 24 bits

memoryContainer[0] = 0X48
memoryContainer[1] = 0X69
memoryContainer[2] = 0X21

console.log(memoryContainer.toString("utf8"));