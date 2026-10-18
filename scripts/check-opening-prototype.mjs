import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const root = "docs/qa/opening-prototype";
await mkdir(root, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const results = [];
try {
  for (const approach of ["dissolve", "lift"]) {
    for (const [width, height] of [
      [320, 568],
      [390, 844],
      [768, 1024],
      [1440, 900],
    ]) {
      const context = await browser.newContext({ viewport: { width, height } });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.route(/\.(mp4|webm)(\?|$)/, (route) => route.abort());
      await page.addInitScript(() => {
        window.qa = { cls: 0, frames: [], handoff: 0 };
        new PerformanceObserver((list) => {
          for (const e of list.getEntries())
            if (!e.hadRecentInput) window.qa.cls += e.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      await page.goto(`http://127.0.0.1:3002/?transition=${approach}`, {
        waitUntil: "networkidle",
      });
      await page.waitForTimeout(4400);
      const button = page.getByRole("button", { name: "BUKA UNDANGAN" });
      await page.keyboard.press("Tab");
      assert.equal(
        await button.evaluate((e) => e === document.activeElement),
        true,
      );
      const focus = await button.evaluate((e) => ({
        outline: getComputedStyle(e).outlineStyle,
        width: getComputedStyle(e).outlineWidth,
      }));
      assert.notEqual(focus.outline, "none");
      const bounds = await button.boundingBox();
      assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= height);
      await page.screenshot({ path: `${root}/${approach}-${width}-cover.png` });
      const coverAxe = await new AxeBuilder({ page })
        .include("#opening")
        .analyze();
      await page.evaluate(() => {
        document.querySelector("form").addEventListener(
          "submit",
          () => {
            const start = performance.now();
            let previous = start;
            const frame = (now) => {
              window.qa.frames.push(now - previous);
              previous = now;
              if (!document.querySelector(".phase-opened"))
                requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
            const observer = new MutationObserver(() => {
              if (document.querySelector(".phase-opened")) {
                window.qa.handoff = performance.now() - start;
                observer.disconnect();
              }
            });
            observer.observe(document.querySelector(".invitation"), {
              attributes: true,
              attributeFilter: ["class"],
            });
          },
          { once: true },
        );
      });
      await page.keyboard.press("Enter");
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${root}/${approach}-${width}-mid.png` });
      await page.locator(".phase-opened").waitFor();
      await page.waitForTimeout(150);
      const metrics = await page.evaluate(() => ({
        ...window.qa,
        focus: document.activeElement.id,
        scrollY,
        overflow: document.documentElement.scrollWidth > innerWidth,
        videos: document.querySelectorAll("video").length,
        imageBytes: performance
          .getEntriesByType("resource")
          .filter((r) => r.initiatorType === "img")
          .reduce((sum, r) => sum + r.transferSize, 0),
        images: [...document.querySelectorAll("#hero img")].every(
          (i) => i.complete && i.naturalWidth > 0,
        ),
      }));
      assert.ok(metrics.handoff >= 1200 && metrics.handoff <= 1600);
      assert.equal(metrics.focus, "hero-title");
      assert.equal(metrics.scrollY, 0);
      assert.equal(metrics.overflow, false);
      assert.equal(metrics.images, true);
      await page.screenshot({ path: `${root}/${approach}-${width}-hero.png` });
      const heroAxe = await new AxeBuilder({ page }).include("#hero").analyze();
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(300);
      assert.ok(await page.evaluate(() => scrollY > 0));
      assert.deepEqual(errors, []);
      results.push({
        approach,
        width,
        height,
        focus,
        metrics,
        coverViolations: coverAxe.violations,
        heroViolations: heroAxe.violations,
        scroll: true,
        errors,
      });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.reload({ waitUntil: "networkidle" });
      await page.getByRole("button", { name: "BUKA UNDANGAN" }).press("Space");
      await page.locator(".phase-opened").waitFor({ timeout: 1000 });
      assert.equal(
        await page.evaluate(
          () =>
            document.getAnimations().filter((a) => a.playState === "running")
              .length,
        ),
        0,
      );
      results.at(-1).reducedMotion = true;
      if (width === 390) {
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await page.reload({ waitUntil: "networkidle" });
        await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
        await page.locator(".phase-opened").waitFor();
        results.at(-1).pointer = true;
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(`${root}/results.json`, JSON.stringify(results, null, 2));
}
console.log(
  JSON.stringify(
    results.map((r) => ({
      approach: r.approach,
      width: r.width,
      handoff: r.metrics.handoff,
      cls: r.metrics.cls,
      violations: r.coverViolations.length + r.heroViolations.length,
      reducedMotion: r.reducedMotion,
    })),
    null,
    2,
  ),
);
