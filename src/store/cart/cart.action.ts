// change here second
import {
    addCartItem,
    incCartItemQuantity,
    decCartItemQuantity,
    delItem,
} from "../../utils/cart/cart.utils";
import { ActionWithPayload, createAction } from "../../utils/reducers/reducers.utils";
import { CategoryItem, withMatcher } from "../categories/category.types";
import { CartItem } from "./cart.types";
import { CART_ACTION_TYPES } from "./cart.types";

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

// AC with matcher
export const setCartItems = withMatcher(
    (payload: CartItem[]): SetCartItems =>
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload)
);

// AC with matcher
export const setIsCartOpen = withMatcher(
    (payload: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload)
);

export const addItemToCart = (productToAdd: CategoryItem, cartItems: CartItem[]) => {
    // either create a new cart item or find the
    // existing cart item and increase the quantity by one
    const payload = addCartItem(cartItems, productToAdd);
    return setCartItems(payload);
};

export const incrementQuantity = (productToInc: CategoryItem, cartItems: CartItem[]) => {
    const payload = incCartItemQuantity(cartItems, productToInc);
    return setCartItems(payload);
};

export const decrementQuantity = (productToDec: CategoryItem, cartItems: CartItem[]) => {
    const payload = decCartItemQuantity(cartItems, productToDec);
    return setCartItems(payload);
};

export const removeCartItem = (productToRem: CartItem, cartItems: CartItem[]) => {
    const payload = delItem(cartItems, productToRem);
    return setCartItems(payload);
};

