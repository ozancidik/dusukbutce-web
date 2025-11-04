import { ProductFormConfig } from '../types';

export const ramConfig: ProductFormConfig = {
  productType: 'ram',
  category: 'ram',
  apiEndpoint: '/api/ram-submissions',
  returnUrl: '/bize-sat/ram',
  pageTitle: 'RAM Sat',
  pageIcon: '💾',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '💾',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Corsair, Kingston, G.Skill'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: Vengeance LPX, HyperX Fury'
        },
        {
          name: 'capacity',
          label: 'Kapasite',
          type: 'text',
          required: true,
          placeholder: 'Örn: 8GB, 16GB, 32GB'
        },
        {
          name: 'type',
          label: 'RAM Tipi',
          type: 'select',
          required: true,
          options: [
            { value: 'DDR3', label: 'DDR3' },
            { value: 'DDR4', label: 'DDR4' },
            { value: 'DDR5', label: 'DDR5' }
          ]
        },
        {
          name: 'speed',
          label: 'Hız (MHz)',
          type: 'text',
          placeholder: 'Örn: 3200MHz, 3600MHz'
        },
        {
          name: 'latency',
          label: 'Latency (CL)',
          type: 'text',
          placeholder: 'Örn: CL16, CL18'
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
          dependsOn: {
            field: 'hasInvoice',
            value: true
          }
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
          dependsOn: {
            field: 'hasWarranty',
            value: true
          }
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
    capacity: '',
    speed: '',
    type: '',
    latency: '',
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





