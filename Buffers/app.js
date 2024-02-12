const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4); //4 bytes or 32 its

memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x34;
//memoryContainer.writeInt8(-45, 2);
memoryContainer[2] = 0x00;
memoryContainer[3] = 0xff;

console.log(memoryContainer);
//remmeber all the elements in memoryContainer dispalyed HexDecimale i.e in base 16
// also remenber each element contains memory of 8 bits becasue one value in each element is of 4 bits
console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
//console.log(memoryContainer.readInt8(2));
console.log(memoryContainer[2]);
console.log(memoryContainer[3]);
// remember result of each element will be displayed in base 10

//console.log(memoryContainer.toString("hex"));
//console.log(memoryContainer.toString("utf-8"));

//const buff = Buffer.from([0x48, 105, 0x21]);
//console.log(buff.toString("utf-8"));
//const buff = Buffer.from("486921","hex");
//console.log(buff.toString("utf-8"));

const buff = Buffer.from("Hi!", "utf-8")

console.log(buff.toString());