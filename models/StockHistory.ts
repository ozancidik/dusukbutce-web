import mongoose, { Document, Schema } from 'mongoose';

export interface IStockHistory extends Document {
  productId: mongoose.Types.ObjectId;
  productName: string;
  changeType: 'add' | 'remove' | 'set';
  previousStock: number;
  newStock: number;
  changeAmount: number;
  reason: string;
  updatedBy: string;
  updatedAt: Date;
}

const StockHistorySchema = new Schema<IStockHistory>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  changeType: {
    type: String,
    enum: ['add', 'remove', 'set'],
    required: true
  },
  previousStock: {
    type: Number,
    required: true
  },
  newStock: {
    type: Number,
    required: true
  },
  changeAmount: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    default: 'Stok güncellendi'
  },
  updatedBy: {
    type: String,
    default: 'admin'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

StockHistorySchema.index({ productId: 1 });
StockHistorySchema.index({ updatedAt: -1 });

export default mongoose.models.StockHistory || mongoose.model<IStockHistory>('StockHistory', StockHistorySchema);
