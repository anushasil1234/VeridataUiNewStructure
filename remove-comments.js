const fs = require('fs');
const path = require('path');

// Function to remove comments from file content
function removeComments(content) {
  return content
    .replace(/\/\/.*(?=[\n\r])/g, '') // remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
    .replace(/^\s*[\r\n]/gm, ''); // remove empty lines
}

// Function to recursively walk through directories
function walkDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDirectory(filePath); // Recursively walk subfolders
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const cleanedContent = removeComments(content);
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`🧹 Cleaned: ${filePath}`);
    }
  });
}

// Start cleaning from current directory 'src'
const startDir = path.join(__dirname, 'src');

if (fs.existsSync(startDir)) {
  walkDirectory(startDir);
  console.log('✨ All comments removed successfully!');
} else {
  console.error('❌ src folder not found!');
}
