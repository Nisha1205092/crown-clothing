import { AnyAction } from "redux";
import { USER_ACTION_TYPE, User } from "./user.types";
import { emailSignInStart, googleRedirectSignInStart, googleSignInStart, signInFailed, signInSucess, signOutFailed, signOutStart, signOutSuccess, signUpFailed, signUpStart } from "./user.action";

export type UserState = {
    readonly currentUser: User | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
};

export const userReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {
    // const { type, payload } = action;

    if (signInSucess.match(action)) {
        return { ...state, currentUser: action.payload, isLoading: false };
    }
    if (signOutSuccess.match(action)) {
        return { ...state, currentUser: null, isLoading: false };
    }
    if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)) {
        return { ...state, error: action.payload, isLoading: false };
    }
    if (
        signUpStart.match(action) ||
        googleSignInStart.match(action) ||
        googleRedirectSignInStart.match(action) ||
        emailSignInStart.match(action) ||
        signOutStart.match(action)) {
        return { ...state, isLoading: true };
    }

    return state;

    // switch (type) {
    //     case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
    //         return { ...state, currentUser: payload, isLoading: false };
    //     case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
    //         return { ...state, currentUser: null, isLoading: false }
    //     case USER_ACTION_TYPE.SIGN_IN_FAILED:
    //     case USER_ACTION_TYPE.SIGN_OUT_FAILED:
    //     case USER_ACTION_TYPE.SIGN_UP_FAILED:
    //         return { ...state, error: payload, isLoading: false }
    //     case USER_ACTION_TYPE.SIGN_UP_START:
    //     case USER_ACTION_TYPE.GOOGLE_REDIRECT_SIGN_IN_START:
    //     case USER_ACTION_TYPE.EMAIL_SIGN_IN_START:
    //     case USER_ACTION_TYPE.GOOGLE_SIGN_IN_START:
    //     case USER_ACTION_TYPE.SIGN_OUT_START:
    //         return { ...state, isLoading: true }
    //     default:
    //         return state; //key thing, every action gets dispatched to every reducer 
    // }
} 
