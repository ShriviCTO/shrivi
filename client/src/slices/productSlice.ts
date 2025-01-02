import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Variant {
  size: string;
  sku: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
}

interface ProductState {
  name: string;
  tagline: string;
  description: string;
  priceOriginal: number;
  priceDiscounted: number;
  sizes: string[];
  variants: Variant[];
  tags: string[];
  features: Array<{ icon: string; label: string }>;
  images: Array<{ url: string; altText: string; isPrimary: boolean }>;
  isOpen: boolean; // Modal open state
}

const initialState: ProductState = {
  name: "",
  tagline: "",
  description: "",
  priceOriginal: 0,
  priceDiscounted: 0,
  sizes: [],
  variants: [],
  tags: [],
  features: [],
  images: [],
  isOpen: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    updateProduct(state, action: PayloadAction<Partial<ProductState>>) {
      Object.assign(state, action.payload);
    },
    resetProduct(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setModalOpen, updateProduct, resetProduct } =
  productSlice.actions;
export default productSlice.reducer;
