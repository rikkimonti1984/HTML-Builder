const fs = require("fs");
const path = require("path");

const folder = "./05-merge-styles/styles";
const destination = "./05-merge-styles/project-dist";
const outputFile = path.join(destination, "bundle.css");

fs.readdir(folder, (_, files) => {
  let cssFiles = files.filter(file => path.extname(file) === '.css');

  fs.mkdir(destination, { recursive: true }, (_) => {
    cssFiles.forEach((file, index) => {
      let filePath = path.join(folder, file);
      fs.readFile(filePath, 'utf8', (_, data) => {
        fs.appendFile(outputFile, data + '\n', (_) => {});
      });
    });
  });
});
