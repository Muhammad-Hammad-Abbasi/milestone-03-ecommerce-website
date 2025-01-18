import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.quantity || 0), 0) // Summing up all quantities
);
