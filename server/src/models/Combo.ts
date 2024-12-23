import mongoose, { Schema, Document } from 'mongoose';
import { DiscountHistorySchema } from './DiscountHistory'; // Reuse DiscountHistorySchema

/**
 * Interface for Combo
 */
export interface ICombo extends Document {
  name: string; // Name of the combo
  products: Array<{
    productId: mongoose.Types.ObjectId; // Reference to the product
    variantSize: string; // Size variant (e.g., "0.5kg", "1kg")
  }>;
  price: number; // Base price of the combo
  discount: {
    startDate?: Date; // Start date for the discount
    endDate?: Date; // End date for the discount
    percentage?: number; // Discount percentage
  };
  status: 'active' | 'inactive' | 'archived' | 'deleted'; // Status of the combo
  discountHistory: (typeof DiscountHistorySchema)[]; // History of discounts
  metadata?: Record<string, unknown>; // Optional custom metadata
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
}

/**
 * Combo Schema
 */
const ComboSchema = new Schema<ICombo>(
  {
    name: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        variantSize: { type: String, required: true },
      },
    ],
    price: { type: Number, required: true },
    discount: {
      percentage: { type: Number },
      startDate: { type: Date },
      endDate: { type: Date },
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived', 'deleted'],
      default: 'active',
    },
    discountHistory: [DiscountHistorySchema],
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model<ICombo>('Combo', ComboSchema);
