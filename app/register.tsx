import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Ana Sayfa</h1>
      <ul>
        <li><Link href="/register">Kayıt Ol</Link></li>
        <li><Link href="/login">Giriş Yap</Link></li>
        <li><Link href="/products">Ürünler</Link></li>
      </ul>
    </div>
  );
} 