import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const root = "docs/qa/illustrated-suite/motion";
await mkdir(root, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
});
const measurements = [];
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(process.env.QA_BASE_URL || "http://127.0.0.1:3003", {
      waitUntil: "networkidle",
    });
    await page.locator(".enhanced").waitFor();
    await page
      .locator(".cover img")
      .evaluateAll((images) =>
        Promise.all(images.map((image) => image.decode())),
      );
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
    await page.waitForTimeout(1400);
    await page.screenshot({ path: `${root}/aperture-${width}.png` });
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${root}/assembly-${width}.png` });
    await page.locator(".phase-opened").waitFor();
    await page.screenshot({ path: `${root}/settled-${width}.png` });
    for (const id of [
      "hero",
      "our-story",
      "the-wedding",
      "venue",
      "gallery",
      "rsvp",
      "closing",
    ]) {
      await page
        .locator("#" + id)
        .evaluate((el) =>
          scrollTo(0, el.getBoundingClientRect().top + scrollY + 100),
        );
      await page.waitForTimeout(200);
      measurements.push(
        await page
          .locator(".scroll-bird")
          .evaluate((el) => ({
            section: el.dataset.section,
            transform: el.style.transform,
            opacity: el.style.opacity,
            viewport: innerWidth,
          })),
      );
    }
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(`${root}/bird.json`, JSON.stringify(measurements, null, 2));
