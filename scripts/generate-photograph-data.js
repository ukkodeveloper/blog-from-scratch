const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/photographs');
const outputPath = path.join(
  __dirname,
  '../app/photograph/(data)/projectImages.json'
);

// Entry point
function main() {
  const data = generateData(imagesDir);
  writeDataToFile(data, outputPath);
}

main();

function generateData(photographsDir) {
  const result = {};
  const projectFolders = fs.readdirSync(photographsDir);

  projectFolders.forEach((projectName) => {
    const projectDir = path.join(photographsDir, projectName);
    if (fs.statSync(projectDir).isDirectory()) {
      result[projectName] = getImageFiles(projectDir);
    }
  });

  return result;
}

function getImageFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file).toLowerCase() === '.webp')
    .map((file) =>
      path.join('/photographs', path.basename(dir), file).replace(/\\/g, '/')
    );
}

function writeDataToFile(projectImages, outputFile) {
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(projectImages, null, 2));
  console.log(`Project images JSON has been generated at: ${outputFile}`);
}
