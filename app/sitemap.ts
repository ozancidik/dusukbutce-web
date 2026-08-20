import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import ProductSubmission from '@/models/ProductSubmission'

const baseUrl = 'https://dusukbutce.com'

// "Bize Sat" altındaki her kategori kendi sabit sayfasına sahip; sitemap'te
// tek tek listelenmesi gerekiyor (app/bize-sat/<slug>/page.tsx).
const BIZE_SAT_CATEGORIES = [
  'cep-telefonu', 'direksiyon', 'ekran-karti', 'fotokopi-makinesi', 'gamepad',
  'gaming-direksiyon', 'islemci', 'kasa', 'klavye', 'kulaklik', 'masaustu',
  'monitor', 'mouse', 'notebook', 'playstation', 'ram', 'ses-sistemi',
  'sogutucu', 'ssd', 'tablet', 'tarayici', 'xbox', 'yazici',
]

const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = [
  { path: '', changeFrequency: 'daily', priority: 1 },
  { path: '/urunler', changeFrequency: 'daily', priority: 0.9 },
  { path: '/satilik-ilanlar', changeFrequency: 'daily', priority: 0.9 },
  { path: '/ilanlar', changeFrequency: 'daily', priority: 0.8 },
  { path: '/bize-sat', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sat', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/markalar', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/hakkimizda', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/iletisim', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/sss', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/login', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/register', changeFrequency: 'monthly', priority: 0.3 },
  { path: '/gizlilik-politikasi', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/kullanim-sartlari', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/satis-sozlesmesi', changeFrequency: 'yearly', priority: 0.2 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const categoryEntries: MetadataRoute.Sitemap = BIZE_SAT_CATEGORIES.map((slug) => ({
    url: `${baseUrl}/bize-sat/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Yayında olan (status: 'listed') ilanlar — arama motorlarının asıl
  // indekslemesi gereken, gerçek ürün değeri taşıyan sayfalar.
  let listingEntries: MetadataRoute.Sitemap = []
  try {
    await connectDB()
    const listings = await ProductSubmission.find({ status: 'listed' })
      .select('_id listing.date')
      .limit(5000)
      .lean()

    listingEntries = listings.map((listing) => ({
      url: `${baseUrl}/satilik-ilanlar/${listing._id}`,
      lastModified: listing.listing?.date ? new Date(listing.listing.date) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (error) {
    // DB erişilemezse sitemap tamamen boş dönmek yerine statik sayfalarla
    // devam etsin — arama motorunun hiçbir şey indeksleyememesinden iyidir.
    console.error('Sitemap: ilanlar getirilemedi', error)
  }

  return [...staticEntries, ...categoryEntries, ...listingEntries]
}
