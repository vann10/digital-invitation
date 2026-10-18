import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const root='docs/qa/opening-prototype';
const tiles=[];
for (const [row,approach] of ['dissolve','lift'].entries()) {
  for (const [column,state] of ['cover','mid','hero'].entries()) {
    tiles.push({input:await sharp(`${root}/${approach}-390-${state}.png`).resize(260).toBuffer(),left:column*280+20,top:row*600+45});
  }
}
await sharp({create:{width:840,height:1200,channels:3,background:'#faf7f1'}}).composite(tiles).png().toFile(`${root}/comparison.png`);
await writeFile(`${root}/index.html`,`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Opening motion review</title><style>body{margin:32px;background:#faf7f1;color:#174a4a;font:16px system-ui}img{width:100%;max-width:840px}a{color:inherit}p{max-width:760px;line-height:1.6}</style><h1>Opening / Hero motion review</h1><p><a href="http://127.0.0.1:3002/?transition=dissolve">A — Botanical Dissolve</a> · <a href="http://127.0.0.1:3002/?transition=lift">B — Editorial Lift</a>. Reload each preview to replay. Both handoffs target 1400ms. Keyboard focus is intentionally visible in the captures.</p><p>Top row: A. Bottom row: B. Columns: composed cover, in-flight frame, Hero. Captures are sampled after a 700ms wait; screenshot overhead means they are not exact synchronized animation frames.</p><img src="comparison.png" alt="Two rows comparing the same cover, different intermediate transitions, and the same revealed Hero"><p>A uses outward botanical movement and an opacity dissolve. B uncovers the Hero from bottom to top with a moving paper edge. The intermediate capture can clip a heading momentarily; all text is fully exposed at handoff.</p></html>`);
