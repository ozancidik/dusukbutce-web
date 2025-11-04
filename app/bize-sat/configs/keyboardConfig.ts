import { ProductFormConfig } from '../types';

export const keyboardConfig: ProductFormConfig = {
  productType: 'keyboard',
  category: 'keyboard',
  apiEndpoint: '/api/keyboard-submissions',
  returnUrl: '/bize-sat/klavye',
  pageTitle: 'Klavye Sat',
  pageIcon: '⌨️',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '⌨️',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Logitech, Corsair, Razer'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: K70, BlackWidow'
        },
        {
          name: 'switchType',
          label: 'Switch Tipi',
          type: 'text',
          placeholder: 'Örn: Cherry MX Red, Razer Green'
        },
        {
          name: 'layout',
          label: 'Layout',
          type: 'select',
          options: [
            { value: 'TR Q', label: 'TR Q (Türkçe)' },
            { value: 'US', label: 'US (İngilizce)' },
            { value: 'ISO', label: 'ISO' },
            { value: 'ANSI', label: 'ANSI' }
          ]
        },
        {
          name: 'size',
          label: 'Boyut',
          type: 'select',
          options: [
            { value: 'Full Size (100%)', label: 'Full Size (100%)' },
            { value: 'TKL (80%)', label: 'TKL - Tenkeyless (80%)' },
            { value: '75%', label: '75%' },
            { value: '65%', label: '65%' },
            { value: '60%', label: '60%' }
          ]
        },
        {
          name: 'connectivity',
          label: 'Bağlantı',
          type: 'select',
          options: [
            { value: 'Kablolu', label: 'Kablolu' },
            { value: 'Kablosuz', label: 'Kablosuz (2.4GHz)' },
            { value: 'Bluetooth', label: 'Bluetooth' },
            { value: 'Çoklu', label: 'Çoklu (Kablolu + Kablosuz)' }
          ]
        },
        {
          name: 'backlight',
          label: 'Aydınlatma',
          type: 'select',
          options: [
            { value: 'Yok', label: 'Yok' },
            { value: 'Tek Renk', label: 'Tek Renk' },
            { value: 'RGB', label: 'RGB' }
          ]
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
    switchType: '',
    layout: '',
    size: '',
    connectivity: '',
    backlight: '',
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





