import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const assets = [
  "botanical_full_detail_hybrid",
  "botanical_ornament",
  "circular_monogram_ornament",
  "floating_botanical_leaves_fidelity",
  "monogram_RD_exact_illustration",
];

const sourceDirectory = new URL("../public/assets/", import.meta.url);
const outputDirectory = new URL("optimized/", sourceDirectory);
await mkdir(outputDirectory, { recursive: true });

for (const name of assets) {
  const svg = await readFile(new URL(`${name}.svg`, sourceDirectory), "utf8");
  const embeddedImages = new Set(
    [...svg.matchAll(/(?:xlink:)?href="data:image\/png;base64,([^"]+)"/g)].map(
      (match) => match[1],
    ),
  );
  if (embeddedImages.size !== 1) {
    throw new Error(`${name}: expected exactly one unique embedded PNG`);
  }

  // Render the wrapper at its original size, including its image alignment.
  // Lossless encoding preserves that rendering and its transparency.
  const output = new URL(`${name}.webp`, outputDirectory);
  const result = await sharp(Buffer.from(svg))
    .webp({ lossless: true, effort: 6 })
    .toFile(fileURLToPath(output));
  console.log(
    `${name}: ${result.width}x${result.height}, ${result.size} bytes`,
  );
}

// Delivery-only derivative of the supplied paper photograph; no recoloring or crop.
const paper = await sharp(fileURLToPath(new URL("2403.jpg", sourceDirectory)))
  .webp({ quality: 60 })
  .toFile(fileURLToPath(new URL("paper-grain.webp", outputDirectory)));
console.log(`paper-grain: ${paper.width}x${paper.height}, ${paper.size} bytes`);

// Preserve the selected architectural artwork; avoid sending its embedded PNG
// as a multi-megabyte SVG when responsive Image delivery can serve it instead.
const venue = await sharp(
  fileURLToPath(
    new URL("gandrung-venue-lineart-black-white.svg", sourceDirectory),
  ),
)
  .webp({ lossless: true, effort: 6 })
  .toFile(fileURLToPath(new URL("gandrung-venue.webp", outputDirectory)));
console.log(
  `gandrung-venue: ${venue.width}x${venue.height}, ${venue.size} bytes`,
);
