import fs from 'fs';
var data = fs.readFileSync('./data.json')
var words=JSON.parse(data)
console.log(words)