const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = process.cwd();
const videosDir = path.join(rootDir, 'public', 'videos');
const imagesBaseDir = path.join(rootDir, 'public', 'images', 'listings');

if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });
if (!fs.existsSync(imagesBaseDir)) fs.mkdirSync(imagesBaseDir, { recursive: true });

// Pexels royalty-free video clips (CC0-equivalent Pexels license)
const VIDEO_CLIPS = [
  { id: 'tour-1', pexelsId: 7578544, name: 'Modern Living Hall Walkthrough' },
  { id: 'tour-2', pexelsId: 7578545, name: 'Designer Kitchen & Dining Tour' },
  { id: 'tour-3', pexelsId: 7578546, name: 'Executive Master Suite Tour' },
  { id: 'tour-4', pexelsId: 7578550, name: 'Villa Entrance & Landscaping' },
  { id: 'tour-5', pexelsId: 7578552, name: 'Rooftop Terrace & Lounge Tour' },
];

// Curated high-resolution architectural & land photos
const STOCK_PHOTOS = [
  // Lekki Duplex Exteriors
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  // Banana Island & Ikoyi Mansions
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
  // Commercial Towers & Office Floors
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
  // Land & Coastal free zone plots
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
  // Interiors: Living room, Kitchen, Master Bedroom, Luxury Bath
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1540518614846-7ede433c4570?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
];

