import { createAction } from "../../utils/reducers/reducers.utils";
import { USER_ACTION_TYPE } from "./user.types";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, { email, password });

export const googleRedirectSignInStart = () => createAction(USER_ACTION_TYPE.GOOGLE_REDIRECT_SIGN_IN_START);

export const signInSucess = (user) => createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error);

export const signOutStart = () => createAction(USER_ACTION_TYPE.SIGN_OUT_START);

export const signOutSuccess = () => createAction(USER_ACTION_TYPE.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) => createAction(USER_ACTION_TYPE.SIGN_OUT_FAILED, error);