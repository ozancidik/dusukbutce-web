import { ProductFormConfig } from '../types';

export const ssdConfig: ProductFormConfig = {
  productType: 'ssd',
  category: 'ssd',
  apiEndpoint: '/api/ssd-submissions',
  returnUrl: '/bize-sat/ssd',
  pageTitle: 'SSD Sat',
  pageIcon: '💿',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '💿',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Samsung, WD, Kingston'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: 970 EVO, Black SN850'
        },
        {
          name: 'capacity',
          label: 'Kapasite',
          type: 'text',
          required: true,
          placeholder: 'Örn: 256GB, 512GB, 1TB'
        },
        {
          name: 'interface',
          label: 'Arayüz',
          type: 'select',
          required: true,
          options: [
            { value: 'NVMe', label: 'NVMe (M.2)' },
            { value: 'SATA', label: 'SATA' },
            { value: 'PCIe', label: 'PCIe' }
          ]
        },
        {
          name: 'formFactor',
          label: 'Form Factor',
          type: 'select',
          options: [
            { value: 'M.2 2280', label: 'M.2 2280' },
            { value: 'M.2 2242', label: 'M.2 2242' },
            { value: '2.5"', label: '2.5"' }
          ]
        },
        {
          name: 'readSpeed',
          label: 'Okuma Hızı',
          type: 'text',
          placeholder: 'Örn: 3500 MB/s'
        },
        {
          name: 'writeSpeed',
          label: 'Yazma Hızı',
          type: 'text',
          placeholder: 'Örn: 3000 MB/s'
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
    interface: '',
    formFactor: '',
    readSpeed: '',
    writeSpeed: '',
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





