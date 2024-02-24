//const fs = require("fs");
//const fsPromises = fs.promises;

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

/* (async () => {
  console.time("writeMany");
  const fileHandle = await fsPromises.open("test.txt", "w");
 const stream = fileHandle.createWriteStream(); 
 //const buffer = Buffer.alloc(100000000, 10)
 //console.log(buffer);

 //setInterval(()=>{},1000)
//  stream.write(buffer)
//  stream.write(buffer)
//  stream.write(buffer)
//  stream.write(buffer)

 //console.log(buffer);
 //console.log(stream.writableLength);
  for (let i = 0; i < 1000000; i++) {
    const buffer = Buffer.from(`${i}`, "utf8")
    stream.write(buffer)
  }
  console.timeEnd("writeMany");
})(); */

/* (async () => {
  console.time("writeMany");
  const fileHandle = await fsPromises.open("test.txt", "w");
  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);

  let i = 0;

  const numberOfWrites = 1000000;

  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(`${i}`, "utf-8");
      // this is our last write

      if (i === numberOfWrites - 1) {
        return stream.end();
      }
      // if stream.writes returns false, stop the loop
      i++;
      if (!stream.write(buff)) {
        break;
      }
    }
  };

  writeMany();

  // resume our loop once our stream's internal buffer is emptied

  stream.on("drain", () => {
    console.log("Drained");
    writeMany();
  });

  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandle.close();
  });
})(); */

const fs = require("node:fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  console.log(stream.writableHighWaterMark);

  // 8 bits = 1 byte
  // 1000 bytes = 1 kilobyte
  // 1000 kilobytes = 1 megabyte

  // 1a => 0001 1010

  // const buff = Buffer.alloc(16383, "a");
  // console.log(stream.write(buff));
  // console.log(stream.write(Buffer.alloc(1, "a")));
  // console.log(stream.write(Buffer.alloc(1, "a")));
  // console.log(stream.write(Buffer.alloc(1, "a")));

  // console.log(stream.writableLength);

  // stream.on("drain", () => {
  //   console.log(stream.write(Buffer.alloc(16384, "a")));
  //   console.log(stream.writableLength);

  //   console.log("We are now safe to write more!");
  // });
  let i = 0;
  const numberOfWrites = 1000000;
  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      i++;
      // if stream.write returns false, stop the loop
      if (!stream.write(buff)) break;
      //console.log("drain event emmits here");
    }
  };
  writeMany();
  // resume our loop once our stream's internal buffer is emptied
  stream.on("drain", () => {
     //console.log("Drained!!!");
    writeMany();
  });
  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandle.close();
  });
})();
