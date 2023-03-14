/*
isCartOpen: true,
totalPrice: 0,
cartItems: [],
cartItemCount: 0,
*/
import { createSelector } from "reselect";

export const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector([selectCartReducer], (cartSlice) => cartSlice.isCartOpen);

export const selectCartItems = createSelector([selectCartReducer], (cartSlice) => cartSlice.cartItems);

export const selectTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, item) => total + item.quantity * item.price, 0
    ));

export const selectCartItemCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (total, item) => total + item.quantity, 0
    ));