import { defineConfig, devices } from '@playwright/test';

/**
 * Bez tego pliku job "E2E smoke" w quality.yml pomijal sie po cichu
 * (`if: hashFiles('playwright.config.ts', ...) != ''`), wiec zielona bramka
 * nie byla zadnym dowodem, ze logika PWA w index.html dziala.
 *
 * Serwujemy statyczny katalog, bo to nie jest projekt z bundlerem —
 * service worker i manifest wymagaja prawdziwego origin http, nie file://.
 */
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Lokalnie (nie-CI) Playwright domyslnie odpala tyle Chromium naraz, ile
  // rdzeni ma maszyna. Na skromniejszym/wirtualizowanym sprzecie to znaczy
  // rownoczesny start 6 przegladarek, co obserwowalnie konczy sie bledem
  // "Test timeout ... while setting up 'page'" dla wiekszosci testow (zmierzone:
  // domyslne workers -> 6/7 failed; workers: 1 -> 7/7 passed w 30.7s). CI ma
  // wlasny, przewidywalny runner, wiec tam zostaje pelna rownoleglosc.
  workers: process.env.CI ? undefined : 1,
  reporter: 'line',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm start',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
