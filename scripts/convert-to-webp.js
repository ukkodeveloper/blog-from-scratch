const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// 프로젝트 루트 디렉토리에서 상대 경로 설정
const publicDir = path.join(__dirname, '../public');

async function convertToWebp(folder) {
  const folderPath = path.join(publicDir, folder);

  try {
    const files = await fs.readdir(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          const webpFile = filePath.replace(ext, '.webp');

          if (await fs.pathExists(webpFile)) {
            console.log(`WebP already exists for ${file}, skipping...`);
            continue;
          }

          console.log(`Converting ${file} to WebP...`);

          try {
            await sharp(filePath).webp({ quality: 80 }).toFile(webpFile);

            console.log(`Converted ${file} to WebP`);

            // 원본 파일 삭제
            await fs.remove(filePath);
            console.log(`Deleted original file: ${file}`);
          } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error processing folder ${folder}:`, error);
  }
}

async function processPublicFolders() {
  try {
    const folders = await fs.readdir(publicDir);

    console.log('Folders in /public/:');
    folders.forEach((folder) => console.log(folder));

    for (const folder of folders) {
      const folderPath = path.join(publicDir, folder);
      const stat = await fs.stat(folderPath);

      if (stat.isDirectory()) {
        console.log(`\nProcessing folder: ${folder}`);
        await convertToWebp(folder);
      }
    }

    console.log('\nAll folders have been processed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

processPublicFolders();
