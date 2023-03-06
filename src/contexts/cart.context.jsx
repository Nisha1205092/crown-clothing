import { createContext, useReducer, useState } from "react";
import { createAction } from "../utils/reducers/reducers.utils";

// helper function
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

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL'
}

// correct 
const INITIAL_STATE = {
    isCartOpen: true,
    totalPrice: 0,
    cartItems: [],
    cartItemCount: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        default:
            throw new Error(`Unrecognized type ${action.type}`);
    }
};

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartItemCount: 0,
    totalPrice: 0,
    setIsCartOpen: () => { },
    addItemToCart: () => { },
    decrementQuantity: () => { },
    incrementQuantity: () => { },
    removeCartItem: () => { }
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, cartItemCount, totalPrice } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, item) => total + item.quantity, 0);
        const newTotalPrice = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0);

        const payload = {
            cartItems: newCartItems,
            cartItemCount: newCartCount,
            totalPrice: newTotalPrice
        }
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    }
    // triggers whenever use clicks 'add to cart'
    // receive the product from the click
    const addItemToCart = (productToAdd) => {
        // either create a new cart item or find the
        // existing cart item and increase the quantity by one
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const incrementQuantity = (productToInc) => {
        const newCartItems = incCartItemQuantity(cartItems, productToInc);
        updateCartItemsReducer(newCartItems);
    }

    const decrementQuantity = (productToDec) => {
        const newCartItems = decCartItemQuantity(cartItems, productToDec);
        updateCartItemsReducer(newCartItems);
    }

    const removeCartItem = (productToRem) => {
        const newCartItems = delItem(cartItems, productToRem);
        updateCartItemsReducer(newCartItems);
    }

    const value = {
        isCartOpen,
        totalPrice,
        cartItems,
        cartItemCount,
        setIsCartOpen,
        addItemToCart,
        incrementQuantity,
        decrementQuantity,
        removeCartItem
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
