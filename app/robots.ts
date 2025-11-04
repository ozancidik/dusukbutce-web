import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/private/',
        '/temp/',
      ],
    },
    sitemap: 'https://dusukbutce.com/sitemap.xml',
    host: 'https://dusukbutce.com',
  }
} 