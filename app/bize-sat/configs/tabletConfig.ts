import { ProductFormConfig } from '../types';

export const tabletConfig: ProductFormConfig = {
  productType: 'tablet',
  category: 'tablet',
  apiEndpoint: '/api/tablet-submissions',
  returnUrl: '/bize-sat/tablet',
  pageTitle: 'Tablet Sat',
  pageIcon: '📱',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '📱',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Apple, Samsung, Huawei'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: iPad Pro, Galaxy Tab S9'
        },
        {
          name: 'storage',
          label: 'Depolama',
          type: 'select',
          required: true,
          options: [
            { value: '32GB', label: '32GB' },
            { value: '64GB', label: '64GB' },
            { value: '128GB', label: '128GB' },
            { value: '256GB', label: '256GB' },
            { value: '512GB', label: '512GB' },
            { value: '1TB', label: '1TB' }
          ]
        },
        {
          name: 'screenSize',
          label: 'Ekran Boyutu',
          type: 'text',
          placeholder: 'Örn: 10.2", 11", 12.9"'
        },
        {
          name: 'connectivity',
          label: 'Bağlantı',
          type: 'select',
          options: [
            { value: 'Wi-Fi', label: 'Sadece Wi-Fi' },
            { value: 'Wi-Fi + Cellular', label: 'Wi-Fi + Cellular' }
          ]
        }
      ]
    },
    {
      title: 'Durum ve Aksesuarlar',
      icon: '🔋',
      fields: [
        {
          name: 'batteryHealth',
          label: 'Pil Sağlığı (%)',
          type: 'text',
          placeholder: 'Örn: 85, 95, 100'
        },
        {
          name: 'hasPen',
          label: 'Kalem var mı? (Apple Pencil, S-Pen)',
          type: 'checkbox'
        },
        {
          name: 'hasKeyboard',
          label: 'Klavye var mı?',
          type: 'checkbox'
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
    storage: '',
    screenSize: '',
    connectivity: '',
    batteryHealth: '',
    hasPen: false,
    hasKeyboard: false,
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





