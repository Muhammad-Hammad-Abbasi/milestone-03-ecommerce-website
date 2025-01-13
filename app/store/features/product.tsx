import { Product } from '@/app/utils/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '@/app/utils/mock'; // Update path as needed

// Thunk to fetch products from Sanity
export const getProducts = createAsyncThunk(
  'product/getProducts',
  async () => {
    const data = await fetchProducts();
    return data; // Fetched products array
  }
);

// Initial state
const initialState: Product[] = [];

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      return action.payload;
    });
  },
});

export default productSlice.reducer;
