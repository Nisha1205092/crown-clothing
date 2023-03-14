import { createAction } from "../../utils/reducers/reducers.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

//helper function
const incCartItemQuantity = (cartItems, productToInc) => {
    return cartItems.map((cartItem) =>
        cartItem.id === productToInc.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
    );
}

const decCartItemQuantity = (cartItems, productToDec) => {
    return cartItems.map((cartItem) =>
        cartItem.id === productToDec.id && cartItem.quantity > 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const delItem = (cartItems, productToRem) => cartItems.filter((item) => item.id !== productToRem.id);

const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
    const newTotalPrice = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    const payload = {
        cartItems: newCartItems,
        cartItemCount: newCartCount,
        totalPrice: newTotalPrice
    }
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
}
// triggers whenever use clicks 'add to cart'
// receive the product from the click
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