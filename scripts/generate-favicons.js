const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateFavicons() {
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512
  };

  // Source image path (your logo)
  const sourceImage = path.join(__dirname, '../public/icon.svg');
  
  try {
    // Generate PNGs for different sizes
    for (const [filename, size] of Object.entries(sizes)) {
      await sharp(sourceImage)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, '../public', filename));
      
      console.log(`Generated ${filename}`);
    }

    // Generate ICO file
    await sharp(sourceImage)
      .resize(32, 32)
      .toFormat('ico')
      .toFile(path.join(__dirname, '../public/favicon.ico'));
    
    console.log('Generated favicon.ico');

  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 