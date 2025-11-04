import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  category: string;
  categoryRef?: mongoose.Types.ObjectId;
  brand: string;
  productModel: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  specifications: Record<string, any>;
  status: 'active' | 'inactive' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Ürün adı zorunludur'],
    trim: true,
    maxlength: [200, 'Ürün adı 200 karakterden fazla olamaz']
  },
  category: {
    type: String,
    required: [true, 'Kategori zorunludur'],
    trim: true,
    enum: {
      values: [
        'notebook', 'desktop', 'graphics-card', 'processor', 'monitor',
        'keyboard', 'mouse', 'headphones', 'ram', 'ssd', 'tablet',
        'audio-system', 'case', 'cooler', 'gaming-wheel', 'sound-system'
      ],
      message: 'Geçersiz kategori'
    }
  },
  categoryRef: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  brand: {
    type: String,
    required: [true, 'Marka zorunludur'],
    trim: true,
    maxlength: [100, 'Marka adı 100 karakterden fazla olamaz']
  },
  productModel: {
    type: String,
    required: [true, 'Model zorunludur'],
    trim: true,
    maxlength: [100, 'Model adı 100 karakterden fazla olamaz']
  },
  price: {
    type: Number,
    required: [true, 'Fiyat zorunludur'],
    min: [0, 'Fiyat negatif olamaz'],
    max: [9999999, 'Fiyat çok yüksek']
  },
  stock: {
    type: Number,
    required: [true, 'Stok zorunludur'],
    min: [0, 'Stok negatif olamaz'],
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Açıklama zorunludur'],
    trim: true,
    maxlength: [2000, 'Açıklama 2000 karakterden fazla olamaz']
  },
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return v.startsWith('data:image/') || v.startsWith('http');
      },
      message: 'Geçersiz resim formatı'
    }
  }],
  specifications: {
    type: Map,
    of: Schema.Types.Mixed,
    default: {}
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index'ler
ProductSchema.index({ name: 'text', brand: 'text', model: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ stock: 1 });
ProductSchema.index({ createdAt: -1 });

// Virtual'lar
ProductSchema.virtual('isInStock').get(function(this: IProduct) {
  return this.stock > 0;
});

ProductSchema.virtual('isActive').get(function(this: IProduct) {
  return this.status === 'active';
});

ProductSchema.virtual('formattedPrice').get(function(this: IProduct) {
  return this.price ? this.price.toLocaleString('tr-TR') + ' TL' : '0 TL';
});

// Pre-save middleware
ProductSchema.pre('save', function(this: IProduct, next) {
  // Fiyatı 2 ondalık basamağa yuvarla
  if (this.price) {
    this.price = Math.round(this.price * 100) / 100;
  }
  
  // Stok değerini tam sayıya çevir
  if (this.stock) {
    this.stock = Math.floor(this.stock);
  }
  
  next();
});

// Static methods
ProductSchema.statics.findByCategory = function(category: string) {
  return this.find({ category, status: 'active' });
};

ProductSchema.statics.findInStock = function() {
  return this.find({ stock: { $gt: 0 }, status: 'active' });
};

ProductSchema.statics.findByPriceRange = function(minPrice: number, maxPrice: number) {
  return this.find({ 
    price: { $gte: minPrice, $lte: maxPrice },
    status: 'active'
  });
};

ProductSchema.statics.searchProducts = function(searchTerm: string) {
  return this.find({
    $text: { $search: searchTerm },
    status: 'active'
  });
};

// Instance methods
ProductSchema.methods.updateStock = function(this: IProduct, newStock: number) {
  this.stock = Math.max(0, newStock);
  return this.save();
};

ProductSchema.methods.addToStock = function(this: IProduct, amount: number) {
  this.stock += amount;
  return this.save();
};

ProductSchema.methods.removeFromStock = function(this: IProduct, amount: number) {
  this.stock = Math.max(0, this.stock - amount);
  return this.save();
};

ProductSchema.methods.activate = function(this: IProduct) {
  this.status = 'active';
  return this.save();
};

ProductSchema.methods.deactivate = function(this: IProduct) {
  this.status = 'inactive';
  return this.save();
};

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
