import sharp from "sharp";
import { mkdir, copyFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const root = "output/illustration-library-v1";
const generated = "C:/Users/vann/.codex/generated_images/01a147ad-aced-7743-886a-df36575f238e";
const assets = [
  { id: "rd-connecting-branch-v1", source: "exec-a0e632cd-d290-4d71-a2cb-d3c28f1ecba1.png", label: "01 / CONNECTING BRANCH", role: "Opening / Hero / section edges", pivot: [0.4, 0.92] },
  { id: "rd-bud-sprig-v1", source: "exec-86da3163-6ef1-4837-aa31-df957b8e872c.png", label: "02 / BUD SPRIG", role: "Letter / RSVP / narrow margins", pivot: [0.55, 0.93] },
  { id: "rd-peony-accent-v1", source: "exec-e9d5c71c-243d-4c55-846d-280b532c6742.png", label: "03 / PEONY ACCENT", role: "Foreground focal layer / cover", pivot: [0.5, 0.6] },
];
for (const dir of ["masters", "web", "preview"]) await mkdir(`${root}/${dir}`, { recursive: true });
const manifest = { status: "PROPOSED — USER VISUAL REVIEW PENDING", generator: "Built-in image_gen; exact model identity not exposed. User authorized substitution for requested GPT Image 2.5.", assets: [] };
for (const item of assets) {
  const master = `${root}/masters/${item.id}.png`;
  await copyFile(path.join(generated, item.source), master);
  const metadata = await sharp(master).metadata();
  if (!metadata.hasAlpha) throw Error(`${item.id}: missing alpha`);
  const alpha = await sharp(master).extractChannel("alpha").stats();
  const variants = [];
  for (const edge of [320, 640, 960]) {
    const file = `web/${item.id}-${edge}.webp`;
    const result = await sharp(master).resize({ width: edge, height: edge, fit: "inside", withoutEnlargement: true }).webp({ quality: 85, alphaQuality: 100, effort: 6 }).toFile(`${root}/${file}`);
    variants.push({ file, width: result.width, height: result.height, bytes: result.size });
  }
  manifest.assets.push({ id: item.id, role: item.role, master: `masters/${item.id}.png`, width: metadata.width, height: metadata.height, aspectRatio: `${metadata.width}:${metadata.height}`, bytes: (await stat(master)).size, hasAlpha: true, alphaMin: alpha.channels[0].min, alphaMax: alpha.channels[0].max, pivot: item.pivot, variants });
}
await writeFile(`${root}/manifest.json`, JSON.stringify(manifest, null, 2));

// Review sheet only: original art is not recolored, background is a separate layer.
const width = 1560, height = 1530;
const labels = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><style>text{font-family:Arial,sans-serif;fill:#174a4a}.small{font-size:15px;fill:#746a66}.title{font-family:Georgia,serif;font-size:36px}</style><rect width="100%" height="100%" fill="#faf7f1"/><text x="40" y="62" class="title">Rizal &amp; Dewi — Illustration library / 01</text><text x="40" y="94" class="small">PROPOSED ARTWORK · THREE INDEPENDENT LAYERS · NO WEBSITE INTEGRATION</text>${assets.map((a,i)=>`<text x="${i*520+40}" y="142" font-size="17">${a.label}</text><text x="${i*520+40}" y="168" class="small">${a.role}</text>`).join("")}<rect y="820" width="1560" height="660" fill="#174a4a"/><text x="40" y="1510" class="small">Upper: Warm Ivory / Lower: Emerald Blue — original alpha preserved; no background baked into exports.</text></svg>`;
const layers = [{ input: Buffer.from(labels), left: 0, top: 0 }];
for (let i = 0; i < assets.length; i++) {
  const b = await sharp(`${root}/web/${assets[i].id}-960.webp`).resize({ width: 430, height: 590, fit: "inside" }).png().toBuffer();
  const m = await sharp(b).metadata();
  for (const top of [200, 850]) layers.push({ input: b, left: i*520+Math.round((520-m.width)/2), top: top+Math.round((590-m.height)/2) });
}
await sharp({create:{width,height,channels:4,background:"#faf7f1"}}).composite(layers).png().toFile(`${root}/preview/asset-preview-sheet.png`);

const scene = {
  status: "PROPOSED assembly only — not a page layout",
  canvas: { width: 720, height: 900 },
  layers: [
    { asset: assets[0].id, file: `web/${assets[0].id}-960.webp`, x: 80, y: 60, width: 460, z: 0, transformOrigin: "40% 92%" },
    { asset: assets[1].id, file: `web/${assets[1].id}-640.webp`, x: 290, y: 310, width: 260, z: 1, transformOrigin: "55% 93%" },
    { asset: assets[2].id, file: `web/${assets[2].id}-640.webp`, x: 115, y: 450, width: 320, z: 2, transformOrigin: "50% 60%" },
  ],
  motion: { type: "finite", branchDegrees: 2, sprigDegrees: 3, flowerScale: [0.98,1], reducedMotion: "static", note: "Separate independent raster motifs, not articulated petal/leaf rigs. Preview only." },
};
await writeFile(`${root}/layer-composition.json`, JSON.stringify(scene, null, 2));
const composed = [];
for (const layer of scene.layers) composed.push({ input: await sharp(`${root}/${layer.file}`).resize({width:layer.width}).png().toBuffer(), left:layer.x,top:layer.y });
await sharp({create:{width:720,height:900,channels:4,background:"#faf7f1"}}).composite(composed).png().toFile(`${root}/preview/layer-assembly.png`);
await writeFile(`${root}/preview.html`, `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Rizal &amp; Dewi — asset review</title><style>body{background:#faf7f1;color:#174a4a;font:16px/1.6 Arial;margin:0;padding:24px}main{max-width:1200px;margin:auto}h1{font:36px Georgia}img{max-width:100%;height:auto}.scene{position:relative;width:min(100%,720px);aspect-ratio:720/900;margin:auto;overflow:hidden}.scene img{position:absolute}.scene[data-play] img{animation:settle 2.4s ease-out both}.scene[data-play] img:nth-child(2){animation-delay:.12s}.scene[data-play] img:nth-child(3){animation-delay:.25s}button{background:#174a4a;color:#faf7f1;padding:14px 20px;border:0;cursor:pointer}button:focus-visible{outline:3px solid #596957;outline-offset:4px}@keyframes settle{from{opacity:0;transform:rotate(-2deg) translateY(8px)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){.scene[data-play] img{animation:none}}</style><main><h1>Illustration library — review</h1><p>Proposed artwork. Existing site is unchanged. Three standalone transparent layers; no articulated petal or wing rig.</p><img src="preview/asset-preview-sheet.png" alt="Three botanical proposals compared on Ivory and Emerald"><h2>Independent layer assembly</h2><button onclick="const s=document.querySelector('.scene');s.removeAttribute('data-play');requestAnimationFrame(()=>requestAnimationFrame(()=>s.setAttribute('data-play','')))">Replay finite layer preview</button><div class="scene">${scene.layers.map(l=>`<img src="${l.file}" alt="${l.asset}" style="left:${l.x/720*100}%;top:${l.y/900*100}%;width:${l.width/720*100}%;transform-origin:${l.transformOrigin}">`).join("")}</div><p>Static by default. Reduced motion stays static. This assembly demonstrates layering, not approved website composition.</p></main></html>`);
console.log(JSON.stringify(manifest,null,2));
