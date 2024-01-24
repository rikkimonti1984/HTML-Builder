const fs = require("fs");
const path = require("path");

const folder = "./04-copy-directory/files";
const destination = "./04-copy-directory/files-copy";

function copyDir(src, dest) {
  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) return;

    fs.readdir(src, (err, files) => {
      if (err) return;

      files.forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);

        fs.stat(srcPath, (err, stats) => {
          if (err) return;

          if (stats.isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            fs.copyFile(srcPath, destPath, (err) => {
              if (err) return;
            });
          }
        });
      });
    });
  });
}

copyDir(folder, destination);
