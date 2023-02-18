import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartItemCount: 0,
    decrementQuantity: () => { },
    incrementQuantity: () => { },
    removeCartItem: () => { },
    totalPrice: 0
});
/*
product 
{
    id, name, price, imageUrl
}
cart 
{
    id, name, price, imageUrl, quantity
}
*/
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(newCartCount);

        const newTotalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
        setTotalPrice(newTotalPrice);
    }, [cartItems]);
    // triggers whenever use clicks 'add to cart'
    // receive the product from the click
    const addItemToCart = (productToAdd) => {
        // either create a new cart item or find the
        // existing cart item and increase the quantity by one
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const incrementQuantity = (productToInc) => {
        setCartItems(incCartItemQuantity(cartItems, productToInc));
    }

    const decrementQuantity = (productToDec) => {
        setCartItems(decCartItemQuantity(cartItems, productToDec));
    }

    const removeCartItem = (productToRem) => {
        setCartItems(delItem(cartItems, productToRem));
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartItemCount,
        incrementQuantity,
        decrementQuantity,
        removeCartItem,
        totalPrice
    };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};