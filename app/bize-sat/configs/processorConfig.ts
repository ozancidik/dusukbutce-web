import { ProductFormConfig } from '../types';

export const processorConfig: ProductFormConfig = {
  productType: 'processor',
  category: 'processor',
  apiEndpoint: '/api/processor-submissions',
  returnUrl: '/bize-sat/islemci',
  pageTitle: 'İşlemci Sat',
  pageIcon: '⚡',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '⚡',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'select',
          required: true,
          options: [
            { value: 'Intel', label: 'Intel' },
            { value: 'AMD', label: 'AMD' }
          ]
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: i7-13700K, Ryzen 7 7800X3D'
        },
        {
          name: 'socket',
          label: 'Soket',
          type: 'text',
          required: true,
          placeholder: 'Örn: LGA1700, AM5, AM4'
        },
        {
          name: 'coreCount',
          label: 'Çekirdek Sayısı',
          type: 'text',
          placeholder: 'Örn: 8, 16'
        },
        {
          name: 'threadCount',
          label: 'Thread Sayısı',
          type: 'text',
          placeholder: 'Örn: 16, 32'
        },
        {
          name: 'baseClock',
          label: 'Temel Frekans',
          type: 'text',
          placeholder: 'Örn: 3.4 GHz'
        },
        {
          name: 'boostClock',
          label: 'Boost Frekans',
          type: 'text',
          placeholder: 'Örn: 5.4 GHz'
        }
      ]
    },
    {
      title: 'Kullanım Bilgileri',
      icon: '🔍',
      fields: [
        {
          name: 'hasStock Cooler',
          label: 'Orijinal soğutucu var mı?',
          type: 'checkbox'
        },
        {
          name: 'overclocked',
          label: 'Overclock yapıldı mı?',
          type: 'select',
          options: [
            { value: 'Hayır', label: 'Hayır' },
            { value: 'Evet', label: 'Evet' }
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
    socket: '',
    coreCount: '',
    threadCount: '',
    baseClock: '',
    boostClock: '',
    hasStockCooler: false,
    overclocked: '',
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





