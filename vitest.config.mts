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
    exclude: ['node_modules', '.next'],
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
