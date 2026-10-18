import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const root='docs/qa/phase4';
const sections=[['our-story','Our Story'],['the-wedding','The Wedding'],['venue','Venue'],['gallery','Gallery — photos pending'],['rsvp','RSVP'],['closing','Closing']];
const tiles=[];
for(const [i,[id,title]] of sections.entries()){
 const left=20+(i%3)*280,top=50+Math.floor(i/3)*800;
 tiles.push({input:await sharp(`${root}/${id}-390.png`).resize(260).toBuffer(),left,top});
 tiles.push({input:Buffer.from(`<svg width="260" height="30"><text x="0" y="20" font-family="Arial" font-size="15" fill="#174a4a">${title}</text></svg>`),left,top:top-32});
}
await sharp({create:{width:860,height:1450,channels:3,background:'#faf7f1'}}).composite(tiles).png().toFile(`${root}/section-review.png`);
await writeFile(`${root}/index.html`,`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Phase 4 section review</title><style>body{font:16px/1.6 system-ui;background:#faf7f1;color:#174a4a;margin:32px}main{max-width:1400px;margin:auto}img{max-width:100%;height:auto}.pair{display:grid;grid-template-columns:minmax(0,390px) minmax(0,1fr);gap:28px;align-items:start}details{margin-block:36px}summary{font-size:24px;cursor:pointer}a{color:inherit}@media(max-width:700px){.pair{grid-template-columns:1fr}}</style><main><h1>Phase 4 — section review</h1><p>Actual browser captures at 390×844 and 1440×900. Development captures include the Next.js badge. Content remains pending; no real couple photographs have been supplied.</p><p><a href="http://127.0.0.1:3004/">Open production preview</a></p>${sections.map(([id,title])=>`<details open><summary>${title}</summary><div class="pair"><img src="${id}-390.png" alt="${title}, mobile composition"><img src="${id}-1440.png" alt="${title}, desktop composition"></div></details>`).join('')}<details><summary>RSVP keyboard selection</summary><img src="rsvp-keyboard-selected-390.png" alt="Unable to Attend selected with check mark and visible keyboard focus"></details></main></html>`);
