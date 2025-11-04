import { ProductFormConfig } from '../types';

export const monitorConfig: ProductFormConfig = {
  productType: 'monitor',
  category: 'monitor',
  apiEndpoint: '/api/monitor-submissions',
  returnUrl: '/bize-sat/monitor',
  pageTitle: 'Monitör Sat',
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
          placeholder: 'Örn: LG, Samsung, Dell, ASUS'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: 27GL850, Odyssey G7'
        },
        {
          name: 'screenSize',
          label: 'Ekran Boyutu',
          type: 'text',
          required: true,
          placeholder: 'Örn: 24", 27", 32"'
        },
        {
          name: 'resolution',
          label: 'Çözünürlük',
          type: 'select',
          required: true,
          options: [
            { value: '1920x1080 (Full HD)', label: '1920x1080 (Full HD)' },
            { value: '2560x1440 (2K)', label: '2560x1440 (2K)' },
            { value: '3840x2160 (4K)', label: '3840x2160 (4K)' },
            { value: '1920x1200', label: '1920x1200' },
            { value: '2560x1080 (Ultrawide)', label: '2560x1080 (Ultrawide)' },
            { value: '3440x1440 (Ultrawide)', label: '3440x1440 (Ultrawide)' }
          ]
        },
        {
          name: 'refreshRate',
          label: 'Yenileme Hızı',
          type: 'select',
          required: true,
          options: [
            { value: '60Hz', label: '60Hz' },
            { value: '75Hz', label: '75Hz' },
            { value: '100Hz', label: '100Hz' },
            { value: '120Hz', label: '120Hz' },
            { value: '144Hz', label: '144Hz' },
            { value: '165Hz', label: '165Hz' },
            { value: '180Hz', label: '180Hz' },
            { value: '240Hz', label: '240Hz' },
            { value: '360Hz', label: '360Hz' }
          ]
        },
        {
          name: 'panelType',
          label: 'Panel Tipi',
          type: 'select',
          options: [
            { value: 'IPS', label: 'IPS' },
            { value: 'VA', label: 'VA' },
            { value: 'TN', label: 'TN' },
            { value: 'OLED', label: 'OLED' }
          ]
        }
      ]
    },
    {
      title: 'Özellikler',
      icon: '⚡',
      fields: [
        {
          name: 'responseTime',
          label: 'Tepki Süresi',
          type: 'text',
          placeholder: 'Örn: 1ms, 4ms'
        },
        {
          name: 'curvature',
          label: 'Eğrilik',
          type: 'text',
          placeholder: 'Örn: 1000R, 1500R, Düz'
        },
        {
          name: 'hdr',
          label: 'HDR Desteği',
          type: 'select',
          options: [
            { value: 'Yok', label: 'Yok' },
            { value: 'HDR10', label: 'HDR10' },
            { value: 'HDR400', label: 'HDR400' },
            { value: 'HDR600', label: 'HDR600' },
            { value: 'HDR1000', label: 'HDR1000' }
          ]
        },
        {
          name: 'adaptiveSync',
          label: 'Adaptive Sync',
          type: 'select',
          options: [
            { value: 'Yok', label: 'Yok' },
            { value: 'FreeSync', label: 'FreeSync' },
            { value: 'G-Sync', label: 'G-Sync' },
            { value: 'G-Sync Compatible', label: 'G-Sync Compatible' }
          ]
        },
        {
          name: 'ports',
          label: 'Bağlantı Portları',
          type: 'text',
          placeholder: 'Örn: 2x HDMI, 1x DisplayPort, USB-C'
        }
      ]
    },
    {
      title: 'Durum Bilgileri',
      icon: '🔍',
      fields: [
        {
          name: 'deadPixels',
          label: 'Dead Pixel (Ölü Piksel)',
          type: 'select',
          options: [
            { value: 'Yok', label: 'Yok' },
            { value: '1-2 adet', label: '1-2 adet' },
            { value: '3-5 adet', label: '3-5 adet' },
            { value: '5+ adet', label: '5+ adet' }
          ]
        },
        {
          name: 'backlight',
          label: 'Backlight Bleed',
          type: 'select',
          options: [
            { value: 'Yok', label: 'Yok' },
            { value: 'Minimal', label: 'Minimal' },
            { value: 'Orta', label: 'Orta' },
            { value: 'Fazla', label: 'Fazla' }
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
    screenSize: '',
    resolution: '',
    refreshRate: '',
    panelType: '',
    responseTime: '',
    curvature: '',
    hdr: '',
    adaptiveSync: '',
    ports: '',
    deadPixels: '',
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





