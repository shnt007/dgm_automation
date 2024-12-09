import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/testsuite/tests',
  fullyParallel: true,
  reporter: [['dot'], ['html', { open: 'never', outputFolder: 'test-results' }
  ]],
  timeout: 30000,

  use: {
    baseURL: 'https://dgm-mis-stage.k8s.yipl.com.np',
    viewport: null,
    headless: false,
    // viewport: { width: 1290, height: 768 },

    screenshot: 'on',
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