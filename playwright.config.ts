import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: { 
    baseURL: 'https://seleniumpom8.wordpress.com',
    browserName: 'chromium',
    headless: true
  },
  // projects: [
  //   {
  //     name: 'Google Chrome',
  //     use: { ...devices['Desktop Chrome'], channel: 'chrome' }
  //   },
  //   {
  //     name: 'Microsoft Edge',
  //     use: { ...devices['Desktop Edge'], channel: 'msedge' }
  //   },
  // ],
});
