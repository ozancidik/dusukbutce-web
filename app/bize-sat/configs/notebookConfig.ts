import { ProductFormConfig } from '../types';

export const notebookConfig: ProductFormConfig = {
  productType: 'notebook',
  category: 'notebook',
  apiEndpoint: '/api/notebook-submissions',
  returnUrl: '/bize-sat/notebook',
  pageTitle: 'Notebook Sat',
  pageIcon: '💻',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '💻',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'text',
          required: true,
          placeholder: 'Örn: Dell, HP, Lenovo, Asus'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: XPS 15, ThinkPad X1'
        }
      ]
    },
    {
      title: 'İşlemci',
      icon: '⚡',
      fields: [
        {
          name: 'processorBrand',
          label: 'İşlemci Markası',
          type: 'select',
          required: true,
          options: [
            { value: 'Intel', label: 'Intel' },
            { value: 'AMD', label: 'AMD' },
            { value: 'Apple', label: 'Apple Silicon' }
          ]
        },
        {
          name: 'processor',
          label: 'İşlemci Modeli',
          type: 'text',
          required: true,
          placeholder: 'Örn: i7-13700H, Ryzen 7 7840HS'
        }
      ]
    },
    {
      title: 'Ekran Kartı',
      icon: '🎮',
      fields: [
        {
          name: 'graphicsCard',
          label: 'Ekran Kartı',
          type: 'text',
          placeholder: 'Örn: RTX 4060, RX 6700M, Entegre'
        },
        {
          name: 'graphicsCardWatt',
          label: 'Ekran Kartı Güç (W)',
          type: 'text',
          placeholder: 'Örn: 85W, 140W'
        }
      ]
    },
    {
      title: 'Bellek ve Depolama',
      icon: '💾',
      fields: [
        {
          name: 'ram',
          label: 'RAM',
          type: 'text',
          required: true,
          placeholder: 'Örn: 16GB, 32GB'
        },
        {
          name: 'ramType',
          label: 'RAM Tipi',
          type: 'select',
          options: [
            { value: 'DDR4', label: 'DDR4' },
            { value: 'DDR5', label: 'DDR5' },
            { value: 'LPDDR4', label: 'LPDDR4' },
            { value: 'LPDDR5', label: 'LPDDR5' }
          ]
        },
        {
          name: 'storage',
          label: 'Depolama',
          type: 'text',
          required: true,
          placeholder: 'Örn: 512GB, 1TB'
        },
        {
          name: 'storageType',
          label: 'Depolama Tipi',
          type: 'select',
          options: [
            { value: 'SSD', label: 'SSD' },
            { value: 'NVMe', label: 'NVMe' },
            { value: 'HDD', label: 'HDD' },
            { value: 'SSD + HDD', label: 'SSD + HDD' }
          ]
        }
      ]
    },
    {
      title: 'Ekran Özellikleri',
      icon: '🖥️',
      fields: [
        {
          name: 'screenSize',
          label: 'Ekran Boyutu',
          type: 'text',
          placeholder: 'Örn: 15.6", 14"'
        },
        {
          name: 'refreshRate',
          label: 'Yenileme Hızı',
          type: 'text',
          placeholder: 'Örn: 60Hz, 144Hz, 165Hz'
        }
      ]
    },
    {
      title: 'Pil ve Durum',
      icon: '🔋',
      fields: [
        {
          name: 'batteryHealth',
          label: 'Pil Sağlığı (%)',
          type: 'text',
          placeholder: 'Örn: 85, 95, 100'
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
    processor: '',
    processorBrand: '',
    graphicsCard: '',
    graphicsCardWatt: '',
    ram: '',
    ramType: '',
    storage: '',
    storageType: '',
    screenSize: '',
    refreshRate: '',
    batteryHealth: '',
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





