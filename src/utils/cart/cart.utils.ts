// change here third
import { CartItem } from "../../store/cart/cart.types";
import { CategoryItem } from "../../store/categories/category.types";

// helper functions are written here
export const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

export const incCartItemQuantity = (cartItems: CartItem[], productToInc: CategoryItem): CartItem[] => {
    return cartItems.map((cartItem) =>
        cartItem.id === productToInc.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
    );
}

export const decCartItemQuantity = (cartItems: CartItem[], productToDec: CategoryItem): CartItem[] => {
    return cartItems.map((cartItem) =>
        cartItem.id === productToDec.id && cartItem.quantity > 0
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

export const delItem = (cartItems: CartItem[], productToRem: CartItem): CartItem[] =>
    cartItems.filter((item) => item.id !== productToRem.id);

