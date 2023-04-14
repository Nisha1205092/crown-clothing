// change here fifth
import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { CartItem } from "./cart.types";

export const selectCartReducer = (state): CartState => state.cart;

export const selectIsCartOpen = createSelector([selectCartReducer], (cartSlice): boolean => cartSlice.isCartOpen);

export const selectCartItems = createSelector([selectCartReducer], (cartSlice): CartItem[] => cartSlice.cartItems);

export const selectTotalPrice = createSelector(
    [selectCartItems],
    (cartItems): number => cartItems.reduce(
        (total, item) => total + item.quantity * item.price, 0
    ));

export const selectCartItemCount = createSelector(
    [selectCartItems],
    (cartItems): number => cartItems.reduce(
        (total, item) => total + item.quantity, 0
    ));