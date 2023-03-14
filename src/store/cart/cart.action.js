import { 
    createAction,
    addCartItem, 
    incCartItemQuantity, 
    decCartItemQuantity, 
    delItem,
    updateCartItemsReducer 
} from "../../utils/reducers/reducers.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const addItemToCart = (productToAdd, cartItems) => {
    // either create a new cart item or find the
    // existing cart item and increase the quantity by one
    const newCartItems = addCartItem(cartItems, productToAdd);
    const action = updateCartItemsReducer(newCartItems);
    return action;
}

export const incrementQuantity = (productToInc, cartItems) => {
    const newCartItems = incCartItemQuantity(cartItems, productToInc);
    const action = updateCartItemsReducer(newCartItems);
    return action;
}

export const decrementQuantity = (productToDec, cartItems) => {
    const newCartItems = decCartItemQuantity(cartItems, productToDec);
    const action = updateCartItemsReducer(newCartItems);
    return action;
}

export const removeCartItem = (productToRem, cartItems) => {
    const newCartItems = delItem(cartItems, productToRem);
    const action = updateCartItemsReducer(newCartItems);
    return action;
}

export const setIsCartOpen = (payload) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload);
}