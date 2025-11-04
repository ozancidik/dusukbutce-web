import { ProductFormConfig } from '../types';

export const headphonesConfig: ProductFormConfig = {
  productType: 'headphones',
  category: 'headphones',
  apiEndpoint: '/api/headphones-submissions',
  returnUrl: '/bize-sat/kulaklik',
  pageTitle: 'Kulaklık Sat',
  pageIcon: '🎧',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '🎧',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Sony, Bose, SteelSeries'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: WH-1000XM5, QuietComfort 45'
        },
        {
          name: 'headphoneType',
          label: 'Kulaklık Tipi',
          type: 'select',
          options: [
            { value: 'Over-Ear', label: 'Over-Ear' },
            { value: 'On-Ear', label: 'On-Ear' },
            { value: 'In-Ear', label: 'In-Ear' },
            { value: 'Earbuds', label: 'Earbuds' }
          ]
        },
        {
          name: 'connectivity',
          label: 'Bağlantı',
          type: 'select',
          options: [
            { value: 'Kablolu', label: 'Kablolu (3.5mm)' },
            { value: 'Kablosuz', label: 'Kablosuz (Bluetooth)' },
            { value: 'USB', label: 'USB' },
            { value: 'Çoklu', label: 'Çoklu (Kablolu + Kablosuz)' }
          ]
        },
        {
          name: 'hasNoiseCancellation',
          label: 'Aktif Gürültü Engelleme (ANC) var mı?',
          type: 'checkbox'
        },
        {
          name: 'hasMicrophone',
          label: 'Mikrofon var mı?',
          type: 'checkbox'
        },
        {
          name: 'color',
          label: 'Renk',
          type: 'text',
          placeholder: 'Örn: Siyah, Beyaz'
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
    brand: '',
    model: '',
    headphoneType: '',
    connectivity: '',
    hasNoiseCancellation: false,
    hasMicrophone: false,
    color: '',
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





