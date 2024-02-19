const fs = require("fs")

const content = fs.readFileSync("./file.txt")

console.log(content);

console.log(content.toString("utf-8"));