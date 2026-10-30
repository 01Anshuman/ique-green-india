// Crops the photographs out of the company profile pages and grades them so they read as one set.
import sharp from 'sharp';

const crops = [
  { name: 'turf-laying', src: 'image3.jpg', left: 238, top: 208, width: 464, height: 464 },
  { name: 'waterfall-pond', src: 'image9.jpg', left: 0, top: 0, width: 939, height: 318 },
  { name: 'modern-garden', src: 'image9.jpg', left: 2, top: 1120, width: 503, height: 267 },
  { name: 'golf-green', src: 'image9.jpg', left: 512, top: 1120, width: 425, height: 267 },
  { name: 'buddha-court', src: 'image11.jpg', left: 0, top: 186, width: 748, height: 460 },
  { name: 'hpcl-forecourt', src: 'image14.jpg', left: 60, top: 150, width: 382, height: 156 },
  { name: 'plaza-aerial', src: 'image14.jpg', left: 60, top: 320, width: 382, height: 238 },
  { name: 'road-median', src: 'image14.jpg', left: 60, top: 572, width: 382, height: 238 },
  { name: 'highway-median', src: 'image14.jpg', left: 456, top: 68, width: 424, height: 740 },
  { name: 'raised-planter', src: 'image1.jpg', left: 552, top: 1104, width: 385, height: 224 },
];

for (const c of crops) {
  const { src, name, ...region } = c;
  await sharp(`assets-src/deck/${src}`)
    .extract(region)
    .resize({ width: c.width * 2, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 1 })
    .modulate({ saturation: 0.82, brightness: 0.96 })
    .linear(1.1, -10)
    .webp({ quality: 84 })
    .toFile(`public/photos/${name}.webp`);
  console.log(name, c.width * 2, Math.round(c.height * 2));
}
