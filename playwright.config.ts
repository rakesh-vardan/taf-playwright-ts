import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    baseURL: 'https://seleniumpom8.wordpress.com',
    browserName: 'chromium',
    headless: false
  },
});
