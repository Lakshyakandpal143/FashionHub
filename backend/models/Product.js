import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    countInStock: { type: Number, required: true, min: 0, default: 0 },
    sku: { type: String, unique: true, sparse: true, trim: true },
    category: { type: String, required: true, enum: ['Top Wear', 'Bottom Wear'] },
    gender: { type: String, enum: ['Men', 'Women', 'Unisex'], default: 'Unisex' },
    brand: { type: String, trim: true },
    material: { type: String, trim: true },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String },
      },
    ],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);
