import mongoose, { Schema } from 'mongoose';

/**
 * Subdocument Schema for Discount History
 */
export const DiscountHistorySchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  addedBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who added the discount
});
