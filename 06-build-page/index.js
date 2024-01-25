const fs = require("fs");
const path = require("path");

const folder = "./06-build-page/styles";
const destination = "./06-build-page/project-dist";
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

//для html
const templatePath = './06-build-page/template.html';
const componentsPath = './06-build-page/components';
const assetsPath = './06-build-page/assets';
fs.readFile(templatePath, 'utf8', (_, template) => {
  template = template.replace('</head>', '<link rel="stylesheet" type="text/css" href="bundle.css">\n</head>');
  fs.readdir(componentsPath, (_, components) => {
    for (let component of components) {
      let tag = path.basename(component, '.html');
      let componentPath = path.join(componentsPath, component);

      fs.readFile(componentPath, 'utf8', (_, componentContent) => {
        template = template.replace(new RegExp(`{{${tag}}}`, 'g'), componentContent);
        fs.writeFile(path.join(destination, 'index.html'), template, (_) => {});
      });
    }
  });
});

//для assets
const assetsDestination = path.join(destination, 'assets');
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
            fs.copyFile(srcPath, destPath, (_) => {});
          }
        });
      });
    });
  });
}
copyDir(assetsPath, assetsDestination);
