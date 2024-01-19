/**
 *                    [  обратите внимание ]
 * https://github.com/rolling-scopes-school/tasks/blob/master/stage1/modules/node-materials/node/stream-readable.md
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 */

const fs = require("fs");
const readableStream = fs.createReadStream("D:/IT/RS School/HTML-Builder/01-read-file/text.txt");
readableStream.on("data", (chunk) => console.log(chunk.toString()));
