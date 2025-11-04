import { ProductFormConfig } from '../types';

export const graphicsCardConfig: ProductFormConfig = {
  productType: 'graphicsCard',
  category: 'graphics-card',
  apiEndpoint: '/api/graphics-card-submissions',
  returnUrl: '/bize-sat/ekran-karti',
  pageTitle: 'Ekran Kartı Sat',
  pageIcon: '🎮',
  sections: [
    {
      title: 'Temel Bilgiler',
      icon: '🎮',
      fields: [
        {
          name: 'brand',
          label: 'Marka',
          type: 'select',
          required: true,
          options: [
            { value: 'MSI', label: 'MSI' },
            { value: 'ASUS', label: 'ASUS' },
            { value: 'Gigabyte', label: 'Gigabyte' },
            { value: 'EVGA', label: 'EVGA' },
            { value: 'Zotac', label: 'Zotac' },
            { value: 'Palit', label: 'Palit' },
            { value: 'Gainward', label: 'Gainward' },
            { value: 'PNY', label: 'PNY' },
            { value: 'Sapphire', label: 'Sapphire' },
            { value: 'PowerColor', label: 'PowerColor' },
            { value: 'XFX', label: 'XFX' },
            { value: 'ASRock', label: 'ASRock' },
            { value: 'Intel', label: 'Intel' },
            { value: 'Diğer', label: 'Diğer' }
          ]
        },
        {
          name: 'chipSet',
          label: 'Chip Set',
          type: 'select',
          required: true,
          options: [
            { value: 'NVIDIA', label: 'NVIDIA' },
            { value: 'AMD', label: 'AMD' },
            { value: 'Intel', label: 'Intel' }
          ]
        },
        {
          name: 'model',
          label: 'Model',
          type: 'text',
          required: true,
          placeholder: 'Örn: RTX 4070, RX 6700 XT, ARC B580'
        }
      ]
    },
    {
      title: 'Teknik Özellikler',
      icon: '⚙️',
      fields: [
        {
          name: 'memory',
          label: 'Bellek Miktarı',
          type: 'text',
          placeholder: 'Örn: 8GB, 12GB'
        },
        {
          name: 'memoryType',
          label: 'Bit Değeri',
          type: 'text',
          placeholder: 'Örn: 128-bit, 256-bit'
        },
        {
          name: 'ports',
          label: 'Portlar',
          type: 'text',
          placeholder: 'Örn: 3x DP, 1x HDMI'
        },
        {
          name: 'dviOutput',
          label: 'DVI Çıkışı',
          type: 'select',
          options: [
            { value: 'Var', label: 'Var' },
            { value: 'Yok', label: 'Yok' }
          ]
        }
      ]
    },
    {
      title: 'Kullanım ve Test Bilgileri',
      icon: '🔍',
      fields: [
        {
          name: 'furmarkResult',
          label: 'Furmark Test Sonucu',
          type: 'text',
          placeholder: 'Test sonucunu yazın',
          showHelpModal: true,
          helpText: 'Furmark GPU stres test programıdır. Ekran kartınızın performansını ve stabilitesini test eder.'
        },
        {
          name: 'opened',
          label: 'Kart Açıldı mı?',
          type: 'select',
          options: [
            { value: 'Hayır', label: 'Hayır' },
            { value: 'Evet', label: 'Evet' }
          ]
        },
        {
          name: 'thermalPadChanged',
          label: 'Thermal Pad Değiştirildi mi?',
          type: 'select',
          options: [
            { value: 'Hayır', label: 'Hayır' },
            { value: 'Evet', label: 'Evet' }
          ]
        },
        {
          name: 'miningUsed',
          label: 'Mining Kullanıldı mı?',
          type: 'select',
          options: [
            { value: 'Hayır', label: 'Hayır' },
            { value: 'Evet', label: 'Evet' }
          ]
        },
        {
          name: 'miningDuration',
          label: 'Mining Süresi',
          type: 'text',
          placeholder: 'Örn: 6 ay, 1 yıl',
          dependsOn: {
            field: 'miningUsed',
            value: 'Evet'
          }
        },
        {
          name: 'warrantySticker',
          label: 'Garanti Sticker Durumu',
          type: 'select',
          options: [
            { value: 'Sağlam', label: 'Sağlam' },
            { value: 'Kopuk', label: 'Kopuk' }
          ]
        },
        {
          name: 'coilWhine',
          label: 'Coil Whine',
          type: 'select',
          options: [
            { value: 'Yok', label: 'Yok' },
            { value: 'Hafif', label: 'Hafif' },
            { value: 'Orta', label: 'Orta' },
            { value: 'Yoğun', label: 'Yoğun' }
          ],
          showHelpModal: true,
          helpText: 'Coil Whine: Ekran kartından gelen yüksek frekanslı ses. Performansı etkilemez ancak rahatsız edici olabilir.'
        },
        {
          name: 'oxidation',
          label: 'Pin Oksitlenmesi',
          type: 'select',
          options: [
            { value: 'Yok', label: 'Yok' },
            { value: 'Hafif', label: 'Hafif' },
            { value: 'Orta', label: 'Orta' },
            { value: 'Ciddi', label: 'Ciddi' }
          ],
          showHelpModal: true,
          helpText: 'PCIe pinlerindeki oksitlenme durumu. Hafif oksitlenme normaldir, ciddi oksitlenme bağlantı sorunlarına yol açabilir.'
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
    chipSet: '',
    model: '',
    memory: '',
    memoryType: '',
    ports: '',
    dviOutput: '',
    furmarkResult: '',
    opened: '',
    thermalPadChanged: '',
    miningUsed: '',
    miningDuration: '',
    warrantySticker: '',
    coilWhine: 'Yok',
    oxidation: 'Yok',
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





