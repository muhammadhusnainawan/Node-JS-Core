// import promises module from fs module
// create a IIFI function
// open both files i.e read and write
// create read and write streams
//
const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("test.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const readableStreams = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const writableStreams = fileHandleWrite.createWriteStream();
  //let split = "";
  readableStreams.on("data", (chunk) => {
    // const numbers = chunk.toString().split("  ")

    if (!writableStreams.write(chunk)) {
      readableStreams.pause();
    }

    //    console.log(numbers);
  });
  writableStreams.on("drain", () => {
    readableStreams.resume();
  });
})();
