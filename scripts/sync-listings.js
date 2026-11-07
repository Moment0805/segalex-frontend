const fs = require('fs');
const path = require('path');

const manifestPath = path.join(process.cwd(), 'src', 'data', 'images-manifest.json');
const listingsPath = path.join(process.cwd(), 'src', 'data', 'listings.ts');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
let content = fs.readFileSync(listingsPath, 'utf8');

for (let i = 1; i <= 40; i++) {
  const id = `prop-${i}`;
  const m = manifest[id];
  if (!m) continue;

  const localPhotos = m.photos.map(p => `      '${p.path}'`).join(',\n');
  const listingRegex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?photos:\\s*\\[)([\\s\\S]*?)(\\])`);
  content = content.replace(listingRegex, (match, prefix, oldPhotos, suffix) => {
    return `${prefix}\n${localPhotos},\n    ${suffix}`;
  });

  if (m.video) {
    const videoRegex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?videoUrl:\\s*['"])([^'"]+)(['"])`);
    content = content.replace(videoRegex, (match, p1, oldV, p3) => `${p1}${m.video}${p3}`);
    const posterRegex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?videoPoster:\\s*['"])([^'"]+)(['"])`);
    content = content.replace(posterRegex, (match, p1, oldP, p3) => `${p1}${m.videoPoster}${p3}`);
  }
}

fs.writeFileSync(listingsPath, content, 'utf8');
console.log('Listings synced with local media successfully!');

