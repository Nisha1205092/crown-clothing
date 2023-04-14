import { Action, ActionWithPayload, createAction } from "../../utils/reducers/reducers.utils";
import { withMatcher } from "../categories/category.types";
import { USER_ACTION_TYPE } from "./user.types";
import { UserData, AdditionalInfo } from "../../utils/firebase/firebase.utils";

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPE.SET_CURRENT_USER, UserData>;

export type CheckUserSession = Action<USER_ACTION_TYPE.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_ACTION_TYPE.GOOGLE_SIGN_IN_START>;

// tricky ones
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPE.EMAIL_SIGN_IN_START, { email: string; password: string }>;

export type GoogleRedirectSignInStart = Action<USER_ACTION_TYPE.GOOGLE_REDIRECT_SIGN_IN_START>;

export type SignInSucess = ActionWithPayload<USER_ACTION_TYPE.SIGN_IN_SUCCESS, UserData>;

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPE.SIGN_IN_FAILED, Error>;

export type SignOutStart = Action<USER_ACTION_TYPE.SIGN_OUT_START>;

export type SignOutSuccess = Action<USER_ACTION_TYPE.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPE.SIGN_OUT_FAILED, Error>;

// tricky ones
export type SignUpStart = ActionWithPayload<USER_ACTION_TYPE.SIGN_UP_START, { email: string, password: string, displayName: string }>;

// tricky ones
export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPE.SIGN_UP_SUCCESS, { user: UserData, additionalDetails: AdditionalInfo }>;

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPE.SIGN_UP_FAILED, Error>;

export const setCurrentUser = withMatcher(
    (user: UserData): SetCurrentUser =>
        createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user)
);

export const checkUserSession = withMatcher(
    (): CheckUserSession =>
        createAction(USER_ACTION_TYPE.CHECK_USER_SESSION)
);

export const googleSignInStart = withMatcher(
    (): GoogleSignInStart =>
        createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
    (email: string, password: string): EmailSignInStart =>
        createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, { email, password })
);

export const googleRedirectSignInStart = withMatcher(
    (): GoogleRedirectSignInStart =>
        createAction(USER_ACTION_TYPE.GOOGLE_REDIRECT_SIGN_IN_START)
);

export const signInSucess = withMatcher(
    (user: UserData): SignInSucess =>
        createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
    (error: Error): SignInFailed =>
        createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error)
);

export const signOutStart = withMatcher(
    (): SignOutStart =>
        createAction(USER_ACTION_TYPE.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
    (): SignOutSuccess =>
        createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
    (error: Error): SignOutFailed =>
        createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, error)
);

export const signUpStart = withMatcher(
    (email: string, password: string, displayName: string): SignUpStart =>
        createAction(USER_ACTION_TYPE.SIGN_UP_START, { email, password, displayName })
);

export const signUpSucess = withMatcher(
    (user: UserData, additionalDetails: AdditionalInfo): SignUpSuccess =>
        createAction(USER_ACTION_TYPE.SIGN_UP_SUCCESS, { user, additionalDetails })
);

export const signUpFailed = withMatcher(
    (error: Error): SignUpFailed =>
        createAction(USER_ACTION_TYPE.SIGN_UP_FAILED, error)
);
