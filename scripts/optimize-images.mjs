import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesDir = path.join(root, "public", "images");
const outputDir = path.join(imagesDir, "optimized");

await mkdir(outputDir, { recursive: true });

const resultNames = ["a1", "a2", "a3", "a4", "a5", "b1", "b2", "b3", "b4", "b5"];

await Promise.all([
  sharp(path.join(imagesDir, "hero.jpeg"))
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join(outputDir, "hero-1280.webp")),
  sharp(path.join(imagesDir, "hero.jpeg"))
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 68 })
    .toFile(path.join(outputDir, "hero-640.webp")),
  sharp(path.join(imagesDir, "why.jpeg"))
    .resize({ width: 776, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join(outputDir, "why-776.webp")),
  ...resultNames.map((name) =>
    sharp(path.join(imagesDir, `${name}.jpeg`))
      .resize({ width: 600, height: 600, fit: "cover", withoutEnlargement: true })
      .webp({ quality: 66 })
      .toFile(path.join(outputDir, `${name}-600.webp`)),
  ),
]);

const ogText = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#10251a" stop-opacity="0.95"/>
      <stop offset="0.58" stop-color="#10251a" stop-opacity="0.68"/>
      <stop offset="1" stop-color="#10251a" stop-opacity="0.2"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <text x="76" y="160" fill="#c9d8bf" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="4">RENOVA AURA · ANAND VIHAR</text>
  <text x="76" y="274" fill="#ffffff" font-family="Arial, sans-serif" font-size="76" font-weight="700">Hair Transplant</text>
  <text x="76" y="360" fill="#ffffff" font-family="Arial, sans-serif" font-size="76" font-weight="700">in Delhi</text>
  <text x="76" y="450" fill="#eef4ea" font-family="Arial, sans-serif" font-size="34">Doctor-led FUE &amp; DHI · Transparent INR pricing</text>
  <text x="76" y="512" fill="#25d366" font-family="Arial, sans-serif" font-size="34" font-weight="700">WhatsApp assessment: +91 92052 20070</text>
</svg>`);

await sharp(path.join(imagesDir, "hero.jpeg"))
  .resize({ width: 1200, height: 630, fit: "cover" })
  .composite([{ input: ogText, top: 0, left: 0 }])
  .jpeg({ quality: 82, progressive: true })
  .toFile(path.join(root, "public", "og-image.jpg"));

await cp(path.join(root, "public", "favicon.png"), path.join(root, "public", "favicon.ico"));

console.log("Optimized images written to public/images/optimized and public/og-image.jpg");
