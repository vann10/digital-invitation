import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const root = process.env.QA_ROOT || "docs/qa/editorial-elevation";
await mkdir(root, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
});
const results = [];
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: width === 390 ? 844 : 900 },
    });
    await page.addInitScript(() => {
      window.editorialMetrics = { cls: 0, lcp: 0 };
      new PerformanceObserver((list) => {
        for (const e of list.getEntries())
          if (!e.hadRecentInput) window.editorialMetrics.cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((list) => {
        window.editorialMetrics.lcp = list.getEntries().at(-1).startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
    });
    await page.goto(process.env.QA_BASE_URL || "http://127.0.0.1:3001", {
      waitUntil: "networkidle",
    });
    await page.locator(".enhanced").waitFor();
    await page.waitForTimeout(2200);
    const handoff = await page.evaluate(
      () =>
        new Promise((resolve) => {
          const start = performance.now();
          const observer = new MutationObserver(() => {
            if (!document.querySelector(".phase-opened")) return;
            observer.disconnect();
            requestAnimationFrame(() =>
              resolve({
                duration: performance.now() - start,
                names: [...document.querySelectorAll(".hero-names > *")].map(
                  (el) => ({
                    opacity: getComputedStyle(el).opacity,
                    clipPath: getComputedStyle(el).clipPath,
                  }),
                ),
                scrollY,
              }),
            );
          });
          observer.observe(document.querySelector(".invitation"), {
            attributes: true,
          });
          document.querySelector(".open-button").click();
        }),
    );
    await page.screenshot({ path: `${root}/handoff-${width}.png` });
    for (const section of await page.locator(".section").all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }
    const metrics = await page.evaluate(() => ({
      ...window.editorialMetrics,
      overflow: document.documentElement.scrollWidth > innerWidth,
      imageBytes: performance
        .getEntriesByType("resource")
        .filter((e) => /\/_next\/image|\/assets\//.test(e.name))
        .reduce((sum, e) => sum + e.transferSize, 0),
      imageRequests: performance
        .getEntriesByType("resource")
        .filter((e) => /\/_next\/image|\/assets\//.test(e.name)).length,
    }));
    results.push({
      width,
      handoff,
      metrics,
      environment:
        "Local Chromium, unthrottled; not a field Core Web Vitals measurement",
    });
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(`${root}/performance.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
if (
  results.some(
    (r) =>
      r.handoff.duration < 1200 ||
      r.handoff.duration > 1600 ||
      r.metrics.overflow,
  )
)
  process.exitCode = 1;
