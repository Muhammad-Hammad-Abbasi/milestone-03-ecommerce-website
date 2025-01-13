import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define item type for cart
interface CartItem {
  id: number; // Item ID
  image: string;
  title: string; // Item title
  price: number; // Item price
  quantity?: number; // Item quantity
}

// Define the initial state type
interface CartState {
  items: CartItem[];
}

// Initial state
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart or increase quantity
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        // Ensure quantity is never undefined
        existingItem.quantity = (existingItem.quantity || 0) + 1;
      } else {
        state.items.push({ ...item, quantity: 1 }); // Add new item with default quantity
      }
    },
    // Increment quantity
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        // Ensure quantity is never undefined
        item.quantity = (item.quantity || 0) + 1;
      } else {
        console.warn("Item not found for increment:", action.payload);
      }
    },
    // Decrement quantity
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        // Ensure quantity is never undefined
        if ((item.quantity || 0) > 1) {
          item.quantity = (item.quantity || 0) - 1;
        } else {
          console.warn("Cannot decrement quantity below 1 for item:", action.payload);
        }
      } else {
        console.warn("Item not found for decrement:", action.payload);
      }
    },
    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
