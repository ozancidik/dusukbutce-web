import { ProductFormConfig } from '../types';

export const playstationConfig: ProductFormConfig = {
  productType: 'playstation',
  category: 'playstation',
  apiEndpoint: '/api/submissions',
  returnUrl: '/bize-sat/playstation',
  pageTitle: 'PlayStation Sat',
  pageIcon: '🎮',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '🎮',
      fields: [
        {
          name: 'model',
          label: 'Model',
          type: 'select',
          required: true,
          options: [
            { value: 'PS5', label: 'PlayStation 5' },
            { value: 'PS5 Digital', label: 'PlayStation 5 Digital Edition' },
            { value: 'PS4 Pro', label: 'PlayStation 4 Pro' },
            { value: 'PS4', label: 'PlayStation 4' },
            { value: 'PS4 Slim', label: 'PlayStation 4 Slim' }
          ]
        },
        {
          name: 'storage',
          label: 'Depolama',
          type: 'select',
          options: [
            { value: '500GB', label: '500GB' },
            { value: '825GB', label: '825GB (PS5)' },
            { value: '1TB', label: '1TB' },
            { value: '2TB', label: '2TB' }
          ]
        },
        {
          name: 'color',
          label: 'Renk',
          type: 'text',
          placeholder: 'Örn: Beyaz, Siyah'
        },
        {
          name: 'controllers',
          label: 'Kol Sayısı',
          type: 'number',
          placeholder: '1, 2'
        },
        {
          name: 'games',
          label: 'Oyunlar',
          type: 'text',
          placeholder: 'Varsa oyun isimlerini yazın'
        },
        {
          name: 'accessories',
          label: 'Aksesuarlar',
          type: 'text',
          placeholder: 'Örn: Kamera, şarj istasyonu'
        }
      ]
    },
    {
      title: 'Ürün Durumu',
      icon: '⭐',
      fields: [
        {
          name: 'cosmeticCondition',
          label: 'Kozmetik Durum',
          type: 'select',
          required: true,
          options: [
            { value: 'Mükemmel', label: 'Mükemmel - Hiç kullanılmamış gibi' },
            { value: 'Çok İyi', label: 'Çok İyi - Hafif kullanım izleri' },
            { value: 'İyi', label: 'İyi - Normal kullanım izleri' },
            { value: 'Orta', label: 'Orta - Belirgin kullanım izleri' }
          ]
        },
        {
          name: 'hasBox',
          label: 'Kutusu var mı?',
          type: 'checkbox'
        },
        {
          name: 'hasInvoice',
          label: 'Faturası var mı?',
          type: 'checkbox'
        },
        {
          name: 'invoiceDate',
          label: 'Fatura Tarihi',
          type: 'date',
          dependsOn: { field: 'hasInvoice', value: true }
        },
        {
          name: 'hasWarranty',
          label: 'Garantisi var mı?',
          type: 'checkbox'
        },
        {
          name: 'warrantyDuration',
          label: 'Garanti Süresi (Ay)',
          type: 'text',
          placeholder: 'Örn: 12, 24',
          dependsOn: { field: 'hasWarranty', value: true }
        },
        {
          name: 'quantity',
          label: 'Adet',
          type: 'number',
          required: true
        },
        {
          name: 'description',
          label: 'Açıklama',
          type: 'textarea',
          placeholder: 'Ürününüz hakkında detaylı bilgi verin...',
          gridColumn: 'full'
        }
      ]
    }
  ],
  defaultFormData: {
    model: '',
    storage: '',
    color: '',
    controllers: 1,
    games: '',
    accessories: '',
    description: '',
    cosmeticCondition: 'Mükemmel',
    hasBox: false,
    hasInvoice: false,
    hasWarranty: false,
    warrantyDuration: '',
    invoiceDate: '',
    quantity: 1,
    images: []
  }
};





