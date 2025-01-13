import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/product';
import cartReducer from '../multiy-components/orderform/cart';

export const store = configureStore({
  reducer: { 
    product: productReducer,
    cart: cartReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
