import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  reporter: [
    ["list"],
    [
      "json",
      {
        outputFile: `${process.env.QA_ROOT || "docs/qa/nature-editorial"}/browser-results.json`,
      },
    ],
  ],
  use: {
    baseURL: process.env.QA_BASE_URL || "http://127.0.0.1:3000",
    viewport: { width: 390, height: 844 },
    trace: "retain-on-failure",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    },
  },
});
