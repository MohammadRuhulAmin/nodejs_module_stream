import * as fs from "node:fs"
const content = fs.readFileSync('../public/files/text.txt')
console.log(content.toString())