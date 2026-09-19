#!/usr/bin/env node

const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3000/api';
const results = [];

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const handler = options.protocol === 'https' ? https : http;
    const req = handler.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

function parseUrl(url) {
  const u = new URL(url);
  const isHttps = u.protocol === 'https:';
  return {
    protocol: isHttps ? 'https' : 'http',
    hostname: u.hostname,
    port: parseInt(u.port) || (isHttps ? 443 : 80),
    path: u.pathname + u.search,
    isHttps: isHttps
  };
}

async function test(name, method, path, data = null) {
  try {
    const parsed = parseUrl(`${BASE_URL}${path}`);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.path,
      method,
      headers: { 'Content-Type': 'application/json' },
      protocol: parsed.isHttps ? 'https:' : 'http:'
    };
    const handler = parsed.isHttps ? https : http;
    const res = await new Promise((resolve, reject) => {
      const req = handler.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, headers: res.headers, body: body ? JSON.parse(body) : null });
          } catch (e) {
            resolve({ status: res.statusCode, headers: res.headers, body });
          }
        });
      });
      req.on('error', reject);
      if (data) req.write(JSON.stringify(data));
      req.end();
    });
    const pass = res.status >= 200 && res.status < 400;
    const result = {
      name,
      method,
      path,
      status: res.statusCode,
      pass: pass ? '✅' : '❌'
    };
    results.push(result);
    console.log(`${result.pass} [${res.statusCode}] ${method} ${path}`);
    return res;
  } catch (err) {
    const result = { name, method, path, status: 'ERROR', pass: '❌', error: err.message };
    results.push(result);
    console.log(`❌ [ERROR] ${method} ${path} - ${err.message}`);
  }
}

async function runTests() {
  console.log('\n🧪 Backend API Tests\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Categories
  console.log('📂 Categories:');
  await test('Get Categories', 'GET', '/categories');

  // Auth
  console.log('\n🔐 Authentication:');
  const registerRes = await test('Register User', 'POST', '/auth/register', {
    email: `test-${Date.now()}@example.com`,
    password: 'Test123!@',
    passwordConfirm: 'Test123!@',
    name: 'Test User'
  });

  await test('Login User', 'POST', '/auth/login', {
    email: 'test@example.com',
    password: 'Test123!@'
  });

  await test('Get Current User', 'GET', '/auth/me');
  await test('Logout User', 'POST', '/auth/logout');

  // Users
  console.log('\n👤 Users:');
  await test('Get User Profile', 'GET', '/users/1');
  await test('Update User Profile', 'PATCH', '/users/profile', {
    phone: '+905555555555',
    bio: 'Test bio'
  });

  // Listings
  console.log('\n📋 Listings:');
  const listingRes = await test('Create Listing', 'POST', '/listings', {
    title: 'Test RAM 16GB',
    description: 'DDR4 Gaming RAM',
    price: 2500,
    category: 'ram',
    condition: 'used',
    images: [],
    contactMethod: 'whatsapp',
    phone: '+905555555555'
  });

  await test('Get All Listings', 'GET', '/listings?category=ram&limit=10');
  await test('Get Listing by ID', 'GET', '/listings/1');
  await test('Search Listings', 'GET', '/listings/search?q=RAM');
  await test('Update Listing', 'PATCH', '/listings/1', {
    price: 2800,
    description: 'Updated'
  });
  await test('Delete Listing', 'DELETE', '/listings/1');

  // Offers
  console.log('\n💬 Offers:');
  await test('Create Offer', 'POST', '/offers', {
    listingId: '1',
    offeredPrice: 2000,
    message: 'Biraz daha ucuz olabilir mi?'
  });

  await test('Get My Offers', 'GET', '/offers/my-offers');
  await test('Accept Offer', 'PATCH', '/offers/1/accept', {
    message: 'Kabul ediyorum'
  });
  await test('Reject Offer', 'PATCH', '/offers/1/reject', {
    reason: 'Başka birini seçtim'
  });
  await test('Counter Offer', 'POST', '/offers/1/counter', {
    counterPrice: 2300,
    message: 'Bu fiyata anlaşalım'
  });

  // Admin
  console.log('\n⚙️  Admin:');
  await test('Get Admin Users', 'GET', '/admin/users?limit=20');
  await test('Get Admin Listings', 'GET', '/admin/listings?status=pending');
  await test('Get Admin Stats', 'GET', '/admin/stats');
  await test('Approve Listing', 'PATCH', '/admin/listings/1/approve', {});
  await test('Reject Listing', 'PATCH', '/admin/listings/1/reject', {
    reason: 'Kuralları ihlal ediyor'
  });

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  const passed = results.filter(r => r.pass === '✅').length;
  const failed = results.filter(r => r.pass === '❌').length;
  const passRate = Math.round((passed / results.length) * 100);

  console.log(`📊 Results:`);
  console.log(`   Total: ${results.length}`);
  console.log(`   Passed: ${passed} ✅`);
  console.log(`   Failed: ${failed} ❌`);
  console.log(`   Pass Rate: ${passRate}%\n`);

  // Issues
  const errors = results.filter(r => r.pass === '❌');
  if (errors.length > 0) {
    console.log('🔴 Failed Endpoints:');
    errors.forEach(e => {
      console.log(`   [${e.status || 'ERROR'}] ${e.method} ${e.path}`);
    });
    console.log('');
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
