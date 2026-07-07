import { test, expect } from "@playwright/test";

const SHOTS =
  "/private/tmp/claude-501/-Users-henrychen-Desktop-portfolio-site/26766726-62f8-405d-b297-57b84f986379/scratchpad";

test("home renders hero, experience, and project cards", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Hi, I'm Henry!", level: 1 })
  ).toBeVisible();
  await expect(page.getByText("Robotics Engineer & Entrepreneur")).toBeVisible();

  // Typo fixed
  await expect(page.locator("body")).toContainText("Student-Athlete");
  await expect(page.locator("body")).not.toContainText("Athelete");

  // Four experience entries
  await expect(page.locator(".timeline-item")).toHaveCount(4);

  // Three project cards linking to the right routes
  await expect(page.locator(".project-card")).toHaveCount(3);
  await expect(
    page.locator('a[href^="/projects/rubiks-cube"]')
  ).toBeVisible();
  await expect(page.locator('a[href="/projects/fitbox"]')).toBeVisible();
  await expect(
    page.locator('a[href="/projects/financial-derivatives"]')
  ).toBeVisible();

  await page.waitForTimeout(1700); // let the intro clear
  await page.screenshot({ path: `${SHOTS}/home.png`, fullPage: true });
});

test("footer preserves contact links", async ({ page }) => {
  await page.goto("/");
  const email = page.locator("a.email-icon");
  await expect(email).toHaveAttribute(
    "href",
    /mail\.google\.com.*henwchen@gmail\.com/
  );
  await expect(page.locator("a.linkedin-icon")).toHaveAttribute(
    "href",
    "https://linkedin.com/in/henry-w-chen"
  );
});

test("rubiks page: content, video, no timer", async ({ page }) => {
  await page.goto("/projects/rubiks-cube");
  await expect(page.locator("h1.shinkei-title")).toContainText(
    "Sub-second solves"
  );
  await expect(page.locator(".shinkei-stat")).toHaveCount(4);
  await expect(page.locator("video")).toHaveCount(1);
  // Timer removed
  await expect(page.locator("body")).not.toContainText("SOLVE TIME");
  // Resources preserved
  await expect(
    page.locator('.shinkei-links a[href*="youtube.com/shorts"]')
  ).toBeVisible();
  await page.waitForTimeout(1700);
  await page.screenshot({
    path: `${SHOTS}/rubiks.png`,
    fullPage: true,
  });
});

test("financial-derivatives page renders sections and resources", async ({
  page,
}) => {
  await page.goto("/projects/financial-derivatives");
  await expect(page.locator("h1.shinkei-title")).toContainText(
    "Complex mathematics"
  );
  await expect(page.locator(".shinkei-equation").first()).toBeVisible();
  await expect(page.locator(".shinkei-links a")).toHaveCount(3);
  await page.waitForTimeout(1700);
  await page.screenshot({ path: `${SHOTS}/derivatives.png`, fullPage: true });
});

test("fitbox page: dummy phone mockup + resources", async ({ page }) => {
  await page.goto("/projects/fitbox");
  await expect(page.locator("h1.shinkei-title")).toContainText(
    "portable workout"
  );
  await expect(page.getByRole("img", { name: "FitBox app mockup" })).toBeVisible();
  await expect(page.locator(".shinkei-links a")).toHaveCount(5);
  await page.waitForTimeout(1700);
  await page.screenshot({ path: `${SHOTS}/fitbox.png`, fullPage: true });
});

test("unknown URL shows the custom 404", async ({ page }) => {
  const res = await page.goto("/adlfj");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("This page doesn't exist")).toBeVisible();
  await page.screenshot({ path: `${SHOTS}/notfound.png` });
});
