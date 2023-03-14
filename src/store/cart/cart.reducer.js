import { CART_ACTION_TYPES } from "./cart.types";

// correct 
export const INITIAL_STATE = {
    isCartOpen: false,
    totalPrice: 0,
    cartItems: [],
    cartItemCount: 0,
};

export const cartReducer = (state = INITIAL_STATE, action={}) => {
    const { type, payload } = action;

    console.log('inside cart reducer');
    console.log('type: ', type);
    console.log('payload: ', payload);
    
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state, 
                isCartOpen: payload
            };
        default:
            return state;
    }
};