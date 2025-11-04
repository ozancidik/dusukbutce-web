import { ProductFormConfig } from '../types';

export const coolerConfig: ProductFormConfig = {
  productType: 'cooler',
  category: 'cooler',
  apiEndpoint: '/api/cooler-submissions',
  returnUrl: '/bize-sat/sogutucu',
  pageTitle: 'Soğutucu Sat',
  pageIcon: '❄️',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '❄️',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Noctua, be quiet!, Corsair'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: NH-D15, Dark Rock Pro 4'
        },
        {
          name: 'coolerType',
          label: 'Soğutucu Tipi',
          type: 'select',
          required: true,
          options: [
            { value: 'Hava Soğutma', label: 'Hava Soğutma (Air Cooler)' },
            { value: 'Sıvı Soğutma - AIO', label: 'Sıvı Soğutma - AIO' },
            { value: 'Custom Loop', label: 'Custom Loop' }
          ]
        },
        {
          name: 'radiatorSize',
          label: 'Radyatör Boyutu (AIO için)',
          type: 'select',
          options: [
            { value: '120mm', label: '120mm' },
            { value: '240mm', label: '240mm' },
            { value: '280mm', label: '280mm' },
            { value: '360mm', label: '360mm' },
            { value: '420mm', label: '420mm' }
          ],
          dependsOn: {
            field: 'coolerType',
            value: 'Sıvı Soğutma - AIO'
          }
        },
        {
          name: 'socketCompatibility',
          label: 'Soket Uyumluluğu',
          type: 'text',
          placeholder: 'Örn: LGA1700, AM5, AM4'
        },
        {
          name: 'hasRGB',
          label: 'RGB Aydınlatma var mı?',
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
            { value: 'İyi', label: 'İyi - Normal kullanım izleri' }
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
    coolerType: '',
    radiatorSize: '',
    socketCompatibility: '',
    hasRGB: false,
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





