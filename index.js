const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const appleSignin = require('apple-signin-auth');

const app = express();
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Veritabanı bağlantısı
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '741852',
  port: 5432,
});

// Test endpoint
app.get('/', (req, res) => {
  res.send('API çalışıyor!');
});

// Veritabanı bağlantı testi
app.get('/test-db', async (req, res) => {
  try {
    const client = await pool.connect();
    client.release();
    res.json({ message: 'Veritabanı bağlantısı başarılı!' });
  } catch (err) {
    res.status(500).json({ 
      error: 'Veritabanı bağlantı hatası', 
      details: err.message 
    });
  }
});

// Kullanıcıları listele
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ 
      error: 'Kullanıcılar alınamadı', 
      details: err.message 
    });
  }
});

function isStrongPassword(password) {
  return /[A-Z]/.test(password) && // büyük harf
         /[a-z]/.test(password) && // küçük harf
         /[0-9]/.test(password) && // rakam
         /[!@#$%^&*(),.?":{}|<>]/.test(password) && // özel karakter
         password.length >= 8;
}

// Kullanıcı kayıt
app.post('/register', async (req, res) => {
  const { fullName, email, password, cep_telefonu } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Ad Soyad, Email ve şifre gerekli.' });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({ error: 'Şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermeli.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const activationToken = crypto.randomBytes(32).toString('hex');
    const result = await pool.query(
      'INSERT INTO users (full_name, email, password, cep_telefonu, is_active, activation_token) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email',
      [fullName, email, hashedPassword, cep_telefonu, false, activationToken]
    );

    const activationUrl = `http://localhost:3000/activate/${activationToken}`;

    // Mail gönderme işlemini try-catch ile sarmala
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ozancidik@gmail.com',
          pass: 'bxmw ukrj vfyh oove'
        }
      });

      await transporter.sendMail({
        from: 'ozancidik@gmail.com',
        to: email,
        subject: 'Düşük Bütçe - Hesabınızı Aktive Edin',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Düşük Bütçe - Hesap Aktivasyonu</h2>
            <p>Merhaba ${fullName},</p>
            <p>Hesabınızı aktive etmek için aşağıdaki butona tıklayın:</p>
            <a href="${activationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Hesabımı Aktive Et</a>
            <p>Eğer buton çalışmıyorsa, aşağıdaki linki tarayıcınıza kopyalayabilirsiniz:</p>
            <p style="word-break: break-all; color: #666;">${activationUrl}</p>
            <p>Bu link 24 saat geçerlidir.</p>
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">Bu e-posta Düşük Bütçe uygulaması tarafından gönderilmiştir.</p>
          </div>
        `
      });
      console.log(`Aktivasyon maili gönderildi: ${email}`);
    } catch (mailError) {
      console.error('Mail gönderme hatası:', mailError);
      // Mail gönderilemezse kullanıcıyı sil
      await pool.query('DELETE FROM users WHERE email = $1', [email]);
      return res.status(500).json({
        error: 'Aktivasyon maili gönderilemedi. Lütfen daha sonra tekrar deneyin.',
        details: 'Mail sunucusu hatası. Lütfen e-posta adresinizi kontrol edin.'
      });
    }

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      res.status(409).json({ error: 'Bu email zaten kullanılıyor.' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// Kullanıcı giriş
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email ve şifre gerekli.' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Şifre yanlış.' });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: 'Hesabınız henüz aktifleştirilmedi. Lütfen e-posta adresinizi kontrol edin.' });
    }

    res.json({ message: 'Giriş başarılı', user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ürünleri listele
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ürün ekle
app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kategorileri listele
app.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sepete ürün ekle
app.post('/cart/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)',
      [userId, productId, quantity]
    );
    res.status(201).json({ message: 'Ürün sepete eklendi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sepeti getir
app.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT c.id, c.quantity, 
              json_build_object('id', p.id, 'name', p.name, 'price', p.price) as product
         FROM cart c
         JOIN products p ON c.product_id = p.id
        WHERE c.user_id = $1`,
      [userId]
    );
    res.json(result.rows.map(row => ({
      id: row.id,
      product: row.product,
      quantity: row.quantity
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sepetten ürün sil
app.post('/cart/remove', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await pool.query(
      'DELETE FROM cart WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
    res.status(200).json({ message: 'Ürün sepetten silindi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sipariş oluştur
app.post('/orders', async (req, res) => {
  const { userId } = req.body;
  try {
    const cartResult = await pool.query(
      `SELECT product_id, quantity FROM cart WHERE user_id = $1`, [userId]
    );
    if (cartResult.rows.length === 0) {
      return res.status(400).json({ error: 'Sepet boş.' });
    }
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, date) VALUES ($1, NOW()) RETURNING id`, [userId]
    );
    const orderId = orderResult.rows[0].id;
    for (const item of cartResult.rows) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)`,
        [orderId, item.product_id, item.quantity]
      );
    }
    await pool.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
    res.status(201).json({ message: 'Sipariş oluşturuldu' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Siparişleri getir
app.get('/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const ordersResult = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY date DESC`, [userId]
    );
    const orders = [];
    for (const order of ordersResult.rows) {
      const itemsResult = await pool.query(
        `SELECT oi.id, oi.quantity, 
                json_build_object('id', p.id, 'name', p.name, 'price', p.price) as product
           FROM order_items oi
           JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = $1`, [order.id]
      );
      const total = itemsResult.rows.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      orders.push({
        id: order.id,
        items: itemsResult.rows.map(item => ({
          id: item.id,
          product: item.product,
          quantity: item.quantity
        })),
        total,
        date: order.date
      });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bildirimleri getir{"error":"Kullanıcılar alınamadı","details":"password authentication failed for user \"postgres\""}
app.get('/notifications/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY date DESC', [req.params.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ürün yorumlarını getir
app.get('/products/:productId/comments', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM comments WHERE product_id = $1 ORDER BY date DESC', [req.params.productId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ürüne yorum ekle
app.post('/products/:productId/comments', async (req, res) => {
  const { user, comment } = req.body;
  try {
    await pool.query(
      'INSERT INTO comments (product_id, "user", comment, date) VALUES ($1, $2, $3, NOW())',
      [req.params.productId, user, comment]
    );
    res.status(201).json({ message: 'Yorum eklendi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Şifre sıfırlama
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'E-posta adresi gerekli.' });
  }
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bu e-posta adresi kayıtlı değil.' });
    }

    // 1. Token üret
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 saat geçerli

    // 2. Token'ı veritabanına kaydet
    await pool.query(
      'UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
      [resetToken, resetTokenExpires, email]
    );

    // 3. Mail gönder
    const resetUrl = `http://localhost:3001/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ozancidik@gmail.com',
        pass: 'bxmw ukrj vfyh oove'
      }
    });

    await transporter.sendMail({
      from: 'ozancidik@gmail.com',
      to: email,
      subject: 'Düşük Bütçe - Şifre Sıfırlama',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Düşük Bütçe - Şifre Sıfırlama</h2>
          <p>Merhaba,</p>
          <p>Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Şifreyi Sıfırla</a>
          <p>Eğer buton çalışmıyorsa, aşağıdaki linki tarayıcınıza kopyalayabilirsiniz:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>Bu link 1 saat geçerlidir.</p>
          <hr style="margin: 30px 0;">
          <p style="font-size: 12px; color: #999;">Bu e-posta Düşük Bütçe uygulaması tarafından gönderilmiştir.</p>
        </div>
      `
    });

    res.json({ message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kullanıcı profilini getir
app.get('/profile/:userId', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, full_name, email, cep_telefonu FROM users WHERE id = $1', [req.params.userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kullanıcı profilini güncelle
app.put('/profile/:userId', async (req, res) => {
  const { fullName, email, password, cep_telefonu } = req.body;
  try {
    let query, params;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = 'UPDATE users SET full_name = $1, email = $2, password = $3, cep_telefonu = $4 WHERE id = $5';
      params = [fullName, email, hashedPassword, cep_telefonu, req.params.userId];
    } else {
      query = 'UPDATE users SET full_name = $1, email = $2, cep_telefonu = $3 WHERE id = $4';
      params = [fullName, email, cep_telefonu, req.params.userId];
    }
    await pool.query(query, params);
    res.json({ message: 'Profil güncellendi.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Şifre değiştirme endpointi
app.post('/change-password/', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Tüm alanlar gereklidir.' });
  }
  if (!isStrongPassword(newPassword)) {
    return res.status(400).json({ error: 'Yeni şifre en az 8 karakter, büyük harf, küçük harf, rakam ve özel karakter içermeli.' });
  }
  try {
    const result = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Mevcut şifre yanlış.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
    res.json({ message: 'Şifre başarıyla değiştirildi.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/activate/:token', async (req, res) => {
  const { token } = req.params;
  const result = await pool.query('UPDATE users SET is_active = TRUE, activation_token = NULL WHERE activation_token = $1 RETURNING id', [token]);
  if (result.rowCount === 0) {
    return res.status(400).send('Geçersiz veya süresi dolmuş aktivasyon linki.');
  }
  res.send('Hesabınız başarıyla aktifleştirildi!');
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: '505804109185-71hbje2kbkp2nudsq0bdhg5g41u1ml8b.apps.googleusercontent.com', // Google Console'dan al
    clientSecret: 'GOCSPX-eQPmE4NaC8QgX7VCyJpW7dYBdU5', // Google Console'dan al
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    // Kullanıcıyı veritabanında bul veya oluştur
    // const user = await findOrCreateUser(profile);
    // done(null, user);
    done(null, profile); // Demo için
  }
));

// Google OAuth Endpointleri
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Başarılı girişten sonra frontend'e yönlendir
    res.redirect('http://localhost:3001'); // SwiftUI deep link veya web
  }
);

// Apple OAuth Endpointi
app.post('/auth/apple', async (req, res) => {
  const { identityToken } = req.body;
  try {
    const appleResponse = await appleSignin.verifyIdToken(identityToken, {
      audience: 'com.your.bundle.id', // Apple Developer'dan al
      ignoreExpiration: true
    });
    // appleResponse.sub ile kullanıcıyı bul veya oluştur
    res.json({ message: 'Apple ile giriş başarılı', user: appleResponse });
  } catch (err) {
    res.status(401).json({ error: 'Apple ile giriş başarısız', details: err.message });
  }
});

// Stripe PaymentIntent endpoint
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51RnFDC09EU2JaKTrbhSiiU4BUUQ8yBJlJ4hp4Sk7W36gGCeceemgoWGt9ToI1VfBoNtIYiGqAkAMrGDxATgFfyWn00YzOBSvLT'); // Stripe dashboard'dan test secret key

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'try',
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

app.post('/create-order', async (req, res) => {
  const { paymentIntentId, userId, cart } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (user_id, payment_intent_id, cart_data, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id',
      [userId, paymentIntentId, JSON.stringify(cart)]
    );
    res.json({ orderId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Sipariş kaydedilemedi', details: err.message });
  }
});

// iyzico checkout form endpoint
const iyzipay = require('iyzipay');
const iyzico = new iyzipay({
  apiKey: 'sandbox-APIKEY',
  secretKey: 'sandbox-SECRETKEY',
  uri: 'https://sandbox-api.iyzipay.com'
});

app.post('/iyzico-checkout-token', async (req, res) => {
  const request = {
    locale: iyzipay.LOCALE.TR,
    conversationId: '123456789',
    price: '100.00',
    paidPrice: '100.00',
    currency: iyzipay.CURRENCY.TRY,
    basketId: 'B67832',
    paymentGroup: iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: 'http://localhost:3001/iyzico-callback',
    enabledInstallments: [2, 3, 6, 9],
    buyer: {
      id: 'BY789',
      name: 'Ad',
      surname: 'Soyad',
      gsmNumber: '+905350000000',
      email: 'email@example.com',
      identityNumber: '74300864791',
      lastLoginDate: '2020-10-05 12:43:35',
      registrationDate: '2013-04-21 15:12:09',
      registrationAddress: 'Adres',
      ip: '85.34.78.112',
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34732'
    },
    shippingAddress: {
      contactName: 'Ad Soyad',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Adres',
      zipCode: '34742'
    },
    billingAddress: {
      contactName: 'Ad Soyad',
      city: 'Istanbul',
      country: 'Turkey',
      address: 'Adres',
      zipCode: '34742'
    },
    basketItems: [
      {
        id: 'BI101',
        name: 'Ürün 1',
        category1: 'Elektronik',
        itemType: iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: '100.00'
      }
    ]
  };

  iyzico.checkoutFormInitialize.create(request, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ token: result.token });
  });
});

// 2. El Ürün Satışı endpointi
app.post('/sell', async (req, res) => {
  const { name, email, phone, productInfo } = req.body;
  if (!name || !email || !phone || !productInfo) {
    return res.status(400).json({ error: 'Tüm alanlar gereklidir.' });
  }
  // Şimdilik sadece logla
  console.log('2. El Satış Talebi:', { name, email, phone, productInfo });
  res.status(201).json({ message: 'Talebiniz başarıyla alındı.' });
});

app.listen(3000, () => {
  console.log('API sunucusu çalışıyor: http://localhost:3000');
});