export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Düşük Bütçe",
    "url": "https://dusukbutce.com",
    "description": "Düşük bütçe, yüksek performans! En uygun fiyatlı bilgisayar, laptop, ekran kartı, işlemci ve daha fazlası.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dusukbutce.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/dusukbutce",
      "https://twitter.com/dusukbutce",
      "https://www.instagram.com/dusukbutce"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@dusukbutce.com",
      "availableLanguage": "Turkish"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": "Turkey"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "TRY",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 