const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\emman\\.gemini\\antigravity\\brain\\6b6964d6-fa0d-44c8-a886-f2c959ee27e5';

async function snap() {
  const url = process.argv[2] || 'http://localhost:3000';
  const outName = process.argv[3] || 'screenshot.png';
  const width = parseInt(process.argv[4] || '1440', 10);
  const height = parseInt(process.argv[5] || '900', 10);
  const isFullPage = process.argv[6] === 'full';
  const scrollY = parseInt(process.argv[7] || '0', 10);
  const outPath = path.join(artifactDir, outName);

  console.log(`Launching Chrome to snap ${url} (${width}x${height}, full=${isFullPage}, scrollY=${scrollY}) -> ${outPath}`);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    // Wait 2 seconds for CSS and fonts to render
    await new Promise(r => setTimeout(r, 2000));

    if (scrollY > 0) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await new Promise(r => setTimeout(r, 1500));
    }

    await page.screenshot({ path: outPath, fullPage: isFullPage });
    const stat = fs.statSync(outPath);
    console.log(`SUCCESS: ${outPath} (${stat.size} bytes)`);
  } catch (err) {
    console.error('ERROR in snap:', err.message);
  } finally {
    await browser.close();
  }
}

snap().catch(console.error);
