const { Writable } = require("node:stream");
const fs = require("node:fs");

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunkSize = 0;
    this.writesCount = 0;
  }

  // this will run after the constructor and it will put off all other methods
  // untill we call the callback function

  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        // if there is an error we will call a callback with an argument it means we have an error
        // and we should not proceed further
        callback(err);
      } else {
        this.fd = fd;
        // no arguments means it was successfull
        callback();
      }
    });
  }
  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunkSize += chunk.length;
    if (this.chunkSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) return callback(err);
        this.chunks = [];
        this.chunkSize = 0;
        ++this.writesCount;
      });
    } else {
      // when we are done we should call the callback
      callback();
    }
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      ++this.writesCount;
      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    console.log("Number of writes :", this.writesCount);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      });
    } else {
      callback(error);
    }
  }
}

(async () => {
  console.time("writeMany");

  const stream = new FileWriteStream({ fileName: "text.txt" });

  let i = 0;

  const numberOfWrites = 10000000;

  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(`${i}`, "utf-8");

      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // if stream.write returns false, stop the loop

      if (!stream.write(buff)) break;

      i++;
    }
  };

  writeMany();

  let d = 0;
  // resume our loop once our stream's internal buffer is emptied
  stream.on("drain", () => {
    ++d;
    writeMany();
  });

  stream.on("finish", () => {
    console.log("Number of drains:", d);
    console.timeEnd("writeMany");
  });
})();
