const fs = require("fs");
const fsPromises = fs.promises;

// execution time: 4  seconds
// CPU Usage:  35% (One core)
// Memory usage: 16 Mb

/*  (async () => {
  console.time("writeMany");
  const fileHandle = await fsPromises.open("test.txt", "w");
 
  for (let i = 0; i < 100000; i++) {
    await fileHandle.write(`${i}`);
  }
  console.timeEnd("writeMany");
})(); */

// execution time: 0.861 milli seconds
// CPU Usage:  92% (One core)
// Memory usage: 24 Mb

/*(async () => {
  console.time("writeMany");
  fs.open("test1.txt", "w", (err, fd) => {
    for (let i = 0; i < 1000000; i++) {
      const buffer = Buffer.from(`${i}`, "utf-8");

      fs.writeSync(fd, buffer);
    }
  });
  console.timeEnd("writeMany");
})(); */

// execution time: 627 milli seconds
// CPU Usage:  100% (One core)
// Memory usage: 227Mbs

  (async () => {
  console.time("writeMany");
  const fileHandle = await fsPromises.open("test.txt", "w");
 const stream = fileHandle.createWriteStream(); 
 console.log(stream.writableHighWaterMark);
 console.log(stream.writableLength);
 const buffer = Buffer.alloc(100000000, 10)
 console.log(buffer);

 setInterval(()=>{},1000)
//  stream.write(buffer)
//  stream.write(buffer)
//  stream.write(buffer)
//  stream.write(buffer)

 //console.log(buffer);
 //console.log(stream.writableLength);
  // for (let i = 0; i < 1000000; i++) {
  //   const buffer = Buffer.from(`${i}`, "utf8")
  //   stream.write(buffer)
  // }
  console.timeEnd("writeMany");
})(); 
