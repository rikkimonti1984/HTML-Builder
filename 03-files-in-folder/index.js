/**
 * https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fs_fspromises_readdir_path_options
 */
const fs = require("fs");
const path = require("path");

const folder = "D:/IT/RS School/HTML-Builder/03-files-in-folder/secret-folder";

fs.readdir(folder, (_, files) => {
  files.forEach(file => {
    const filePath = path.join(folder, file);
    
    fs.stat(filePath, (_, stats) => {
      if (stats.isFile()) {
        const fileSizeInKB = Math.ceil(stats.size / 1024);
        const fileNameWithoutExtension = path.basename(file, path.extname(file));
        const fileExtension = path.extname(file).slice(1);
        
        console.log(`${fileNameWithoutExtension} - ${fileExtension} - ${fileSizeInKB}kb`);
      }
    });
  });
});
