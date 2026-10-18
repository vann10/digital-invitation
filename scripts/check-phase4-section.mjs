import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const id = process.argv[2];
if (
  !["our-story", "the-wedding", "venue", "gallery", "rsvp", "closing"].includes(
    id,
  )
)
  throw Error("Supply a section id");
const root = "docs/qa/phase4";
await mkdir(root, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const results = [];
try {
  for (const [width, height] of [
    [390, 844],
    [1440, 900],
  ]) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    await page.goto(
      (process.env.QA_BASE_URL || "http://127.0.0.1:3003") + "/?open=1",
      { waitUntil: "networkidle", timeout: 120000 },
    );
    const section = page.locator("#" + id);
    await section.scrollIntoViewIfNeeded();
    await section
      .locator("img")
      .evaluateAll((imgs) =>
        Promise.all(imgs.map((i) => i.decode().catch(() => {}))),
      );
    await page.waitForTimeout(2700);
    await section.screenshot({
      path: `${root}/${id}-${width}.png`,
      animations: "disabled",
    });
    const bounds = await section.boundingBox();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    const images = await section
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.every((i) => i.complete && i.naturalWidth > 0),
      );
    const axe = await new AxeBuilder({ page }).include("#" + id).analyze();
    assert.equal(overflow, false);
    assert.equal(images, true);
    assert.equal(axe.violations.length, 0);
    results.push({
      width,
      height,
      bounds,
      overflow,
      images,
      violations: axe.violations,
    });
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(`${root}/${id}.json`, JSON.stringify(results, null, 2));
}
console.log(JSON.stringify({ section: id, results }));
