const fs = require('fs');
const { createCanvas } = require('canvas');

const images = [
  { name: 'lego-ev3-kit.png', text: 'LEGO EV3 Kit' },
  { name: 'yahboom-kit.png', text: 'Yahboom Kit' },
  { name: 'coding.jpeg', text: 'Coding' }
];

const width = 800;
const height = 600;

function generatePlaceholder(text, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = '#374151';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`public/images/robotics/${filename}`, buffer);
  console.log(`Generated ${filename}`);
}

// Create the robotics directory if it doesn't exist
if (!fs.existsSync('public/images/robotics')) {
  fs.mkdirSync('public/images/robotics', { recursive: true });
}

// Generate all placeholder images
images.forEach(({ name, text }) => {
  generatePlaceholder(text, name);
}); 