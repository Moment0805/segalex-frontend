import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 393, height: 852 } });

test.beforeEach(async ({ context }) => {
  await context.addCookies([
    {
      name: "proto_pass",
      value: "segalex2026",
      domain: "localhost",
      path: "/",
    },
  ]);
});

test("Admin overview mobile layout (iPhone 16 - 393x852)", async ({ page }) => {
  await page.goto("/admin", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Check that mobile top app bar is visible
  const mobileBar = page.locator('text=Admin Console').first();
  await expect(mobileBar).toBeVisible();

  // Check that hamburger menu toggle button is visible
  const menuBtn = page.locator('button[aria-label="Toggle admin navigation menu"]');
  await expect(menuBtn).toBeVisible();

  // Check that desktop sidebar is hidden
  const desktopAside = page.locator("aside.hidden.lg\\:flex");
  await expect(desktopAside).toBeHidden();

  // Check main content is full width and no horizontal overflow
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  expect(overflow, "No horizontal overflow").toBe(false);

  // Take screenshot of mobile admin overview
  await page.screenshot({ path: "audit-screenshots/admin-overview-mobile-393.png", fullPage: true });

  // Test opening the slide-over navigation drawer
  await menuBtn.click();
  await page.waitForTimeout(400);

  // Verify drawer is visible
  const drawerHeader = page.locator('text=Administrative Control').first();
  await expect(drawerHeader).toBeVisible();

  // Take screenshot of open mobile drawer
  await page.screenshot({ path: "audit-screenshots/admin-drawer-open-393.png" });

  // Close drawer
  const closeBtn = page.locator('button[aria-label="Close menu"]').first();
  await closeBtn.click();
  await page.waitForTimeout(300);
});

test("Admin agents mobile layout", async ({ page }) => {
  await page.goto("/admin/agents", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Check that mobile top app bar is visible
  await expect(page.locator('button[aria-label="Toggle admin navigation menu"]')).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: "audit-screenshots/admin-agents-mobile-393.png", fullPage: true });
});

test("Agent dashboard mobile layout", async ({ page }) => {
  await page.goto("/agent", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Check that mobile top app bar is visible
  await expect(page.locator('button[aria-label="Toggle agent navigation menu"]')).toBeVisible();

  // Take screenshot
  await page.screenshot({ path: "audit-screenshots/agent-dashboard-mobile-393.png", fullPage: true });
});

