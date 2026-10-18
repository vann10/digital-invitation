import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const token = "A".repeat(43);
const qaRoot = process.env.QA_ROOT || "docs/qa/nature-editorial";
mkdirSync(qaRoot, { recursive: true });
const sizes = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 667, height: 375 },
];
test("illustrated entrance, monogram reveal, finite motion and outward handoff", async ({
  page,
}) => {
  await page.addInitScript(() => {
    let shifts = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        };
        if (!shift.hadRecentInput) shifts += shift.value;
      }
      sessionStorage.setItem("qa-cls", String(shifts));
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await page.locator(".enhanced").waitFor();
  const button = page.getByRole("button", { name: "BUKA UNDANGAN" });
  await expect(button).toBeEnabled();
  await expect(page.locator(".cover .artwork img")).toHaveCount(3);
  await expect(page.locator(".botanical-art, .ink")).toHaveCount(0);
  await expect(page.locator(".invitation-header")).toBeHidden();
  const arrival = page.locator(".cover-art--top .artwork-motion");
  const monogram = page.locator(".cover-content .monogram");
  // Replay the real CSS timeline: initial loading can outlast a finite reveal.
  // Reset only timing; do not synthesize artwork or substitute keyframes.
  await page.evaluate(() => {
    const elements = [
      ...document.querySelectorAll<HTMLElement>(".cover *"),
    ].filter((el) => getComputedStyle(el).animationName !== "none");
    for (const el of elements) el.style.animation = "none";
    void document.body.offsetWidth;
    for (const el of elements) el.style.animation = "";
    void document.body.offsetWidth;
    document.getAnimations().forEach((animation) => {
      animation.playbackRate = 0;
      animation.currentTime = 0;
    });
  });
  for (const time of [0, 350, 1000, 2000]) {
    await page.evaluate((t) => {
      for (const animation of document.getAnimations()) {
        animation.playbackRate = 0;
        animation.currentTime = t;
      }
    }, time);
    const artOpacity = Number(
      await arrival.evaluate((el) => getComputedStyle(el).opacity),
    );
    const markOpacity = Number(
      await monogram.evaluate((el) => getComputedStyle(el).opacity),
    );
    if (time === 350) {
      expect(artOpacity).toBeGreaterThan(0);
      expect(artOpacity).toBeLessThan(1);
      expect(markOpacity).toBe(0);
      expect(
        await arrival.evaluate((el) => getComputedStyle(el).translate),
      ).not.toBe("0px");
    }
    if (time === 1000) {
      expect(markOpacity).toBeGreaterThan(0);
      expect(markOpacity).toBeLessThan(1);
      expect(
        Number(await monogram.evaluate((el) => getComputedStyle(el).scale)),
      ).toBeLessThan(1);
    }
    if (time === 2000) {
      expect(artOpacity).toBe(1);
      expect(markOpacity).toBe(1);
    }
    await page.screenshot({ path: `${qaRoot}/entrance-${time}.png` });
  }
  await page.reload();
  await page.locator(".enhanced").waitFor();
  // The selected branch breath ends at 1500 + 2800ms.
  await page.waitForTimeout(4500);
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
  await expect(page.getByRole("button", { name: /jeda animasi/i })).toHaveCount(
    0,
  );
  await page.screenshot({ path: `${qaRoot}/settled-cover.png` });
  expect(
    Number(await page.evaluate(() => sessionStorage.getItem("qa-cls") || "0")),
  ).toBeLessThan(0.1);
  // Sample within the browser, before its cover-completion timer. Automation
  // round trips can arrive too late when the host is also capturing screenshots.
  const { exits, textOpacity } = await page.evaluate(
    () =>
      new Promise<{
        exits: { opacity: number; translate: string }[];
        textOpacity: number;
      }>((resolve) => {
        document.querySelector<HTMLButtonElement>(".open-button")!.click();
        setTimeout(
          () =>
            resolve({
              exits: [...document.querySelectorAll(".cover-art")].map((el) => ({
                opacity: Number(getComputedStyle(el).opacity),
                translate: getComputedStyle(el).translate,
              })),
              textOpacity: Number(
                getComputedStyle(document.querySelector(".cover-content")!)
                  .opacity,
              ),
            }),
          350,
        );
      }),
  );
  expect(textOpacity).toBeGreaterThan(0.2);
  expect(exits[0].translate).not.toBe("0px");
  expect(exits[0].translate.startsWith("-")).toBe(true);
  expect(exits[2].translate.startsWith("-")).toBe(false);
  await page.screenshot({ path: `${qaRoot}/handoff-350.png` });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${qaRoot}/handoff-850.png` });
  await page.locator(".phase-opened").waitFor();
  await page.screenshot({ path: `${qaRoot}/handoff-complete.png` });
  expect(
    await page
      .locator(".cover")
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
  ).toBe(0);
});
for (const size of sizes) {
  test(`composition ${size.width}x${size.height}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize(size);
    await page.goto("/");
    await page.locator(".enhanced").waitFor();
    await page.evaluate(() => document.fonts.ready);
    const loadedFonts = await page.evaluate(() =>
      [...document.fonts]
        .filter((font) => font.status === "loaded")
        .map((font) => font.family)
        .join(" "),
    );
    expect(loadedFonts.replaceAll("_", " ")).toContain("Cormorant Garamond");
    expect(loadedFonts.replaceAll("_", " ")).toContain("DM Sans");
    const button = page.getByRole("button", { name: "BUKA UNDANGAN" });
    await expect(button).toBeVisible();
    const box = await button.boundingBox();
    expect(box!.y + box!.height).toBeLessThanOrEqual(size.height);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    const note = await page.locator(".preview-note").boundingBox();
    expect(box!.y + box!.height).toBeLessThan(note!.y);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.waitForTimeout(3500);
    await page.screenshot({ path: `${qaRoot}/cover-${size.width}.png` });
    await button.evaluate((el) =>
      el.addEventListener("click", () => performance.mark("cta-start"), {
        once: true,
      }),
    );
    await page.evaluate(() => {
      const observer = new MutationObserver(() => {
        if (document.querySelector(".phase-opened")) {
          performance.mark("hero-ready");
          observer.disconnect();
        }
      });
      observer.observe(document.querySelector(".invitation")!, {
        attributes: true,
        attributeFilter: ["class"],
      });
    });
    await button.click();
    await page.locator(".phase-opened").waitFor();
    const duration = await page.evaluate(
      () =>
        performance.getEntriesByName("hero-ready")[0].startTime -
        performance.getEntriesByName("cta-start")[0].startTime,
    );
    expect(duration).toBeGreaterThanOrEqual(3500);
    expect(duration).toBeLessThan(4000);
    console.log(`CTA ${size.width}: ${Math.round(duration)}ms`);
    await expect(page.locator("#hero-title")).toBeFocused();
    expect(await page.evaluate(() => scrollY)).toBe(0);
    const locationBox = await page
      .locator(".hero-copy .supporting")
      .boundingBox();
    const musicBox = await page.locator(".music-button").boundingBox();
    expect(
      locationBox!.y + locationBox!.height <= musicBox!.y ||
        locationBox!.y >= musicBox!.y + musicBox!.height,
    ).toBe(true);
    const leafBox = await page.locator(".countdown-leaves").boundingBox();
    const countdownLabel = await page
      .locator(".countdown .eyebrow")
      .boundingBox();
    expect(
      leafBox!.y + leafBox!.height,
      "countdown artwork must clear its label",
    ).toBeLessThan(countdownLabel!.y);
    expect(
      await page
        .locator("main section[id]")
        .evaluateAll((els) => els.map((e) => e.id)),
    ).toEqual([
      "opening",
      "hero",
      "our-story",
      "the-wedding",
      "venue",
      "gallery",
      "rsvp",
      "closing",
    ]);
    for (const id of [
      "hero",
      "our-story",
      "the-wedding",
      "venue",
      "gallery",
      "rsvp",
      "closing",
    ]) {
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      if (size.width === 390 || size.width === 1440)
        await page
          .locator("#" + id)
          .screenshot({ path: `${qaRoot}/${id}-${size.width}.png` });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        id,
      ).toBe(true);
      // Decorative scene edges may clip; readable headings must remain inside
      // the viewport instead of requiring a particular CSS overflow value.
      const headings = await page.locator("#" + id + " h1, #" + id + " h2").evaluateAll(nodes => nodes.map(node => {
        const box = node.getBoundingClientRect();
        return { left: box.left, right: box.right };
      }));
      expect(headings.every(box => box.left >= 0 && box.right <= size.width)).toBe(true);
    }
    await page.screenshot({
      path: `${qaRoot}/page-${size.width}.png`,
      fullPage: true,
    });
    await expect
      .poll(
        () =>
          page
            .locator("img")
            .evaluateAll((imgs) =>
              imgs.every(
                (i) =>
                  i instanceof HTMLImageElement &&
                  i.complete &&
                  i.naturalWidth > 0,
              ),
            ),
        { timeout: 15000 },
      )
      .toBe(true);
    expect(errors).toEqual([]);
  });
}

