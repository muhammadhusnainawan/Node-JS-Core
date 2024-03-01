const { Writable } = require("streams");
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
        if (err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunkSize = 0;
        ++this.writesCount;
        callback();
      });
    } else {
        // when we are done we should call the callback
      callback();
    }
  }
}
