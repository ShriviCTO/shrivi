import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface for Review
 */
export interface IReview extends Document {
  productId: mongoose.Types.ObjectId; // Reference to the product
  userId: mongoose.Types.ObjectId; // Reference to the user who left the review
  rating?: number; // Optional rating out of 5
  comment?: string; // Optional comment or testimonial
  images?: Array<{
    url: string; // URL of the uploaded image
    altText?: string; // Optional alt text for accessibility
  }>;
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
}

/**
 * Review Schema
 */
const ReviewSchema = new Schema<IReview>(
  {
    productId: {
      type: Schema.Types.ObjectId, // Reference to the product
      ref: 'Product',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId, // Reference to the user
      ref: 'User',
      required: true,
    },
    rating: { type: Number, min: 1, max: 5 }, // Optional rating
    comment: { type: String }, // Optional comment or testimonial
    images: [
      {
        url: { type: String, required: true }, // URL of the uploaded image
        altText: { type: String }, // Optional alt text
      },
    ],
  },
  { timestamps: true }
);

/**
 * Middleware to update average rating on the associated Product
 */
ReviewSchema.post('save', async function () {
  const review = this as IReview;

  // Calculate the new average rating (exclude reviews without a rating)
  const productReviews = await mongoose.model<IReview>('Review').find({
    productId: review.productId,
    rating: { $exists: true },
  });
  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
        productReviews.length
      : 0;

  // Update the product's average rating
  await mongoose.model('Product').findByIdAndUpdate(review.productId, {
    averageRating,
  });
});

ReviewSchema.post('findOneAndDelete', async function (doc) {
  if (!doc) return; // If no document is found, exit

  const review = doc as IReview;

  // Calculate the new average rating (exclude reviews without a rating)
  const productReviews = await mongoose.model<IReview>('Review').find({
    productId: review.productId,
    rating: { $exists: true },
  });

  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
        productReviews.length
      : 0;

  // Update the product's average rating
  await mongoose.model('Product').findByIdAndUpdate(review.productId, {
    averageRating,
  });
});

export default mongoose.model<IReview>('Review', ReviewSchema);
