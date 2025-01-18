import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/product';
import cartSlice "@/app/

export const store = configureStore({
  reducer: { 
    product: productReducer,
    cart: cartReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
