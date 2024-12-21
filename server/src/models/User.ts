import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly declare the type
  name: string;
  email: string;
  role: string; // ['founder', 'inventory manager', 'dispatch', 'content manager', 'customer']
  password?: string; // Optional for social login users
  isVerified: boolean; // Email verification status
  verificationToken?: string; // Token for email verification
  resetPasswordToken?: string; // Token for password reset
  resetPasswordExpires?: Date; // Expiry for reset password token
  phoneNumber?: string; // Optional
  profilePicture?: string; // URL to profile picture
  bio?: string; // About the user
  addresses?: Array<{
    alias: string; // e.g., 'Home', 'Work'
    address: string; // Full address
    city: string; // City
    state: string; // State
    zipCode: string; // Postal code
    country: string; // Country
    isDefault?: boolean; // Marks the default address
  }>;
  lastLogin?: Date; // Last login timestamp
  loginAttempts: number; // Number of failed login attempts
  theme: 'light' | 'dark'; // Theme preference
  language: string; // e.g., 'en', 'fr'
  deletedAt?: Date; // Soft delete timestamp
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>; // Custom metadata
  cart?: Array<{
    productId: Schema.Types.ObjectId; // Product reference
    quantity: number; // Quantity of product
    price: number; // Price at the time of adding to cart
  }>;
}

const AddressSchema: Schema = new Schema({
  alias: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const CartSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
});

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: [
        'founder',
        'inventory manager',
        'dispatch',
        'content manager',
        'customer',
      ],
      required: true,
    },
    password: { type: String }, // Optional for social login users
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    phoneNumber: { type: String },
    profilePicture: { type: String },
    bio: { type: String },
    addresses: [AddressSchema],
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' },
    deletedAt: { type: Date },
    metadata: { type: Schema.Types.Mixed },
    cart: [CartSchema],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Pre-save hook to hash password
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    const bcrypt = await import('bcrypt');
    this.password = await bcrypt.hash(this.password!, 10);
  }
  next();
});

export default mongoose.model<IUser>('User', UserSchema);
