const { test, expect } = require('@playwright/test');

test('mock liff and open profile page', async ({ page }) => {
  // Inject a mocked liff object before any script runs
  await page.addInitScript(() => {
    window.liff = {
      init: async () => {},
      getIDToken: () => 'test-id-token',
      getProfile: async () => ({ userId: 'U12345', displayName: 'E2E User', pictureUrl: '' }),
    };
  });

  await page.goto('http://localhost:3000/profile');
  // basic check: page loads and contains profile header or form
  await expect(page).toHaveTitle(/Digital Health|หน้าหลัก|Profile/i);
});
