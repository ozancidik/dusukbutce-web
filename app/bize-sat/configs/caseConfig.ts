import { ProductFormConfig } from '../types';

export const caseConfig: ProductFormConfig = {
  productType: 'case',
  category: 'case',
  apiEndpoint: '/api/case-submissions',
  returnUrl: '/bize-sat/kasa',
  pageTitle: 'Kasa Sat',
  pageIcon: '🖥️',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '🖥️',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: NZXT, Corsair, Lian Li'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: H510, 4000D, O11 Dynamic'
        },
        {
          name: 'formFactor',
          label: 'Form Factor',
          type: 'select',
          options: [
            { value: 'Full Tower', label: 'Full Tower' },
            { value: 'Mid Tower', label: 'Mid Tower' },
            { value: 'Mini Tower', label: 'Mini Tower' },
            { value: 'Mini-ITX', label: 'Mini-ITX' }
          ]
        },
        {
          name: 'color',
          label: 'Renk',
          type: 'text',
          placeholder: 'Örn: Siyah, Beyaz'
        },
        {
          name: 'sidePanelType',
          label: 'Yan Panel Tipi',
          type: 'select',
          options: [
            { value: 'Cam', label: 'Tempered Glass' },
            { value: 'Akrilik', label: 'Akrilik' },
            { value: 'Metal', label: 'Metal' },
            { value: 'Mesh', label: 'Mesh' }
          ]
        },
        {
          name: 'hasRGB',
          label: 'RGB Aydınlatma var mı?',
          type: 'checkbox'
        },
        {
          name: 'fanCount',
          label: 'Fan Sayısı',
          type: 'text',
          placeholder: 'Örn: 3x 120mm, 2x 140mm'
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
    formFactor: '',
    color: '',
    sidePanelType: '',
    hasRGB: false,
    fanCount: '',
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





