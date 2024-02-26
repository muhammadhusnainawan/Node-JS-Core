const fs = require("node:fs/promises");

// execution time 42ms
// file size copied : 7KB

(async () => {
  console.time("copyFile");
  const srcFile = await fs.open("src-text.txt", "r");
  const destFile = await fs.open("dest-text.txt", "w");
  let bytesRead = -1;

  while (bytesRead != 0) {
    const readResult = await srcFile.read();
    console.log(readResult);

    bytesRead = readResult.bytesRead;

    if (bytesRead != readResult.buffer.length) {
      const indexOfNotFilled = readResult.buffer.indexOf(0);
      const newBuffer = Buffer.alloc(indexOfNotFilled);
      readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
      destFile.write(newBuffer);
    } else {
      destFile.write(readResult.buffer);
    }
  }
  console.timeEnd("copyFile");
})();
