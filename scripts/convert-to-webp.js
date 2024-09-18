const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

const CONVERTIBLE_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const publicDir = path.join(__dirname, '../public/photographs');

async function main() {
  try {
    const folders = await fs.readdir(publicDir);

    for (const folder of folders) {
      const folderPath = path.join(publicDir, folder);
      const stat = await fs.stat(folderPath);

      if (stat.isDirectory()) {
        await processConvertingIn(folder);
      }
    }

    console.log('\nAll folders have been processed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();

async function processConvertingIn(folder) {
  const folderPath = path.join(publicDir, folder);

  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      if (file.startsWith('.')) {
        continue;
      }

      const filePath = path.join(folderPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile() && isConvertibleImage(file)) {
        await convertImageToWebp(filePath);
      }
    }
  } catch (error) {
    console.error(`Error processing folder ${folder}:`, error);
  }
}

async function convertImageToWebp(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const webpPath = filePath.replace(ext, '.webp');
  const isWebpExist = await fs.pathExists(webpPath);

  if (isWebpExist) {
    console.log(`WebP already exists for ${filePath}, skipping...`);
    return;
  }

  await sharp(filePath).webp({ quality: 80 }).withMetadata().toFile(webpPath);
  await fs.remove(filePath);
}

function isConvertibleImage(file) {
  const ext = path.extname(file).toLowerCase();
  return CONVERTIBLE_IMAGE_EXTENSIONS.includes(ext);
}
