import { createContext, useState } from "react";

export const CartIconContext = createContext({
    cartDropDown: null, 
    setCartDropDown: () => null
});

export const CartIconProvider = ({ children }) => {
    const [cartDropDown, setCartDropDown] = useState(true);
    const value = { cartDropDown, setCartDropDown };

    return (
        <CartIconContext.Provider value={value}>{ children }</CartIconContext.Provider>
    );
};
