import mongoose, { Document, Schema } from 'mongoose';

export interface IPriceHistory extends Document {
  productId: mongoose.Types.ObjectId;
  oldPrice: number;
  newPrice: number;
  changeType: 'manual' | 'bulk' | 'campaign' | 'auto';
  changeReason?: string;
  changedBy: string; // Admin email or system
  changedAt: Date;
  campaignId?: mongoose.Types.ObjectId;
  metadata?: Record<string, any>;
}

const PriceHistorySchema = new Schema<IPriceHistory>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Ürün ID gereklidir'],
    index: true
  },
  oldPrice: {
    type: Number,
    required: [true, 'Eski fiyat gereklidir'],
    min: [0, 'Fiyat negatif olamaz']
  },
  newPrice: {
    type: Number,
    required: [true, 'Yeni fiyat gereklidir'],
    min: [0, 'Fiyat negatif olamaz']
  },
  changeType: {
    type: String,
    enum: ['manual', 'bulk', 'campaign', 'auto'],
    required: [true, 'Değişiklik tipi gereklidir'],
    default: 'manual'
  },
  changeReason: {
    type: String,
    maxlength: [500, 'Sebep 500 karakterden fazla olamaz']
  },
  changedBy: {
    type: String,
    required: [true, 'Değiştiren kişi gereklidir'],
    maxlength: [100, 'Değiştiren kişi 100 karakterden fazla olamaz']
  },
  changedAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
    default: null
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: false // Sadece changedAt kullanıyoruz
});

// Index'ler
PriceHistorySchema.index({ productId: 1, changedAt: -1 });
PriceHistorySchema.index({ changeType: 1 });
PriceHistorySchema.index({ changedBy: 1 });
PriceHistorySchema.index({ campaignId: 1 });

// Virtual'lar
PriceHistorySchema.virtual('priceDifference').get(function(this: IPriceHistory): number {
  return this.newPrice - this.oldPrice;
});

PriceHistorySchema.virtual('percentageChange').get(function(this: IPriceHistory): number {
  if (this.oldPrice === 0) return 0;
  return ((this.newPrice - this.oldPrice) / this.oldPrice) * 100;
});

PriceHistorySchema.virtual('isIncrease').get(function(this: IPriceHistory): boolean {
  return this.newPrice > this.oldPrice;
});

PriceHistorySchema.virtual('isDecrease').get(function(this: IPriceHistory): boolean {
  return this.newPrice < this.oldPrice;
});

// Static methods
PriceHistorySchema.statics.findByProduct = function(productId: string) {
  return this.find({ productId }).sort({ changedAt: -1 });
};

PriceHistorySchema.statics.findByDateRange = function(startDate: Date, endDate: Date) {
  return this.find({
    changedAt: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ changedAt: -1 });
};

PriceHistorySchema.statics.findByChangeType = function(changeType: string) {
  return this.find({ changeType }).sort({ changedAt: -1 });
};

PriceHistorySchema.statics.getPriceStats = function(productId: string) {
  return this.aggregate([
    { $match: { productId: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: null,
        totalChanges: { $sum: 1 },
        averagePrice: { $avg: '$newPrice' },
        minPrice: { $min: '$newPrice' },
        maxPrice: { $max: '$newPrice' },
        lastChange: { $max: '$changedAt' },
        firstChange: { $min: '$changedAt' }
      }
    }
  ]);
};

// Instance methods
PriceHistorySchema.methods.getFormattedChange = function(this: IPriceHistory) {
  const diff = this.newPrice - this.oldPrice;
  const percentage = this.oldPrice > 0 ? (diff / this.oldPrice) * 100 : 0;
  const sign = diff >= 0 ? '+' : '';
  
  return {
    amount: `${sign}${diff.toLocaleString('tr-TR')} TL`,
    percentage: `${sign}${percentage.toFixed(2)}%`,
    direction: diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'no-change'
  };
};

export default mongoose.models.PriceHistory || mongoose.model<IPriceHistory>('PriceHistory', PriceHistorySchema);