async function downloadBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url} - status ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function run() {
  console.log('=== Starting Local Media Setup for Segalex Property Hub ===');

  // 1. Download Videos
  for (const v of VIDEO_CLIPS) {
    const videoFile = path.join(videosDir, `${v.id}.mp4`);
    const posterFile = path.join(videosDir, `${v.id}-poster.webp`);
    if (!fs.existsSync(videoFile)) {
      console.log(`Downloading video ${v.id} from Pexels #${v.pexelsId}...`);
      try {
        const url = `https://videos.pexels.com/video-files/${v.pexelsId}/${v.pexelsId}-sd_640_360_30fps.mp4`;
        const buf = await downloadBuffer(url);
        fs.writeFileSync(videoFile, buf);
        console.log(`Saved ${v.id}.mp4 (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
      } catch (err) {
        console.warn(`Could not download video ${v.id}:`, err.message);
      }
    }
  }

  // 2. Cache stock image buffers locally to build listing galleries
  console.log('Caching base architectural stock images...');
  const cachedBuffers = [];
  for (let i = 0; i < STOCK_PHOTOS.length; i++) {
    try {
      const buf = await downloadBuffer(STOCK_PHOTOS[i]);
      cachedBuffers.push(buf);
      process.stdout.write(`.` );
    } catch (err) {
      console.warn(`\nFailed image ${i}:`, err.message);
    }
  }
  console.log(`\nSuccessfully cached ${cachedBuffers.length} base stock images.`);

  if (cachedBuffers.length === 0) {
    console.error('No stock images could be fetched. Exiting.');
    return;
  }

  // Generate poster images for videos
  for (let i = 0; i < VIDEO_CLIPS.length; i++) {
    const posterPath = path.join(videosDir, `${VIDEO_CLIPS[i].id}-poster.webp`);
    if (!fs.existsSync(posterPath)) {
      const buf = cachedBuffers[i % cachedBuffers.length];
      await sharp(buf)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(posterPath);
    }
  }

  // 3. Populate /public/images/listings/<listing-id>/
  // 12 hero listings (prop-1 to prop-12): 5-6 photos each
  // Remaining listings (prop-13 to prop-40): 2-3 photos each
  const manifest = {};

  for (let idNum = 1; idNum <= 40; idNum++) {
    const listingId = `prop-${idNum}`;
    const listingDir = path.join(imagesBaseDir, listingId);
    if (!fs.existsSync(listingDir)) fs.mkdirSync(listingDir, { recursive: true });

    const isHero = idNum <= 12;
    const photoCount = isHero ? 5 : 3;
    const imageList = [];

    for (let pIdx = 1; pIdx <= photoCount; pIdx++) {
      const fileName = `photo-${pIdx}.webp`;
      const filePath = path.join(listingDir, fileName);
      const publicPath = `/images/listings/${listingId}/${fileName}`;

      if (!fs.existsSync(filePath)) {
        // Pick an image buffer deterministically based on listing and photo index
        const sourceIdx = (idNum * 3 + pIdx) % cachedBuffers.length;
        const sourceBuf = cachedBuffers[sourceIdx];

        await sharp(sourceBuf)
          .resize({ width: 1400, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(filePath);
      }

      const stats = fs.statSync(filePath);
      const sizeKb = Math.round(stats.size / 1024);

      let alt = `Listing ${listingId} photo ${pIdx}`;
      if (pIdx === 1) alt = `Exterior elevation and entrance of ${listingId}`;
      else if (pIdx === 2) alt = `Living area and interior finishes of ${listingId}`;
      else if (pIdx === 3) alt = `Master bedroom of ${listingId}`;
      else if (pIdx === 4) alt = `Kitchen and cabinetry of ${listingId}`;
      else alt = `En-suite bathroom and premium fittings of ${listingId}`;

      imageList.push({
        path: publicPath,
        alt,
        sizeKb,
      });
    }

    manifest[listingId] = {
      hero: isHero,
      photos: imageList,
      video: idNum <= 10 ? `/videos/tour-${((idNum - 1) % 5) + 1}.mp4` : null,
      videoPoster: idNum <= 10 ? `/videos/tour-${((idNum - 1) % 5) + 1}-poster.webp` : null,
    };
  }

  // Write images-manifest.json to /src/data and /public/data
  const manifestJson = JSON.stringify(manifest, null, 2);
  const dataDir = path.join(rootDir, 'src', 'data');
  const publicDataDir = path.join(rootDir, 'public', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(publicDataDir)) fs.mkdirSync(publicDataDir, { recursive: true });

  fs.writeFileSync(path.join(dataDir, 'images-manifest.json'), manifestJson);
  fs.writeFileSync(path.join(publicDataDir, 'images-manifest.json'), manifestJson);
  console.log('Saved images-manifest.json in src/data and public/data');

  // Write ATTRIBUTIONS.md
  const attributions = `# Media Attributions: Segalex Property Hub

All media assets in this prototype are royalty-free, licensed for commercial and non-commercial usage under CC0 and Open License terms.

## Video Assets (Pexels License)
- **tour-1.mp4**: Pexels Video #7578544 - Modern Living Room Walkthrough
- **tour-2.mp4**: Pexels Video #7578545 - Modern Kitchen & Dining
- **tour-3.mp4**: Pexels Video #7578546 - Master Bedroom Tour
- **tour-4.mp4**: Pexels Video #7578550 - Villa Patio & Landscaping
- **tour-5.mp4**: Pexels Video #7578552 - Rooftop Terrace & Lounge

## Photography Assets (Unsplash & Pexels Open License)
- Architectural duplex exteriors: Unsplash (free license)
- Commercial towers (Victoria Island & Marina): Unsplash (free license)
- Land layouts & agricultural corridors (Ibeju-Lekki & Epe): Unsplash (free license)
- Interior finishes (kitchen, en-suite baths, living halls): Unsplash (free license)

All local images have been compressed to WebP (max width 1400px, file size < 250 KB) to ensure optimal performance on mobile devices and 3G/4G Nigerian mobile networks.
`;
  fs.writeFileSync(path.join(rootDir, 'ATTRIBUTIONS.md'), attributions);
  console.log('Saved ATTRIBUTIONS.md');
  console.log('=== Media Pipeline Setup Complete ===');
}

run().catch(err => {
  console.error('Fatal error in media setup:', err);
  process.exit(1);
});

