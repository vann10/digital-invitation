import { test, expect } from "@playwright/test";

test("failed audio download can be retried without reopening the invitation", async ({ page }) => {
  await page.route("**/audio/**", (route) => route.abort("failed"));
  await page.goto("/");
  await page.locator(".enhanced").waitFor();
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await expect(page.locator(".music-error")).toBeVisible();
  await page.locator(".phase-opened").waitFor();
  await page.unroute("**/audio/**");
  await page.getByRole("button", { name: "Putar musik" }).click();
  await expect.poll(() => page.locator("audio").evaluate((el: HTMLAudioElement) => el.currentTime)).toBeGreaterThan(0);
  await expect(page.locator(".music-error")).toHaveCount(0);
});

test("music is gesture-started, plays real audio, stops at zero and can restart by keyboard", async ({
  page,
}) => {
  const audioRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/audio/")) audioRequests.push(request.url());
  });
  await page.goto("/");
  await page.locator(".enhanced").waitFor();
  await expect(page.locator(".music-control")).toHaveCount(0);
  expect(audioRequests).toEqual([]);
  expect(
    await page.locator("audio").evaluate((el: HTMLAudioElement) => el.paused),
  ).toBe(true);
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await expect(
    page.getByRole("button", { name: "Hentikan musik" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.locator("audio").evaluate((el: HTMLAudioElement) => el.currentTime),
    )
    .toBeGreaterThan(0);
  expect(
    await page.locator("audio").evaluate((el: HTMLAudioElement) => el.duration),
  ).toBeGreaterThan(30);
  await page.getByRole("button", { name: "Hentikan musik" }).click();
  expect(
    await page
      .locator("audio")
      .evaluate((el: HTMLAudioElement) => ({
        paused: el.paused,
        time: el.currentTime,
      })),
  ).toEqual({ paused: true, time: 0 });
  const play = page.getByRole("button", { name: "Putar musik" });
  await play.focus();
  await play.press("Enter");
  await expect(
    page.getByRole("button", { name: "Hentikan musik" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(audioRequests.length).toBeGreaterThan(0);
});

test("blocked playback leaves invitation usable and offers a real retry", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    let first = true;
    HTMLMediaElement.prototype.play = function () {
      if (first) {
        first = false;
        return Promise.reject(
          new DOMException("Blocked for test", "NotAllowedError"),
        );
      }
      return play.call(this);
    };
  });
  await page.goto("/");
  await page.locator(".enhanced").waitFor();
  await page.getByRole("button", { name: "BUKA UNDANGAN" }).click();
  await page.locator(".phase-opened").waitFor();
  await expect(page.locator("#hero-title")).toBeFocused();
  await expect(page.locator(".music-error")).toContainText(
    "Musik belum dapat diputar",
  );
  await page.getByRole("button", { name: "Putar musik" }).click();
  await expect(
    page.getByRole("button", { name: "Hentikan musik" }),
  ).toBeVisible();
  await expect(page.locator(".music-error")).toHaveCount(0);
});

test("direct opened link stays silent until the play control is activated", async ({
  page,
}) => {
  await page.goto("/?open=1");
  await expect(page.getByRole("button", { name: "Putar musik" })).toBeVisible();
  expect(
    await page.locator("audio").evaluate((el: HTMLAudioElement) => el.paused),
  ).toBe(true);
  await page.getByRole("button", { name: "Putar musik" }).click();
  await expect(
    page.getByRole("button", { name: "Hentikan musik" }),
  ).toBeVisible();
});
