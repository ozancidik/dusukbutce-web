import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentCategory?: mongoose.Types.ObjectId;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Kategori adı gereklidir'],
    trim: true,
    maxlength: [100, 'Kategori adı 100 karakterden fazla olamaz']
  },
  slug: {
    type: String,
    required: [true, 'Slug gereklidir'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Açıklama 500 karakterden fazla olamaz']
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index'ler
CategorySchema.index({ slug: 1 });
CategorySchema.index({ parentCategory: 1 });
CategorySchema.index({ isActive: 1 });
CategorySchema.index({ sortOrder: 1 });

// Virtual'lar
CategorySchema.virtual('isParent', {
  get: function(this: ICategory): boolean {
    return !this.parentCategory;
  }
});

CategorySchema.virtual('hasChildren', {
  get: function(this: ICategory): boolean {
    // Bu virtual gerçek uygulamada children count ile kontrol edilir
    return false;
  }
});

// Pre-save middleware
// pre('validate') olarak kayıtlı — required-alan doğrulaması pre('save')'den ÖNCE
// çalışır, o hook'ta set edilen slug validasyona yetişmeden "slug required" hatası
// verirdi (kategori oluşturma bu yüzden hep 500 dönüyordu).
CategorySchema.pre('validate', function(this: ICategory, next) {
  // Slug oluştur
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  next();
});

// Static methods
CategorySchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
};

CategorySchema.statics.findByParent = function(parentId: string) {
  return this.find({ parentCategory: parentId, isActive: true }).sort({ sortOrder: 1, name: 1 });
};

CategorySchema.statics.findRootCategories = function() {
  return this.find({ parentCategory: null, isActive: true }).sort({ sortOrder: 1, name: 1 });
};

// Instance methods
CategorySchema.methods.activate = function(this: ICategory) {
  this.isActive = true;
  return this.save();
};

CategorySchema.methods.deactivate = function(this: ICategory) {
  this.isActive = false;
  return this.save();
};

CategorySchema.methods.updateSortOrder = function(this: ICategory, newOrder: number) {
  this.sortOrder = newOrder;
  return this.save();
};

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
