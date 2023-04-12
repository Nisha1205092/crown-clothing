import { 
    createAction,
    addCartItem, 
    incCartItemQuantity, 
    decCartItemQuantity, 
    delItem,
} from "../../utils/cart/cart.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const addItemToCart = (productToAdd, cartItems) => {
    // either create a new cart item or find the
    // existing cart item and increase the quantity by one
    const payload = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
}

export const incrementQuantity = (productToInc, cartItems) => {
    const payload = incCartItemQuantity(cartItems, productToInc);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
}

export const decrementQuantity = (productToDec, cartItems) => {
    const payload = decCartItemQuantity(cartItems, productToDec);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
}

export const removeCartItem = (productToRem, cartItems) => {
    const payload = delItem(cartItems, productToRem);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
}

export const setIsCartOpen = (payload) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload);
}