import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const stage = process.argv[2] || "after";
if (!["before", "after"].includes(stage))
  throw new Error("Use before or after");
const directory = `${process.env.QA_ROOT || "docs/qa/master-implementation"}/${stage}`;
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
});
const errors = [];
try {
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(process.env.QA_BASE_URL || "http://127.0.0.1:3000", {
      waitUntil: "networkidle",
    });
    await page.locator(".enhanced").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `${directory}/opening-${viewport.width}.png`,
    });
    await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
    await page.locator(".phase-opened").waitFor();
    for (const section of [
      "hero",
      "our-story",
      "the-wedding",
      "venue",
      "gallery",
      "rsvp",
      "closing",
    ]) {
      const element = page.locator(`#${section}`);
      await element.scrollIntoViewIfNeeded();
      await element
        .locator("img")
        .evaluateAll((images) =>
          Promise.all(images.map((image) => image.decode())),
        );
      await page.waitForTimeout(250);
      await element.screenshot({
        path: `${directory}/${section}-${viewport.width}.png`,
      });
    }
    await page.screenshot({
      path: `${directory}/page-${viewport.width}.png`,
      fullPage: true,
    });
    await page.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  `${directory}/console-errors.json`,
  JSON.stringify(errors, null, 2),
);
console.log(
  `Captured ${stage}: 390x844 and 1440x900; ${errors.length} console/page errors.`,
);
if (errors.length) process.exitCode = 1;
