const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\emman\\.gemini\\antigravity\\brain\\6b6964d6-fa0d-44c8-a886-f2c959ee27e5';

const url = process.argv[2] || 'http://localhost:3000';
const outputName = process.argv[3] || 'homepage-1440.png';
const width = process.argv[4] || '1440';
const height = process.argv[5] || '900';
const outputPath = path.join(artifactDir, outputName);

const tempProfile = path.join(os.tmpdir(), 'chrome-headless-' + Date.now());

try {
  console.log(`Taking screenshot of ${url} at ${width}x${height} -> ${outputPath}`);
  execFileSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`,
    '--no-first-run',
    '--no-default-browser-check',
    `--window-size=${width},${height}`,
    '--hide-scrollbars',
    `--screenshot=${outputPath}`,
    url
  ], { timeout: 15000 });

  if (fs.existsSync(outputPath)) {
    const stat = fs.statSync(outputPath);
    console.log(`SUCCESS: ${outputPath} (${stat.size} bytes)`);
  } else {
    console.error(`FAILED: File not created at ${outputPath}`);
  }
} catch (err) {
  console.error('ERROR taking screenshot:', err.message);
} finally {
  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch (e) {}
}
