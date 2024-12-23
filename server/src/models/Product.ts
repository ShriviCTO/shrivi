import mongoose, { Schema, Document } from 'mongoose';
import { DiscountHistorySchema } from './DiscountHistory'; // Reuse DiscountHistorySchema

/**
 * Subdocument Schema for Product Variants
 */
const VariantSchema = new Schema({
  size: { type: String, required: true }, // Example: "0.5kg", "1kg"
  sku: { type: String, unique: true, sparse: true }, // Unique identifier for the variant
  price: { type: Number, required: true }, // Price for the variant
  stock: { type: Number, required: true }, // Stock level for the variant
  lowStockThreshold: { type: Number, required: true }, // Configurable threshold for low stock alerts
});

/**
 * Interface for Product
 */
export interface IProduct extends Document {
  name: string; // Product name
  tagline: string; // Short tagline for the product
  description: string; // Detailed product description
  variants: (typeof VariantSchema)[]; // Array of size variants
  tags: string[]; // Flat tags for search and filtering
  features: Array<{
    icon: string; // Icon associated with the feature
    label: string; // Display label for the feature
  }>;
  images: Array<{
    url: string; // URL for the image
    altText: string; // Alt text for accessibility
    isPrimary: boolean; // Marks the primary image
  }>;
  status: 'active' | 'inactive' | 'archived' | 'deleted' | 'upcoming'; // Status of the product
  deletedAt?: Date; // Timestamp for soft delete
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
  averageRating?: number; // Precomputed average rating
  metadata?: Record<string, unknown>; // Optional custom metadata
  discount: {
    startDate?: Date; // Start date for the discount
    endDate?: Date; // End date for the discount
    percentage?: number; // Discount percentage
  };
  discountHistory: (typeof DiscountHistorySchema)[]; // Historical discounts
}

/**
 * Product Schema
 */
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    variants: { type: [VariantSchema], default: [] },
    tags: [{ type: String, required: true }],
    features: [
      {
        icon: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        altText: { type: String },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived', 'deleted', 'upcoming'],
      default: 'active',
    },
    deletedAt: { type: Date },
    averageRating: { type: Number, default: 0 },
    metadata: { type: Schema.Types.Mixed },
    discount: {
      percentage: { type: Number },
      startDate: { type: Date },
      endDate: { type: Date },
    },
    discountHistory: [DiscountHistorySchema],
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
