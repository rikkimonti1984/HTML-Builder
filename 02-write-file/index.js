/**
 * https://nodejs.org/api/stream.html#writable-streams
 * https://nodejs.org/api/process.html#processstdin
 * https://nodejs.org/api/process.html#processstdout
 * https://github.com/rolling-scopes-school/tasks/blob/master/stage1/modules/node-materials/node/stream-writable.md
 * https://github.com/rolling-scopes-school/tasks/blob/master/stage1/modules/node-materials/node/node-stdio.md
 */
const fs = require("fs");
const readline = require('readline');
const path = require("path");
const relativePath = "./02-write-file/text.txt";
const absolutePath = path.resolve(relativePath);
const output  = fs.createWriteStream(absolutePath);
const {stdout } = process;

stdout.write("Message in uppercase: ");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if(input.toLowerCase() === 'exit') {
    stdout.write('Good luck learning Node.js!');
    rl.close();
  } else {
    output.write(input + '\n');
  }
});

rl.on('SIGINT', () => {
    stdout.write('\nGood luck learning Node.js!');
    rl.close();
  });
