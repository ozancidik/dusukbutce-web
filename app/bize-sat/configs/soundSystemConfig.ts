import { ProductFormConfig } from '../types';

export const soundSystemConfig: ProductFormConfig = {
  productType: 'soundSystem',
  category: 'sound-system',
  apiEndpoint: '/api/sound-system-submissions',
  returnUrl: '/bize-sat/ses-sistemi',
  pageTitle: 'Ses Sistemi Sat',
  pageIcon: '🔊',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '🔊',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Logitech, Creative, Razer'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: Z906, Sound BlasterX'
        },
        {
          name: 'systemType',
          label: 'Sistem Tipi',
          type: 'select',
          options: [
            { value: '2.0', label: '2.0 (Stereo)' },
            { value: '2.1', label: '2.1 (Subwoofer)' },
            { value: '5.1', label: '5.1 Surround' },
            { value: '7.1', label: '7.1 Surround' }
          ]
        },
        {
          name: 'power',
          label: 'Güç (Watt)',
          type: 'text',
          placeholder: 'Örn: 500W'
        },
        {
          name: 'connectivity',
          label: 'Bağlantı',
          type: 'text',
          placeholder: 'Örn: Bluetooth, AUX, Optical'
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
    systemType: '',
    power: '',
    connectivity: '',
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





