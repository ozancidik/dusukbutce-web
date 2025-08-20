import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Düşük Bütçe - En Uygun Fiyatlı Bilgisayar, Laptop ve Elektronik Ürünler",
  description: "Düşük bütçe, yüksek performans! En uygun fiyatlı bilgisayar, laptop, ekran kartı, işlemci, RAM, SSD ve daha fazlası. İkinci el ürünlerinizi satın, yeni ürünler alın. Türkiye'nin en güvenilir e-ticaret sitesi.",
  keywords: "bilgisayar, laptop, ekran kartı, işlemci, ram, ssd, ikinci el, uygun fiyat, düşük bütçe, gaming laptop, oyun bilgisayarı, toplama bilgisayar, monitör, klavye, mouse, kulaklık, Türkiye, e-ticaret",
  authors: [{ name: "Düşük Bütçe", url: "https://dusukbutce.com" }],
  creator: "Düşük Bütçe",
  publisher: "Düşük Bütçe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dusukbutce.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Düşük Bütçe - En Uygun Fiyatlı Bilgisayar ve Elektronik Ürünler",
    description: "Düşük bütçe, yüksek performans! En uygun fiyatlı bilgisayar, laptop, ekran kartı, işlemci ve daha fazlası. İkinci el ürünlerinizi satın, yeni ürünler alın.",
    url: 'https://dusukbutce.com',
    siteName: 'Düşük Bütçe',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Düşük Bütçe - En Uygun Fiyatlı Bilgisayar ve Elektronik Ürünler',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Düşük Bütçe - En Uygun Fiyatlı Bilgisayar ve Elektronik Ürünler",
    description: "Düşük bütçe, yüksek performans! En uygun fiyatlı bilgisayar, laptop, ekran kartı, işlemci ve daha fazlası.",
    images: ['/logo.png'],
    creator: '@dusukbutce',
    site: '@dusukbutce',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '8Ps5XxNhUM9o0XeFsUtsTBu2fNmqubi36VMvy7u-_EQ',
    yandex: 'your-yandex-verification-code',
  },
  category: 'e-commerce',
  classification: 'Technology',
  other: {
    'geo.region': 'TR',
    'geo.placename': 'Turkey',
    'geo.position': '39.9334;32.8597',
    'ICBM': '39.9334, 32.8597',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Düşük Bütçe" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tileImage" content="/logo.png" />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NME1DVTX1C"
          suppressHydrationWarning
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NME1DVTX1C');
            `,
          }}
        />
        {/* Service Worker Registration */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Header />
          <Breadcrumb />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
