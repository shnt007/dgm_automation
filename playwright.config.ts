import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/testsuite/tests',
  fullyParallel: true,
  reporter: [['list'], ['monocart-reporter', { open: 'never', outputFile:'test-results/index.html'}
  ]],
  timeout: 30000,

  use: {
    baseURL: 'https://dgm-mis-stage.k8s.yipl.com.np',
    viewport: null,
    headless: false,
    // viewport: { width: 1366, height: 944 },

    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--start-maximized'],
        },
      }
    }
  ]
})