const { devices } = require('@playwright/test');

module.exports = {
  testDir: './e2e',
  timeout: 30 * 1000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
};
