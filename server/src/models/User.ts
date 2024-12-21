import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: string;
  password?: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  phoneNumber?: string;
  profilePicture?: string;
  bio?: string;
  addresses?: Array<{
    alias: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault?: boolean;
  }>;
  lastLogin?: Date; // Ensure this is Date
  loginAttempts: number; // Ensure this is number
  theme: 'light' | 'dark';
  language: string;
  deletedAt?: Date;
  metadata?: Record<string, unknown>;
  cart?: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }>;
}

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
    addresses: [
      {
        alias: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
      },
    ],
    lastLogin: { type: Date }, // Fix type as Date
    loginAttempts: { type: Number, default: 0 }, // Fix type as Number
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' },
    deletedAt: { type: Date },
    metadata: { type: Schema.Types.Mixed },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
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
