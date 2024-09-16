const fs = require('fs');
const path = require('path');

// 프로젝트 루트 디렉토리를 찾는 함수
function findRootDir(currentDir) {
  if (fs.existsSync(path.join(currentDir, 'package.json'))) {
    return currentDir;
  }
  const parentDir = path.dirname(currentDir);
  if (parentDir === currentDir) {
    throw new Error('Could not find project root directory');
  }
  return findRootDir(parentDir);
}

const rootDir = findRootDir(__dirname);
const photographsDir = path.join(rootDir, 'public', 'photographs');
const outputFile = path.join(
  rootDir,
  'app',
  'photograph',
  '(data)',
  'projectImages.json'
);

function getImageFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    })
    .map((file) =>
      path.join('/photographs', path.basename(dir), file).replace(/\\/g, '/')
    );
}

function generateProjectImagesJson() {
  const projectImages = {};

  if (!fs.existsSync(photographsDir)) {
    console.error(`Directory not found: ${photographsDir}`);
    return;
  }

  fs.readdirSync(photographsDir).forEach((projectName) => {
    const projectDir = path.join(photographsDir, projectName);
    if (fs.statSync(projectDir).isDirectory()) {
      projectImages[projectName] = getImageFiles(projectDir);
    }
  });

  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(projectImages, null, 2));
  console.log(`Project images JSON has been generated at: ${outputFile}`);
}

generateProjectImagesJson();