test("no navigation or pause UI; opening preserves invitation identity", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#invite=" + token);
  await page.locator(".enhanced").waitFor();
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await page.locator(".phase-opened").waitFor();
  await expect(page.locator(".menu-toggle, .invitation-header")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /navigasi/i })).toHaveCount(0);
  await expect(
    page.locator(
      "nav, .invitation-navigation, .motion-toggle, .page-motion-toggle",
    ),
  ).toHaveCount(0);
  await expect(page.getByRole("button", { name: /jeda animasi/i })).toHaveCount(
    0,
  );
  expect(new URL(page.url()).hash).toBe("#invite=" + token);
});

test("section choreography varies by material and reduced motion cancels active reveals", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".enhanced").waitFor();
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  const heroTitle = page.locator("#hero .hero-copy");
  await expect
    .poll(() => heroTitle.evaluate((el) => el.getAnimations().length))
    .toBeGreaterThan(0);
  await page.locator(".phase-opened").waitFor();
  expect(
    await heroTitle.evaluate((el) => Number(getComputedStyle(el).opacity)),
  ).toBeGreaterThanOrEqual(0.95);
  const below = page.locator(".letter");
  expect(await below.evaluate((el) => el.getAnimations().length)).toBe(0);
  await below.scrollIntoViewIfNeeded();
  await expect
    .poll(() => below.evaluate((el) => el.getAnimations().length))
    .toBeGreaterThan(0);
  const frames = await below.evaluate((el) =>
    (el.getAnimations()[0]?.effect as KeyframeEffect)?.getKeyframes(),
  );
  expect(frames?.[0].translate).toMatch(/^0(?:px)? 64px$/);
  expect(frames?.at(-1)?.rotate).toBe("-3deg");
  await page.screenshot({ path: `${qaRoot}/story-reveal.png` });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(below).toHaveCSS("opacity", "1");
  expect(await below.evaluate((el) => el.getAnimations().length)).toBe(0);
});

