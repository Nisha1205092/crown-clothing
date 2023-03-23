import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null 
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
            return { ...state, currentUser: payload };
        case USER_ACTION_TYPE.SIGN_IN_FAILED:
            return { ...state, error: payload }
        case USER_ACTION_TYPE.SIGN_OUT_SUCCESS: 
            return { ...state, currentUser: null }
        case USER_ACTION_TYPE.SIGN_OUT_FAILED:
            return { ...state, error: payload }
        default: 
            return state; //key thing, every action gets dispatched to every reducer 
    }
} 
