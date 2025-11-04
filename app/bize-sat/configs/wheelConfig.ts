import { ProductFormConfig } from '../types';

export const wheelConfig: ProductFormConfig = {
  productType: 'wheel',
  category: 'gaming-wheel',
  apiEndpoint: '/api/gaming-wheel-submissions',
  returnUrl: '/bize-sat/gaming-direksiyon',
  pageTitle: 'Gaming Direksiyon Sat',
  pageIcon: '🏎️',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '🏎️',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Logitech, Thrustmaster, Fanatec'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: G29, T300 RS'
        },
        {
          name: 'forceFeedback',
          label: 'Force Feedback',
          type: 'select',
          options: [
            { value: 'Var', label: 'Var' },
            { value: 'Yok', label: 'Yok' }
          ]
        },
        {
          name: 'hasPedals',
          label: 'Pedal Seti var mı?',
          type: 'checkbox'
        },
        {
          name: 'hasShifter',
          label: 'Vites Kolu var mı?',
          type: 'checkbox'
        },
        {
          name: 'compatibility',
          label: 'Uyumluluk',
          type: 'text',
          placeholder: 'Örn: PC, PS5, Xbox Series'
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
    forceFeedback: '',
    hasPedals: false,
    hasShifter: false,
    compatibility: '',
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





