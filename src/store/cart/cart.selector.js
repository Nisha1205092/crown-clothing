/*
isCartOpen: true,
totalPrice: 0,
cartItems: [],
cartItemCount: 0,
*/
import { createSelector } from "reselect";

export const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector([selectCartReducer], (cartSlice) => cartSlice.isCartOpen);

export const selectTotalPrice = createSelector([selectCartReducer], (cartSlice) => cartSlice.totalPrice);

export const selectCartItems = createSelector([selectCartReducer], (cartSlice) => cartSlice.cartItems);

export const selectCartItemCount = createSelector([selectCartReducer], (cartSlice) => cartSlice.cartItemCount);