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
  const embeddedImages = new Set([...svg.matchAll(/(?:xlink:)?href="data:image\/png;base64,([^"]+)"/g)].map((match) => match[1]));
  if (embeddedImages.size !== 1) {
    throw new Error(`${name}: expected exactly one unique embedded PNG`);
  }

  // Render the wrapper at its original size, including its image alignment.
  // Lossless encoding preserves that rendering and its transparency.
  const output = new URL(`${name}.webp`, outputDirectory);
  const result = await sharp(Buffer.from(svg)).webp({ lossless: true, effort: 6 }).toFile(fileURLToPath(output));
  console.log(`${name}: ${result.width}x${result.height}, ${result.size} bytes`);
}
