import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const root = "docs/qa/phase4";
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3003";
const ids = ["our-story", "the-wedding", "venue", "gallery", "rsvp", "closing"];
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const results = { responsive: [], motion: [], keyboard: false };
try {
  for (const [width, height] of [
    [320, 568],
    [667, 375],
    [768, 1024],
    [1024, 768],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    await page.goto(base + "/?open=1", { waitUntil: "networkidle" });
    for (const id of ids) {
      const section = page.locator("#" + id);
      await section.scrollIntoViewIfNeeded();
      const clipped = await section
        .locator("h2,h3,.letter-copy,.response-option,.submit-button")
        .evaluateAll((nodes) =>
          nodes
            .filter((n) => {
              const b = n.getBoundingClientRect();
              return b.left < 0 || b.right > innerWidth;
            })
            .map((n) => n.className || n.tagName),
        );
      assert.deepEqual(clipped, [], `${id} ${width} text clipping`);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
    }
    assert.equal(
      await page.evaluate(
        () =>
          document.getAnimations().filter((a) => a.playState === "running")
            .length,
      ),
      0,
    );
    results.responsive.push({
      width,
      height,
      sections: ids.length,
      overflow: false,
      clippedText: false,
      reducedMotion: true,
    });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.addInitScript(() => {
    window.motionEvidence = [];
    const original = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      window.motionEvidence.push({
        section: this.closest("section")?.id,
        kind: this.dataset.motion || "impression",
        delay: options.delay,
        duration: options.duration,
      });
      return original.call(this, frames, options);
    };
  });
  await page.goto(base + "/#invite=" + "A".repeat(43), {
    waitUntil: "networkidle",
  });
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await page.locator(".phase-opened").waitFor();
  assert.equal(
    await page.evaluate(() => document.activeElement.id),
    "hero-title",
  );
  for (const id of ids) {
    await page.locator("#" + id).scrollIntoViewIfNeeded();
    await page
      .locator("#" + id + " img")
      .evaluateAll((imgs) =>
        Promise.all(imgs.map((i) => i.decode().catch(() => {}))),
      );
    await page.waitForTimeout(400);
  }
  results.motion = await page.evaluate(() => window.motionEvidence);
  for (const kind of ["letter", "date", "engraving", "reply", "rule"])
    assert.ok(
      results.motion.some((r) => r.kind === kind),
      kind + " should animate",
    );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(100);
  assert.equal(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
    0,
  );
  await page.locator("#rsvp").scrollIntoViewIfNeeded();
  const attending = page.getByRole("radio", { name: "Attending", exact: true });
  const unable = page.getByRole("radio", { name: "Unable to Attend" });
  await attending.focus();
  await page.keyboard.press("Space");
  assert.equal(await attending.isChecked(), true);
  await page.keyboard.press("ArrowDown");
  assert.equal(await unable.isChecked(), true);
  assert.equal(await attending.isChecked(), false);
  assert.equal(
    await unable.evaluate(
      (e) => getComputedStyle(e.closest("label")).outlineStyle,
    ),
    "solid",
  );
  const mark = await unable.evaluate(
    (e) => getComputedStyle(e.nextElementSibling).opacity,
  );
  assert.equal(mark, "1");
  for (const radio of [attending, unable]) {
    const b = await radio.boundingBox();
    assert.ok(b.height >= 44);
  }
  await page
    .locator("#rsvp")
    .screenshot({ path: root + "/rsvp-keyboard-selected-390.png" });
  results.keyboard = true;
  results.opening = true;
  results.reducedMotionChange = true;
  assert.deepEqual(
    await page
      .locator("main section")
      .evaluateAll((nodes) => nodes.map((n) => n.id)),
    ["opening", "hero", ...ids],
  );
  results.sectionOrder = true;
  await page.close();
} finally {
  await browser.close();
  await writeFile(
    root + "/flow-results.json",
    JSON.stringify(results, null, 2),
  );
}
console.log(JSON.stringify(results, null, 2));
