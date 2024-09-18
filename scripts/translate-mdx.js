// scripts/translate-mdx.js
const fs = require('fs').promises;
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const PROMPT = ``;
const SERIES_CATEGORIES = ['우테코', '회고', 'shook'];

async function translateContent(content) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `You are a highly skilled professional translator specializing in frontend development, web technologies, and technical writing. 
Your task is to translate the following Markdown content from Korean to English while ensuring the following guidelines are strictly followed:

1. Maintain the technical accuracy, natural flow, and professional tone of a frontend technology blog.
2. Do not translate the metadata section (enclosed by '---'), but keep it intact.
3. Leave all metadata fields unchanged.
4. Preserve all Markdown formatting, including headings, lists, links, and special characters.
5. Do NOT translate or modify:
   - Image links/paths (e.g., ![](images/example-image.webp))
   - Code blocks (content between ''' or \`\`\`)
   - HTML tags
   - URLs
6. Accurately translate all frontend-specific terms and concepts to their proper English equivalents.
7. Maintain original variable names, function names, and other code-related terminology.

Here is the content to translate:

${content};`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function processFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const translated = await translateContent(content);

  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  const newFileName = `${baseName}-eng${ext}`;
  const newFilePath = path.join(dir, newFileName);

  await fs.writeFile(newFilePath, translated);
  console.log(`Translated: ${filePath} -> ${newFilePath}`);
}

async function main(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (SERIES_CATEGORIES.includes(entry.name)) {
        await main(fullPath);
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      if (!entry.name.includes('-eng')) {
        const engVersion = fullPath.replace(/\.md$/, '-eng.md');
        try {
          await fs.access(engVersion);
          console.log(`Skipping: ${fullPath} (English version already exists)`);
        } catch {
          await processFile(fullPath);
        }
      }
    }
  }
}

const rootDir = path.resolve(__dirname, '..');
const blogDir = path.join(rootDir, 'public', 'blog');

main(blogDir)
  .then(() => console.log('Translation complete'))
  .catch((error) => console.error('Error:', error));
