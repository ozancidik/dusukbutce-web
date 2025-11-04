import { ProductFormConfig } from '../types';

export const gamepadConfig: ProductFormConfig = {
  productType: 'gamepad',
  category: 'gamepad',
  apiEndpoint: '/api/submissions',
  returnUrl: '/bize-sat/gamepad',
  pageTitle: 'Gamepad Sat',
  pageIcon: '🎮',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '🎮',
      fields: [
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: Xbox Controller, PS5 DualSense'
        },
        {
          name: 'condition',
          label: 'Durum',
          type: 'text',
          placeholder: 'Ürün durumunu belirtin'
        },
        {
          name: 'color',
          label: 'Renk',
          type: 'text',
          placeholder: 'Örn: Siyah, Beyaz'
        },
        {
          name: 'accessories',
          label: 'Aksesuarlar',
          type: 'text',
          placeholder: 'Örn: Şarj kablosu, dongle'
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
    condition: '',
    cosmeticCondition: '',
    accessories: '',
    hasBox: false,
    hasInvoice: false,
    hasWarranty: false,
    warrantyDuration: '',
    invoiceDate: '',
    quantity: 1,
    color: '',
    images: [],
    description: ''
  }
};





