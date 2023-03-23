import { takeLatest, put, call, all } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.types";
import {
    signInSucess, 
    signInFailed, 
    checkUserSession, 
    signOutFailed, 
    signOutSuccess
} from "./user.action";
import {
    signOutUser,
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInfo);
        console.log('userSnapshot: ', userSnapshot, 'userSnapshot.data: ', userSnapshot.data());
        yield put(signInSucess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        console.log('sign in with google', user);
        yield put(checkUserSession());
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signOut() {
    console.log('signing out');
    try {
        yield call(signOutUser);
        yield put(signOutSuccess())

    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signInWithGoogleStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield (all([call(onCheckUserSession), call(signInWithGoogleStart), call(onSignOut)]));
}