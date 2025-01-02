import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface for Variant
 */
export interface IVariant extends Document {
  productId: mongoose.Types.ObjectId; // Reference to parent product
  label: string; // Name of the variant (e.g., "Mini", "Regular")
  price: number; // Price of the variant
  sku: string; // Unique SKU
  stock: number; // Current stock level
  dimensions: {
    weight: string; // e.g., "0.5kg"
    height: string;
    width: string;
    depth: string;
  };
  packaging?: string; // Description of packaging
  description?: string; // Description for the variant
  lowStockThreshold?: number; // Optional threshold for low stock alerts
}

/**
 * Variant Schema
 */
const VariantSchema = new Schema<IVariant>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    label: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, unique: true },
    stock: { type: Number, required: true },
    dimensions: {
      weight: { type: String },
      height: { type: String },
      width: { type: String },
      depth: { type: String },
    },
    packaging: { type: String },
    description: { type: String },
    lowStockThreshold: { type: Number, default: 50 }, // Default threshold
  },
  { timestamps: true }
);

/**
 * Interface for Product
 */
export interface IProduct extends Document {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  features: Array<{
    icon: string; // Predefined icon reference
    label: string; // Display label
  }>;
  images: Array<{
    url: string;
    altText?: string; // Alt text for accessibility
    isPrimary: boolean; // Indicates the primary image
  }>;
  videos: Array<{
    url: string;
    title: string;
  }>;
  nutritionalContent: string; // Markdown text
  certifications?: string; // Markdown text
  usageInstructions: string; // Markdown text
  environmentalImpact?: string; // Markdown text
  returnPolicy?: string;
  status: 'inactive' | 'upcoming' | 'active' | 'archived' | 'deleted';
  discount?: {
    percentage: number;
    validUntil: Date;
  };
  variants: mongoose.Types.ObjectId[]; // References to Variant schema
  deletedAt?: Date;
}

/**
 * Product Schema
 */
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
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
    videos: [
      {
        url: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    nutritionalContent: { type: String, required: true },
    certifications: { type: String },
    usageInstructions: { type: String, required: true },
    environmentalImpact: { type: String },
    returnPolicy: { type: String },
    status: {
      type: String,
      enum: ['inactive', 'upcoming', 'active', 'archived', 'deleted'],
      default: 'inactive',
    },
    discount: {
      percentage: { type: Number },
      validUntil: { type: Date },
    },
    variants: [{ type: mongoose.Types.ObjectId, ref: 'Variant' }],
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

export interface IBundle extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  discount?: number;
  variants: Array<{
    variantId: mongoose.Types.ObjectId;
    quantity: number; // Quantity of this variant in the bundle
  }>;
}

/**
 * Bundle Schema
 */
const BundleSchema = new Schema<IBundle>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    variants: [
      {
        variantId: {
          type: mongoose.Types.ObjectId,
          ref: 'Variant',
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Bundle = mongoose.model<IBundle>('Bundle', BundleSchema);
export const Variant = mongoose.model<IVariant>('Variant', VariantSchema);
export const Product = mongoose.model<IProduct>('Product', ProductSchema);
