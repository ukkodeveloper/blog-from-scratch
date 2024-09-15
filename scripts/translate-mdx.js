// scripts/translate-mdx.js
const fs = require('fs').promises;
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function translateContent(content) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `You are an expert translator specializing in frontend development and web technologies. 
Translate the following Markdown content from Korean to English, adhering to these guidelines:

1. Maintain the technical accuracy and tone of a frontend tech blog.
2. Do not translate the metadata section but persist it. (top section, enclosed by '---').
3. Keep all other metadata fields unchanged.
4. Preserve all Markdown formatting.
5. Do NOT translate or modify:
   - Image links/paths (e.g., ![](images/example-image.webp))
   - Code blocks (content between ''' or \`\`\`)
   - HTML tags
   - URLs
6. Accurately translate frontend-specific terms and concepts.
7. Keep variable names, function names, and other code-related terms in their original form.

Here's the content to translate:

${content}

Translated content:`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

function extractAndTranslateMetadata(content) {
  const metadataRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(metadataRegex);

  if (match) {
    const metadata = match[1];
    const translatedMetadata = metadata.replace(
      /(title|summary):\s*(.*)/g,
      (_, field, value) => `${field}: ${translateField(value)}`
    );
    return content.replace(metadataRegex, `---\n${translatedMetadata}\n---`);
  }

  return content;
}

async function translateField(value) {
  // 실제로는 이 부분에서 Gemini API를 호출하여 번역을 수행해야 합니다.
  // 여기서는 간단한 예시로 대체합니다.
  return `[Translated] ${value}`;
}

async function processFile(filePath) {
  const _content = await fs.readFile(filePath, 'utf-8');
  const translatedContent = await translateContent(_content);

  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  const newFileName = `${baseName}-eng${ext}`;
  const newFilePath = path.join(dir, newFileName);

  await fs.writeFile(newFilePath, translatedContent);
  console.log(`Translated: ${filePath} -> ${newFilePath}`);
}

async function processDirectory(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (['우테코', '회고', 'shook'].includes(entry.name)) {
        await processDirectory(fullPath);
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

processDirectory(blogDir)
  .then(() => console.log('Translation complete'))
  .catch((error) => console.error('Error:', error));
