import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const ROUTES = [
  { path: "/", slug: "homepage" },
  { path: "/properties", slug: "properties" },
  { path: "/property/prop-3", slug: "property-detail" },
  { path: "/agents", slug: "agents" },
  { path: "/packages", slug: "packages" },
  { path: "/how-verification-works", slug: "how-verification-works" },
  { path: "/about", slug: "about" },
  { path: "/contact", slug: "contact" },
  { path: "/scope", slug: "scope" },
  { path: "/agent", slug: "agent-dashboard" },
  { path: "/agent/listings/new", slug: "agent-new-listing" },
  { path: "/admin/agents", slug: "admin-agents" },
  { path: "/admin/documents", slug: "admin-documents" },
];

test.beforeAll(async () => {
  const dir = path.join(process.cwd(), "audit-screenshots");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

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

for (const route of ROUTES) {
  test(`Audit visual & layout on ${route.slug} (${route.path})`, async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        const text = msg.text();
        if (!text.includes("tile.openstreetmap.org") && !text.includes("favicon.ico")) {
          consoleErrors.push(text);
        }
      }
    });

    page.on("response", (resp) => {
      if (resp.status() >= 400 && !resp.url().includes("tile.openstreetmap.org") && !resp.url().includes("favicon.ico")) {
        failedRequests.push(`${resp.status()} ${resp.url()}`);
      }
    });

    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Assert zero console errors
    expect(
      consoleErrors,
      `Console errors found on ${route.path}: ${consoleErrors.join("; ")} | Failed requests: ${failedRequests.join(", ")}`
    ).toHaveLength(0);

    // Assert no horizontal page overflow
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(overflow, `Horizontal overflow detected on ${route.path} at width ${page.viewportSize()?.width}`).toBe(false);

    // Capture screenshot
    const width = page.viewportSize()?.width || 1440;
    const screenshotPath = path.join(process.cwd(), "audit-screenshots", `${route.slug}-${width}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
  });
}

// ----------------------------------------------------
// Automated Demo Journeys
// ----------------------------------------------------

test("Journey 1: Buyer enquiry on Ibeju-Lekki listing", async ({ page }) => {
  await page.goto("/property/prop-3", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Check Documents Checked badge exists
  await expect(page.locator("text=Documents Checked").first()).toBeVisible();

  // Fill sticky agent enquiry form
  await page.fill('input[placeholder="Your Full Name *"]', "Emeka Okafor");
  await page.fill('input[placeholder="Email Address *"]', "emeka@example.com");
  await page.fill('input[placeholder="Phone Number (e.g. +234...)"]', "+234 803 123 4567");

  // Click Send Enquiry
  await page.click('button:has-text("Send Enquiry")');

  // Verify confirmation appears in DOM
  await expect(page.locator("text=Enquiry Successfully Sent!")).toBeVisible({ timeout: 6000 });
});

test("Journey 2: Agent registration wizard complete walkthrough", async ({ page }) => {
  await page.goto("/agent/register", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Fill Step 1
  await page.fill('input[placeholder="e.g. Tolu Ogunlesi"]', "Alaba Peters");
  await page.fill('input[placeholder="e.g. Crown Ridge Properties Ltd"]', "Apex Realty Partners");
  await page.fill('input[placeholder="name@agency.ng"]', "alaba@apexrealty.ng");
  await page.fill('input[placeholder="+234 803 000 0000"]', "+234 802 333 4455");
  await page.fill('input[placeholder="2348030000000"]', "2348023334455");

  // Next to Step 2
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(400);

  // Step 2 visible
  await expect(page.locator("text=2. Regulatory Certificates")).toBeVisible();
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(400);

  // Step 3 visible and submit
  await expect(page.locator("text=3. Operating Scope")).toBeVisible();
  await page.click('button:has-text("Submit for Verification")');
  await page.waitForTimeout(800);

  // Verify confirmation
  await expect(page.locator("text=Application Under Review")).toBeVisible();
});

test("Journey 3: Admin agent inspection & approval", async ({ page }) => {
  await page.goto("/admin/agents", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Confirm admin agent directory loaded
  await expect(page.locator("text=Agent Accreditation & Verification Queue")).toBeVisible();

  // Find approve button if any pending agent
  const approveBtn = page.locator('button:has-text("Approve")').first();
  if (await approveBtn.isVisible()) {
    await approveBtn.click();
    await page.waitForTimeout(500);
  }
});

test("Journey 4: Admin cadastral split-screen inspection & badge check", async ({ page }) => {
  await page.goto("/admin/documents", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Confirm split-screen audit workstation loaded
  await expect(page.locator("text=Title Instruments Ready for Cadastral Verification")).toBeVisible();

  // Open split audit workstation modal
  const launchSplitBtn = page.locator('button:has-text("Launch Split Audit")').first();
  await expect(launchSplitBtn).toBeVisible();
  await launchSplitBtn.click();
  await page.waitForTimeout(800);

  // Verify modal opened with split view
  await expect(page.locator("text=Cadastral Split-Inspection Workstation")).toBeVisible();

  // Close modal
  await page.click('button[aria-label="Close split audit"]');
  await page.waitForTimeout(400);
});

test("Journey 5: Tier upgrade & Paystack modal interaction", async ({ page }) => {
  await page.goto("/packages", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(600);

  // Click Upgrade to Premium button
  const upgradeBtn = page.locator('button:has-text("Upgrade to Premium")').first();
  await expect(upgradeBtn).toBeVisible();
  await upgradeBtn.click();
  await page.waitForTimeout(600);

  // Verify Paystack checkout modal appears
  await expect(page.locator("text=Secured Checkout")).toBeVisible();

  // Dismiss modal
  await page.click('button[aria-label="Close Paystack modal"]');
  await page.waitForTimeout(400);
  await expect(page.locator("text=Secured Checkout")).not.toBeVisible();
});

test("Journey 6: Sponsored pop-up on Ibeju-Lekki search", async ({ page }) => {
  await page.goto("/properties?area=Ibeju-Lekki&sponsoredTrigger=true", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  // Check if Exclusive Sponsored Feature card appears
  const popup = page.locator("text=Exclusive Sponsored Feature").first();
  await expect(popup).toBeVisible();

  // Dismiss button test
  const dismissBtn = page.locator('button[aria-label="Dismiss sponsored card"]').first();
  await expect(dismissBtn).toBeVisible();
  await dismissBtn.click();
  await page.waitForTimeout(300);
  await expect(popup).not.toBeVisible();
});
