const fs = require("fs");
const fsPromises = fs.promises;



(async () => {
  const fileHandle = await fsPromises.open("test.txt", "w");
  console.time("writeMany");
 
  for (let i = 0; i < 100000; i++) {
    await fileHandle.write(`${i}`);
  }
  console.timeEnd("writeMany");
})();
