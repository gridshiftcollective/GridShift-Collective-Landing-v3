import { test, expect } from '@playwright/test';

test('logo-to-title size ratio is reasonable', async ({ page }) => {
  await page.goto('/');
  const heroLogo = await page.locator('img[alt="GridShift"]').first();
  const navLogo = await page.locator('img[alt="GridShift Logo"]').first();
  const headline = await page.locator('h1').first();

  const heroBox = await heroLogo.boundingBox();
  const navBox = await navLogo.boundingBox();
  const headlineBox = await headline.boundingBox();

  expect(heroBox).not.toBeNull();
  expect(navBox).not.toBeNull();
  expect(headlineBox).not.toBeNull();

  // Ensure hero logo is at least 10% of headline height and not larger than 60%
  const heroRatio = heroBox!.height / headlineBox!.height;
  expect(heroRatio).toBeGreaterThan(0.1);
  expect(heroRatio).toBeLessThan(0.7);

  // Ensure nav logo is smaller than hero logo
  const navRatio = navBox!.height / heroBox!.height;
  expect(navRatio).toBeLessThan(0.9);
});


