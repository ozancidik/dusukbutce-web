import { ProductFormConfig } from '../types';

export const mouseConfig: ProductFormConfig = {
  productType: 'mouse',
  category: 'mouse',
  apiEndpoint: '/api/mouse-submissions',
  returnUrl: '/bize-sat/mouse',
  pageTitle: 'Mouse Sat',
  pageIcon: '🖱️',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '🖱️',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Logitech, Razer, SteelSeries'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: G Pro, DeathAdder, Rival'
        },
        {
          name: 'connectivity',
          label: 'Bağlantı Tipi',
          type: 'text',
          placeholder: 'Örn: Kablolu, Kablosuz'
        },
        {
          name: 'interface',
          label: 'Arabirim',
          type: 'text',
          placeholder: 'Örn: USB, Bluetooth, Wireless, USB Type C'
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
            { value: 'Orta', label: 'Orta - Belirgin kullanım izleri' },
            { value: 'Kötü', label: 'Kötü - Çok fazla kullanım izi' }
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
    interface: '',
    connectivity: '',
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





