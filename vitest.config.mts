import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    // tests/ Playwright'a ait (playwright.config.ts: testDir: './tests') —
    // dahil edilirse vitest onun test.describe() cagrilarini kendi test
    // runner'iyla calistirmaya calisiyor ve "Playwright Test did not expect
    // test.describe() to be called here" hatasiyla tum suite'i patlatiyordu.
    exclude: ['node_modules', '.next', 'tests'],
    // Bazı modüller (lib/mongodb.ts) import edildiği anda MONGODB_URI'nin
    // tanımlı olmasını zorunlu kılıyor — testler gerçek bir bağlantı
    // kurmuyor, bu sadece o "tanımlı mı?" kontrolünü geçmek için (CI'daki
    // build adımıyla aynı yaklaşım).
    env: {
      MONGODB_URI: 'mongodb+srv://test:test@test.example.com/test',
      JWT_SECRET: 'test-dummy-jwt-secret-not-used-at-runtime',
    },
  },
});
