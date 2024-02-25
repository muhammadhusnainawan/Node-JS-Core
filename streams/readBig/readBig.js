// import promises module from fs module
// create a IIFI function
// open both files i.e read and write
// create read and write streams
//
const fs = require("node:fs/promises");

(async () => {
  console.time("readBig");
  const fileHandleRead = await fs.open("test.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const readStream = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const writeStream = fileHandleWrite.createWriteStream();
  let split = "";
  readStream.on("data", (chunk) => {
   const numbers = chunk.toString().split("  ");
   // console.log(numbers);
    if (numbers[0] !== numbers[1] + 1) {
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }
    if (numbers[numbers.length - 2] + 1 !== numbers[numbers.length - 1]) {
      split = numbers.pop();
    }
    console.log(numbers);
    numbers.forEach((number) => {
      let n = Number(number);
      if (n % 2 === 0) {
        if (!writeStream.write(" " + n + " ")) {
          readStream.pause();
        }
      }
    });
  });
  writeStream.on("drain", () => {
    readStream.resume();
  });

  readStream.on("end", () => {
    console.log("Done reading");
    console.timeEnd("readBig");
  });
})();
