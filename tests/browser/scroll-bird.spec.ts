import { test, expect } from "@playwright/test";

test("authored bird follows sections and remains outside the reading area", async ({
  page,
}) => {
  await page.goto("/?open=1");
  const bird = page.locator(".scroll-bird");
  const positions = [];
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
      .locator(`#${id}`)
      .evaluate((el) => scrollTo(0, el.getBoundingClientRect().top + scrollY));
    await expect(bird).toHaveAttribute("data-section", id);
    const box = await bird.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x + box!.width <= 94 || box!.x >= 296).toBe(true);
    positions.push(box!.x);
  }
  expect(new Set(positions).size).toBeGreaterThan(1);
  await expect(bird).toHaveAttribute("aria-hidden", "true");
  expect(await bird.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe(
    "none",
  );
});

test("reduced motion removes continuous bird travel within a section", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?open=1");
  const bird = page.locator(".scroll-bird");
  await expect(bird).toHaveAttribute("data-section", "hero");
  const before = await bird.evaluate((el) => el.style.transform);
  await page.evaluate(() => scrollBy(0, 60));
  await page.waitForTimeout(100);
  expect(await bird.evaluate((el) => el.style.transform)).toBe(before);
});
