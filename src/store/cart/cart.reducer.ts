// change here fourth
import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";

// correct 
export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}
export const INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: []
};

export const cartReducer = (
    state = INITIAL_STATE,
    action: AnyAction
): CartState => {
    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload
        };
    }
    if (setIsCartOpen.match(action)) {
        return {
            ...state, 
            isCartOpen: action.payload
        };
    }
    return state;
};