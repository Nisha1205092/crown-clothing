import { createContext, useState, useEffect } from "react";

// helper function
const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem 
        );
    }
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartItemCount: 0
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

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(newCartCount);
    }, [cartItems]);
    // triggers whenever use clicks 'add to cart'
    // receive the product from the click
    const addItemToCart = (productToAdd) => {
        // either create a new cart item or find the
        // existing cart item and increase the quantity by one
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};