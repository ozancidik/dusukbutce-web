#!/usr/bin/env node
/**
 * Tüm sayfaları (app/**\/page.tsx) gerçek bir tarayıcıda (Playwright) tek tek
 * gezip konsol hatalarını, yakalanmamış exception'ları ve /api/* isteklerindeki
 * 4xx/5xx yanıtları toplar. Bu script, admin sayfalarının bir kısmının
 * `adminToken`'ı hiç göndermediği (her zaman 401) bir bug sınıfını yakalamak
 * için yazıldı — CI değil, elle çalıştırılan bir denetim aracı.
 *
 * SADECE LOCAL DEV'E KARŞI ÇALIŞTIRIN. Local .env.local aynı DB'yi kullanıyor
 * (prod ile paylaşımlı) — bu script veri YAZMAZ, sadece okur/gezinir, ama
 * yine de BASE_URL'i production'a çevirmeyin.
 *
 * Kullanım:
 *   CRAWL_ADMIN_EMAIL=admin@dusukbutce.com CRAWL_ADMIN_PASSWORD=... \
 *   CRAWL_CUSTOMER_EMAIL=<gerçek-müşteri-email> CRAWL_CUSTOMER_PASSWORD=... \
 *   node scripts/crawl-audit.mjs
 *
 * Admin/müşteri hesabı verilmezse ilgili auth gerektiren sayfalar atlanır
 * (yine de ziyaret edilir, sadece 401'ler beklenen sonuç olarak işaretlenmez).
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.join(__dirname, '..', 'app');
const BASE = process.env.CRAWL_BASE_URL || 'http://localhost:3000';

const ADMIN_EMAIL = process.env.CRAWL_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.CRAWL_ADMIN_PASSWORD;
const CUSTOMER_EMAIL = process.env.CRAWL_CUSTOMER_EMAIL;
const CUSTOMER_PASSWORD = process.env.CRAWL_CUSTOMER_PASSWORD;

function findPageRoutes(dir, prefix = '') {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'api') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...findPageRoutes(full, `${prefix}/${entry.name}`));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      routes.push(prefix || '/');
    }
  }
  return routes;
}

async function realLogin(page, { csrfUrl, loginUrl, email, password, extraBody = {} }) {
  const csrfRes = await page.evaluate(async (url) => {
    const r = await fetch(url);
    return r.json();
  }, csrfUrl);
  const csrfToken = csrfRes.csrfToken || csrfRes.token;

  return page.evaluate(
    async ({ url, email, password, csrfToken, extraBody }) => {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, csrfToken, ...extraBody }),
      });
      return { status: r.status, body: await r.json() };
    },
    { url: loginUrl, email, password, csrfToken, extraBody }
  );
}

async function visitRoute(context, url, settleMs) {
  const routePage = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const badRequests = [];

  routePage.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text().slice(0, 300));
  });
  routePage.on('pageerror', (err) => pageErrors.push(String(err).slice(0, 300)));
  routePage.on('response', (res) => {
    const reqUrl = res.url();
    if (reqUrl.includes('/api/') && res.status() >= 400) {
      badRequests.push(`${res.status()} ${reqUrl.replace(BASE, '')}`);
    }
  });

  // 'networkidle' is unreliable against the Next.js dev server: its HMR
  // websocket never goes idle, which makes Playwright's wait flaky.
  // 'load' + a fixed settle delay is reliable here.
  let navError = null;
  try {
    await routePage.goto(url, { waitUntil: 'load', timeout: 20000 });
    await routePage.waitForTimeout(settleMs);
  } catch (e) {
    navError = String(e).slice(0, 300);
  }

  await routePage.close();
  return { navError, consoleErrors, pageErrors, badRequests };
}

async function main() {
  const routes = findPageRoutes(APP_DIR)
    .filter((r) => !r.includes('['))
    .sort();

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(BASE, { waitUntil: 'domcontentloaded' });

  let adminToken = null;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const res = await realLogin(page, {
      csrfUrl: '/api/auth/csrf-token',
      loginUrl: '/api/admin/auth',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    if (res.status !== 200) {
      console.error('❌ Admin login failed:', res);
    } else {
      adminToken = res.body.token;
      console.log('✓ admin login OK');
    }
  } else {
    console.log('ℹ CRAWL_ADMIN_EMAIL/PASSWORD not set — admin pages will show 401s as-is.');
  }

  let customerLoggedIn = false;
  if (CUSTOMER_EMAIL && CUSTOMER_PASSWORD) {
    const res = await realLogin(page, {
      csrfUrl: '/api/auth/csrf-token',
      loginUrl: '/api/auth/login',
      email: CUSTOMER_EMAIL,
      password: CUSTOMER_PASSWORD,
    });
    if (res.status !== 200) {
      console.error('❌ Customer login failed:', res);
    } else {
      customerLoggedIn = true;
      console.log('✓ customer login OK (real httpOnly cookie set)');
    }
  } else {
    console.log('ℹ CRAWL_CUSTOMER_EMAIL/PASSWORD not set — customer pages will show 401s as-is.');
  }

  // Root cause of the flakiness this script had while it seeded localStorage
  // with a one-off page.evaluate() on a single page: each route was visited
  // in a FRESH tab (context.newPage()), and a brand-new tab doesn't always
  // have the context's localStorage synced by the time the app's own script
  // runs — confirmed by a server-side debug log showing the literal string
  // "null" arrive as the bearer token on the flaky runs. addInitScript()
  // runs before ANY page script on every new document in this context, so
  // it eliminates the race instead of racing it with a longer wait.
  await context.addInitScript(
    ({ adminToken, customerLoggedIn, customerEmail }) => {
      if (adminToken) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminToken', adminToken);
      }
      if (customerLoggedIn) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', customerEmail);
        localStorage.setItem('userId', 'crawl-audit'); // most pages only gate on presence
        localStorage.setItem('userName', 'Crawl Audit');
      }
    },
    { adminToken, customerLoggedIn, customerEmail: CUSTOMER_EMAIL }
  );

  const results = [];

  // A fresh page (tab) per route — same context, so cookies/localStorage
  // carry over — completely avoids a real bug found while writing this:
  // reusing one page's listeners let a slow-resolving fetch from the
  // PREVIOUS route's page attribute its response to the NEXT route (visible
  // as e.g. /admin/fiyat reporting /api/admin/categories's error text).
  for (const route of routes) {
    const url = BASE + route;

    // First-time visits can race the Next.js dev server's on-demand
    // (Turbopack) route compilation — a cold route can take longer than the
    // settle delay to hydrate and fire its data fetch. One retry with a
    // longer settle time distinguishes real bugs from this dev-only flake;
    // confirmed the underlying cause by re-testing "failing" routes in
    // isolation immediately afterward, where they always passed once warm.
    let attempt = await visitRoute(context, url, 800);
    if (attempt.navError || attempt.consoleErrors.length || attempt.pageErrors.length || attempt.badRequests.length) {
      attempt = await visitRoute(context, url, 2500);
    }

    results.push({ route, ...attempt });
    const flag = attempt.navError || attempt.consoleErrors.length || attempt.pageErrors.length || attempt.badRequests.length ? '❌' : '✅';
    console.log(`${flag} ${route}`);
  }

  await browser.close();

  const broken = results.filter(
    (r) => r.navError || r.consoleErrors.length || r.pageErrors.length || r.badRequests.length
  );
  console.log(`\n\n=== ${broken.length} / ${results.length} routes had issues ===\n`);
  for (const r of broken) {
    console.log(`\n--- ${r.route} ---`);
    if (r.navError) console.log('  nav error:', r.navError);
    for (const e of r.consoleErrors) console.log('  console:', e);
    for (const e of r.pageErrors) console.log('  pageerror:', e);
    for (const e of r.badRequests) console.log('  bad request:', e);
  }

  process.exit(broken.length > 0 ? 1 : 0);
}

main();
