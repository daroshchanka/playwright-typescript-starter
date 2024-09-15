import { PlaywrightTestConfig, devices, defineConfig } from '@playwright/test';
const ENV = process.env.ENV;

// have to define viewport, global ignored https://github.com/microsoft/playwright/issues/13673
const viewport = {
  width: 1920,
  height: 1080,
}

export default defineConfig({

  testDir: './src/test',

  /* Maximum time one test can run for. */
  timeout: 180 * 1000,
  expect: {
    timeout: 5000
  },
  reportSlowTests: {
    max: 5,
    threshold: 30 * 1000
  },
  outputDir: './output/test-results',

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never', outputFolder: './output/html' }],
    ['allure-playwright', { outputFolder: './output/allure-results' }],
    ['junit', { outputFile: './output/junit-results/results.xml' }]
  ],

  use: {
    viewport: viewport,
    screenshot: 'on',
    trace: 'on-first-retry',
    actionTimeout: 10000,
    locale: 'en-GB',
    launchOptions: {
      slowMo: 100,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: viewport, // have to define viewport
        channel: "chrome",
        headless: true,
        launchOptions: {
          args: ["--disable-dev-shm-usage", '--disable-blink-features=AutomationControlled'],
          ignoreDefaultArgs: ['--disable-component-extensions-with-background-pages'],
          slowMo: 100,
        }
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: viewport, // have to define viewport
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: viewport, // have to define viewport
      },
    },
  ],

});
