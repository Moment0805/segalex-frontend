const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brandDir = path.join(process.cwd(), 'public', 'brand');
if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}

async function processBrandLogo() {
  const inputPath = path.join(process.cwd(), 'public', 'brand-logo.jpg');
  if (!fs.existsSync(inputPath)) {
    console.error('Source logo public/brand-logo.jpg not found');
    return;
  }

  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  const channels = info.channels;
  const cx = 540, cy = 539.5;
  const rMedallion = 491;

  const cleaned = Buffer.from(data);
  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const rgbaIdx = (y * width + x) * 4;
      let r = cleaned[idx];
      let g = cleaned[idx + 1];
      let b = cleaned[idx + 2];

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Clean the blue button overlay located at x: 940..1060, y: 420..530
      if (x >= 940 && x <= 1060 && y >= 420 && y <= 530) {
        if (dist <= rMedallion) {
          r = 35; g = 31; b = 30;
        } else if (dist >= rMedallion + 4) {
          r = 253; g = 253; b = 253;
        } else {
          const t = (dist - rMedallion) / 4;
          r = Math.round(35 * (1 - t) + 253 * t);
          g = Math.round(31 * (1 - t) + 253 * t);
          b = Math.round(30 * (1 - t) + 253 * t);
        }
        cleaned[idx] = r;
        cleaned[idx + 1] = g;
        cleaned[idx + 2] = b;
      }

      rgba[rgbaIdx] = r;
      rgba[rgbaIdx + 1] = g;
      rgba[rgbaIdx + 2] = b;

      // Transparent circle background
      if (dist > rMedallion + 4) {
        rgba[rgbaIdx + 3] = 0;
      } else if (dist > rMedallion) {
        const alphaT = 1 - (dist - rMedallion) / 4;
        rgba[rgbaIdx + 3] = Math.round(255 * alphaT);
      } else {
        rgba[rgbaIdx + 3] = 255;
      }
    }
  }

  // 1. Save cleaned JPEG: public/brand/logo.jpg
  await sharp(cleaned, { raw: { width, height, channels } })
    .jpeg({ quality: 95 })
    .toFile(path.join(brandDir, 'logo.jpg'));
  console.log('Saved public/brand/logo.jpg');

  // 2. Save transparent PNG: public/brand/logo.png
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(brandDir, 'logo.png'));
  console.log('Saved public/brand/logo.png');

  // 3. Favicons
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize(64, 64)
    .png()
    .toFile(path.join(process.cwd(), 'public', 'favicon.ico'));

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize(64, 64)
    .png()
    .toFile(path.join(process.cwd(), 'src', 'app', 'favicon.ico'));
  console.log('Saved favicons');

  // 4. Open Graph Image: 1200 x 630
  const logoResized = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize(380, 380)
    .png()
    .toBuffer();

  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#151314"/>
      <circle cx="1050" cy="150" r="350" fill="#008751" opacity="0.2"/>
      <circle cx="150" cy="550" r="250" fill="#FFC800" opacity="0.1"/>
      <text x="500" y="220" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="52" font-weight="bold" letter-spacing="-1">SEGALEX PROPERTY HUB</text>
      <text x="500" y="275" fill="#FFC800" font-family="Arial, sans-serif" font-size="22" font-weight="bold" letter-spacing="2">CREATING WEALTH THROUGH REAL ESTATE</text>
      <text x="500" y="350" fill="#E5E7EB" font-family="Arial, sans-serif" font-size="30">Verified Property Marketplace · Lagos, Nigeria</text>
      <rect x="500" y="405" width="220" height="46" rx="8" fill="#008751"/>
      <text x="520" y="435" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="18" font-weight="bold">✓ LASRERA VERIFIED</text>
      <rect x="740" y="405" width="180" height="46" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1"/>
      <text x="760" y="435" fill="#CBD5E1" font-family="Arial, sans-serif" font-size="18" font-weight="600">RC: 7351342</text>
      <text x="500" y="520" fill="#94A3B8" font-family="Arial, sans-serif" font-size="19">Concept Prototype by The Edge Studio</text>
    </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .composite([{ input: logoResized, top: 125, left: 70 }])
    .jpeg({ quality: 92 })
    .toFile(path.join(brandDir, 'og-image.jpg'));
  console.log('Saved public/brand/og-image.jpg');
}

processBrandLogo().catch(err => {
  console.error('Error processing logo:', err);
  process.exit(1);
});

