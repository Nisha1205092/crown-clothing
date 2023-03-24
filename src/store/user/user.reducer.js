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
            return { ...state, currentUser: payload, isLoading: false };
        case USER_ACTION_TYPE.SIGN_OUT_SUCCESS: 
            return { ...state, currentUser: null, isLoading: false }
        case USER_ACTION_TYPE.SIGN_IN_FAILED:
        case USER_ACTION_TYPE.SIGN_OUT_FAILED:
        case USER_ACTION_TYPE.SIGN_UP_FAILED: 
            return { ...state, error: payload, isLoading: false }
        case USER_ACTION_TYPE.SIGN_UP_START:
        case USER_ACTION_TYPE.GOOGLE_REDIRECT_SIGN_IN_START:
        case USER_ACTION_TYPE.EMAIL_SIGN_IN_START:
        case USER_ACTION_TYPE.GOOGLE_SIGN_IN_START:
        case USER_ACTION_TYPE.SIGN_OUT_START:
            return { ...state, isLoading: true }
        default: 
            return state; //key thing, every action gets dispatched to every reducer 
    }
} 
