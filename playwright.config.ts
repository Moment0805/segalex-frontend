import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./scripts",
  testMatch: "**/*.spec.ts",
  timeout: 45000,
  use: {
    baseURL: "http://localhost:3000",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "Desktop 1440",
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "Tablet 768",
      use: {
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "Mobile 375",
      use: {
        viewport: { width: 375, height: 812 },
      },
    },
  ],
});

