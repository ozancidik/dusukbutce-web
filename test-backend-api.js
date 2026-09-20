#!/usr/bin/env node

const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3000/api';
const results = [];
let authToken = null;

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

let csrfToken = null;
let csrfCookie = null;

async function test(name, method, path, data = null, options = {}) {
  try {
    const parsed = parseUrl(`${BASE_URL}${path}`);

    // Build cookie header
    let cookieHeader = authToken ? `auth-token=${authToken}` : '';
    if (csrfCookie) {
      cookieHeader = cookieHeader ? `${cookieHeader}; ${csrfCookie}` : csrfCookie;
    }

    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { 'Cookie': cookieHeader }),
        ...(options.headers || {})
      },
      protocol: parsed.isHttps ? 'https:' : 'http:'
    };

    const handler = parsed.isHttps ? https : http;
    const res = await new Promise((resolve, reject) => {
      const req = handler.request(reqOptions, (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              cookies: res.headers['set-cookie'] || [],
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

    // Extract CSRF token from cookies if present
    if (res.cookies && res.cookies.length > 0) {
      const setCookies = res.cookies.join('; ');
      if (setCookies.includes('csrf-token=')) {
        csrfCookie = res.cookies.find(c => c.includes('csrf-token='));
        const tokenMatch = csrfCookie.match(/csrf-token=([^;]+)/);
        if (tokenMatch) csrfToken = tokenMatch[1];
      }
    }

    // Extract auth token from Set-Cookie if login was successful
    if (method === 'POST' && path.includes('/auth/login') && res.status === 200) {
      const setCookie = res.cookies.find(cookie => cookie.includes('auth-token='));
      if (setCookie) {
        authToken = setCookie.split('auth-token=')[1].split(';')[0];
      }
    }

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

  // Auth - Get CSRF Token first
  console.log('\n🔐 Authentication:');
  await test('Get CSRF Token', 'GET', '/auth/csrf-token');

  // Auth - Register
  const timestamp = Date.now();
  const uniquePhone = `555${Math.floor(1000000 + Math.random() * 9000000)}`.slice(0, 11);
  const registerData = {
    email: `test-${timestamp}@example.com`,
    password: 'testPassword123!',
    firstName: 'Test',
    lastName: 'User',
    cep_telefonu: uniquePhone,
    birth_date: '1990-01-01',
    acceptNewsletter: false,
    kvkkApproved: true
  };
  await test('Register User', 'POST', '/auth/register', registerData);

  // Auth - Login (with CSRF token if available)
  const loginData = {
    email: 'admin@example.com',  // Login as admin for admin endpoints
    password: 'admin123',
    ...(csrfToken && { csrfToken })
  };
  await test('Login User', 'POST', '/auth/login', loginData);

  // Auth - Get Current User (requires auth token)
  if (authToken) {
    await test('Get Current User', 'GET', '/auth/me');
  } else {
    console.log('⚠️  Skipping authenticated endpoints (no auth token)');
  }

  // Auth - Logout
  await test('Logout User', 'POST', '/auth/logout');

  // Users
  console.log('\n👤 Users:');
  const testUserId = '507f1f77bcf86cd799439011'; // Admin user ID from seed
  await test('Get User Profile', 'GET', `/users/${testUserId}`);
  if (authToken) {
    const profileData = {
      name: 'Updated Admin Name',
      phone: '5559999999',
      bio: 'Updated bio',
      address: 'New Address'
    };
    await test('Update User Profile', 'PATCH', '/users/profile', profileData);
  }

  // Listings
  console.log('\n📋 Listings:');
  const testListingId = '6ab01953bb9e06742d9aee10'; // Real listing ID from DB
  await test('Get Listings', 'GET', '/listings?category=ram&limit=10');
  await test('Get Listing Detail', 'GET', `/listings/${testListingId}`);
  await test('Search Listings', 'GET', '/listings/search?q=Test');

  if (authToken) {
    const listingData = {
      title: 'Test Item',
      description: 'A test listing',
      category: 'ram',
      condition: 'good',
      price: 5000,
      images: []
    };
    await test('Create Listing', 'POST', '/listings', listingData);
    await test('Update Listing', 'PATCH', `/listings/${testListingId}`, {
      price: 4500,
      status: 'active'
    });
    await test('Delete Listing', 'DELETE', '/listings/6ab01953bb9e06742d9aee10');
  }

  // Offers
  console.log('\n💬 Offers:');
  if (authToken) {
    const offerData = {
      listingId: '6ab01953bb9e06742d9aee10',
      price: 4800,
      message: 'Test offer message'
    };
    await test('Create Offer', 'POST', '/offers', offerData);
    await test('Get My Offers', 'GET', '/offers');
    await test('Accept Offer', 'PATCH', '/offers/6ab01953bb9e06742d9aee10/accept');
    await test('Reject Offer', 'PATCH', '/offers/6ab01953bb9e06742d9aee11/reject', {
      reason: 'Price too high'
    });
    const counterData = { counterPrice: 4700, message: 'Counter offer' };
    await test('Create Counter Offer', 'POST', '/offers/6ab01953bb9e06742d9aee10/counter', counterData);
  } else {
    console.log('⚠️  Skipping offer endpoints (no auth token)');
  }

  // Admin
  console.log('\n⚙️  Admin:');
  if (authToken) {
    await test('Get Admin Users', 'GET', '/admin/users?limit=20');
    await test('Get Admin Listings', 'GET', '/admin/listings?status=pending');
    await test('Get Admin Stats', 'GET', '/admin/stats');
    await test('Approve Listing', 'PATCH', '/admin/listings/6ab01953bb9e06742d9aee10/approve');
    await test('Reject Listing', 'PATCH', '/admin/listings/6ab01953bb9e06742d9aee11/reject', {
      reason: 'Inappropriate content'
    });
  } else {
    console.log('⚠️  Skipping admin endpoints (no auth token)');
  }

  // Summary
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📊 Results:');

  const passed = results.filter(r => r.pass === '✅').length;
  const failed = results.filter(r => r.pass === '❌').length;
  const passRate = ((passed / results.length) * 100).toFixed(1);

  console.log(`   Total: ${results.length}`);
  console.log(`   Passed: ${passed} ✅`);
  console.log(`   Failed: ${failed} ❌`);
  console.log(`   Pass Rate: ${passRate}%`);

  if (failed > 0) {
    console.log('\n🔴 Failed Endpoints:');
    results.filter(r => r.pass === '❌').forEach(r => {
      console.log(`   [${r.status}] ${r.method} ${r.path}`);
    });
  }

  process.exit(failed > 0 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  runTests().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

module.exports = { test, runTests };
