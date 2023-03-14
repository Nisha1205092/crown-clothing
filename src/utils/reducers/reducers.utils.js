import { CART_ACTION_TYPES } from "../../store/cart/cart.types";

export const createAction = (type, payload) => ({ type, payload });

export const addCartItem = (cartItems, productToAdd) => {
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

export const incCartItemQuantity = (cartItems, productToInc) => {
    return cartItems.map((cartItem) =>
        cartItem.id === productToInc.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
    );
}

export const decCartItemQuantity = (cartItems, productToDec) => {
    return cartItems.map((cartItem) =>
        cartItem.id === productToDec.id && cartItem.quantity > 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

export const delItem = (cartItems, productToRem) => cartItems.filter((item) => item.id !== productToRem.id);

// export const updateCartItemsReducer = (newCartItems) => {
//     const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
//     const newTotalPrice = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0);

//     const payload = {
//         cartItems: newCartItems,
//         cartItemCount: newCartCount,
//         totalPrice: newTotalPrice
//     }
//     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
// }