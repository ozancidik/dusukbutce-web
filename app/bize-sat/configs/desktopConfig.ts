import { ProductFormConfig } from '../types';

export const desktopConfig: ProductFormConfig = {
  productType: 'desktop',
  category: 'desktop',
  apiEndpoint: '/api/submissions',
  returnUrl: '/bize-sat/masaustu',
  pageTitle: 'Masaüstü Bilgisayar Sat',
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
          placeholder: 'Örn: Dell, HP, Custom Build'
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          placeholder: 'Örn: OptiPlex, Pavilion'
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
            { value: 'AMD', label: 'AMD' }
          ]
        },
        {
          name: 'processor',
          label: 'İşlemci Modeli',
          type: 'text',
          required: true,
          placeholder: 'Örn: i7-13700, Ryzen 7 5800X'
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
          required: true,
          placeholder: 'Örn: RTX 4060, RX 6700 XT, Entegre'
        },
        {
          name: 'graphicsCardWatt',
          label: 'Ekran Kartı Güç (W)',
          type: 'text',
          placeholder: 'Örn: 140W, 200W'
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
            { value: 'DDR3', label: 'DDR3' },
            { value: 'DDR4', label: 'DDR4' },
            { value: 'DDR5', label: 'DDR5' }
          ]
        },
        {
          name: 'storage',
          label: 'Depolama',
          type: 'text',
          required: true,
          placeholder: 'Örn: 512GB SSD, 1TB HDD'
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
      title: 'Diğer Donanım',
      icon: '🔧',
      fields: [
        {
          name: 'powerSupply',
          label: 'Güç Kaynağı',
          type: 'text',
          placeholder: 'Örn: 650W 80+ Bronze'
        },
        {
          name: 'motherboard',
          label: 'Anakart',
          type: 'text',
          placeholder: 'Örn: ASUS Prime B550'
        },
        {
          name: 'case',
          label: 'Kasa',
          type: 'text',
          placeholder: 'Örn: NZXT H510'
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
    processor: '',
    processorBrand: '',
    graphicsCard: '',
    graphicsCardWatt: '',
    ram: '',
    ramType: '',
    storage: '',
    storageType: '',
    powerSupply: '',
    motherboard: '',
    case: '',
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





