/**
 * generate-icons.mjs — One-off script to create PNG icons from icon.svg
 * Run: node generate-icons.mjs (requires sharp: npm i sharp)
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const svgPath = join(__dirname, 'icons', 'icon.svg');
const svg = readFileSync(svgPath);

async function generate() {
  // 192×192 standard icon
  await sharp(svg, { density: 300 })
    .resize(192, 192)
    .png()
    .toFile(join(__dirname, 'icons', 'icon-192.png'));
  console.log('✓ icon-192.png (192×192)');

  // 512×512 standard icon
  await sharp(svg, { density: 300 })
    .resize(512, 512)
    .png()
    .toFile(join(__dirname, 'icons', 'icon-512.png'));
  console.log('✓ icon-512.png (512×512)');

  // 512×512 maskable icon (80% safe zone → 10% padding each side)
  const padding = Math.round(512 * 0.1); // 51px
  const inner = 512 - padding * 2;       // 410px
  await sharp(svg, { density: 300 })
    .resize(inner, inner)
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: { r: 15, g: 118, b: 110, alpha: 1 }, // --primary
    })
    .png()
    .toFile(join(__dirname, 'icons', 'icon-maskable-512.png'));
  console.log('✓ icon-maskable-512.png (512×512, maskable)');

  console.log('\nAll icons generated successfully!');
}

generate().catch((err) => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});
