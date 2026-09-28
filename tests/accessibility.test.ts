import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// WCAG 2.1 AA taraması — formu olan, trafiği yüksek sayfalardan başlıyoruz.
// Yeni bir sayfa eklerken PAGES listesine path'ini eklemek yeterli.
const PAGES = ['/', '/bize-sat', '/bize-sat/notebook', '/search', '/register'];

for (const path of PAGES) {
  test(`a11y: ${path} WCAG 2.1 AA ihlali içermiyor`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (results.violations.length > 0) {
      const summary = results.violations
        .map((v) => `- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} öğe)`)
        .join('\n');
      console.log(`\n${path} erişilebilirlik ihlalleri:\n${summary}`);
    }

    expect(results.violations).toEqual([]);
  });
}