test("changing reduced motion preference completes cover artwork immediately", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".enhanced").waitFor();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".motion-toggle")).toHaveCount(0);
  expect(
    await page
      .locator(".cover-art img")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".cover-content .monogram")
      .evaluate((el) => getComputedStyle(el).opacity),
  ).toBe("1");
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await page.locator(".phase-opened").waitFor();
  await expect(page.locator("#hero-title")).toBeFocused();
});
test("keyboard Enter and Space, early activation, duplicate activation and stopped animations", async ({
  page,
}) => {
  for (const key of ["Enter", "Space"]) {
    await page.goto("/");
    await page.locator(".enhanced").waitFor();
    const b = page.getByRole("button", { name: "BUKA UNDANGAN" });
    await b.focus();
    expect(await b.evaluate((e) => getComputedStyle(e).outlineStyle)).not.toBe(
      "none",
    );
    await b.press(key);
    await page.evaluate(() =>
      document.getAnimations().forEach((a) => a.cancel()),
    );
    await page.locator(".phase-opened").waitFor();
    await expect(page.locator("#hero-title")).toBeFocused();
  }
  await page.goto("/");
  await page.locator(".enhanced").waitFor();
  await page.locator(".open-button").evaluate((e: HTMLButtonElement) => {
    e.click();
    e.click();
    e.click();
  });
  await page.locator(".phase-opened").waitFor();
  await expect(page.locator("#hero")).toBeVisible();
});
test("touch activation", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(process.env.QA_BASE_URL || "http://127.0.0.1:3000");
  await page.locator(".enhanced").waitFor();
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).tap();
  await page.locator(".phase-opened").waitFor();
  await expect(page.locator("#hero-title")).toBeFocused();
  await context.close();
});
test("reduced motion and accessibility scan", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".enhanced").waitFor();
  expect(
    await page
      .locator(".cover-art img")
      .first()
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  const cover = await new AxeBuilder({ page }).analyze();
  expect(cover.violations).toEqual([]);
  await page.evaluate(() => {
    document.querySelector('.open-button')!.addEventListener('click', () => performance.mark('reduced-start'), { once: true });
    const observer = new MutationObserver(() => {
      if (document.querySelector('.phase-opened')) {
        performance.mark('reduced-ready');
        observer.disconnect();
      }
    });
    observer.observe(document.querySelector('.invitation')!, { attributes: true, attributeFilter: ['class'] });
  });
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await page.locator(".phase-opened").waitFor();
  const reducedDuration = await page.evaluate(() => performance.getEntriesByName('reduced-ready')[0].startTime - performance.getEntriesByName('reduced-start')[0].startTime);
  expect(reducedDuration).toBeLessThan(600);
  console.log(`Reduced-motion transition: ${Math.round(reducedDuration)}ms`);
  const opened = await new AxeBuilder({ page }).analyze();
  await page.getByRole("radio", { name: "Attending", exact: true }).check();
  const selected = await new AxeBuilder({ page }).analyze();
  writeFileSync(
    `${qaRoot}/axe.json`,
    JSON.stringify(
      {
        cover: cover.violations,
        opened: opened.violations,
        selected: selected.violations,
      },
      null,
      2,
    ),
  );
  expect(opened.violations).toEqual([]);
  expect(selected.violations).toEqual([]);
});
test("no JavaScript native cover form opens invitation", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(process.env.QA_BASE_URL || "http://127.0.0.1:3000");
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await expect(page).toHaveURL(/open=1/);
  await expect(page.locator("#hero")).toBeVisible();
  await expect(page.locator("#closing")).toBeVisible();
  await context.close();
});
test("RSVP retains selection on error and only confirms server success (mock transport)", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#invite=" + token);
  await page.locator(".enhanced").waitFor();
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await page.locator(".phase-opened").waitFor();
  const attending = page.getByRole("radio", { name: "Attending", exact: true });
  await attending.check();
  await page.route("**/api/rsvp", (route) =>
    route.fulfill({ status: 503, json: { status: "unavailable" } }),
  );
  await page.getByRole("button", { name: "KIRIM JAWABAN" }).click();
  await expect(page.getByRole("status")).toContainText("belum tersedia");
  await expect(attending).toBeChecked();
  await page.route("**/api/rsvp", (route) =>
    route.fulfill({ status: 404, json: { status: "invalid_invitation" } }),
  );
  await page.getByRole("button", { name: "KIRIM JAWABAN" }).click();
  await expect(page.getByRole("status")).toContainText("tidak dapat digunakan");
  await page.route("**/api/rsvp", async (route) => {
    await new Promise((r) => setTimeout(r, 200));
    await route.fulfill({
      status: 200,
      json: { status: "accepted", response: "attending" },
    });
  });
  await page.getByRole("button", { name: "KIRIM JAWABAN" }).click();
  await expect(page.getByRole("button", { name: "MENGIRIM…" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("telah diterima");
  await expect(attending).toBeDisabled();
});
test("already-submitted response shows authoritative final choice (mock transport)", async ({
  page,
}) => {
  await page.goto("/?open=1#invite=" + token);
  await page.getByRole("radio", { name: "Attending", exact: true }).check();
  await page.route("**/api/rsvp", (route) =>
    route.fulfill({
      status: 200,
      json: { status: "already_submitted", response: "unable_to_attend" },
    }),
  );
  await page.getByRole("button", { name: "KIRIM JAWABAN" }).click();
  await expect(
    page.getByRole("radio", { name: "Unable to Attend" }),
  ).toBeChecked();
  await expect(page.getByRole("status")).toContainText("tidak dapat diubah");
});
test("real API rejects anonymous export, foreign origins, malformed input and disabled backend", async ({
  request,
}) => {
  expect((await request.get("/api/operator/export")).status()).toBe(401);
  expect(
    (
      await request.post("/api/rsvp", {
        data: { token, response: "attending" },
        headers: { origin: "https://other.test" },
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/rsvp", {
        data: { token, response: "maybe" },
        headers: { origin: process.env.QA_BASE_URL || "http://127.0.0.1:3000" },
      })
    ).status(),
  ).toBe(404);
  expect(
    (
      await request.post("/api/rsvp", {
        data: { token, response: "attending" },
        headers: { origin: process.env.QA_BASE_URL || "http://127.0.0.1:3000" },
      })
    ).status(),
  ).toBe(503);
});
