import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Düşük Bütçe - En Uygun Fiyatlı Ürünler",
  description: "Düşük bütçe, yüksek performans! En uygun fiyatlı bilgisayar, laptop, ekran kartı, işlemci ve daha fazlası. İkinci el ürünlerinizi satın, yeni ürünler alın.",
  keywords: "bilgisayar, laptop, ekran kartı, işlemci, ram, ssd, ikinci el, uygun fiyat, düşük bütçe",
  authors: [{ name: "Düşük Bütçe" }],
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
    title: "Düşük Bütçe - En Uygun Fiyatlı Ürünler",
    description: "Düşük bütçe, yüksek performans! En uygun fiyatlı bilgisayar, laptop, ekran kartı, işlemci ve daha fazlası.",
    url: 'https://dusukbutce.com',
    siteName: 'Düşük Bütçe',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Düşük Bütçe Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Düşük Bütçe - En Uygun Fiyatlı Ürünler",
    description: "Düşük bütçe, yüksek performans! En uygun fiyatlı bilgisayar, laptop, ekran kartı, işlemci ve daha fazlası.",
    images: ['/logo.png'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
