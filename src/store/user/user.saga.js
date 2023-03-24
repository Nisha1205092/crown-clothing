import { takeLatest, put, call, all } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.types";
import { getRedirectResult } from 'firebase/auth';
import {
    signInSucess,
    signInFailed,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSucess
} from "./user.action";
import {
    auth,
    signOutUser,
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    logInWithEmailAndPassword,
    signInWithGoogleRedirect,
    createAuthUserWithEmailAndPassword
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
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogleRedirectSaga() {
    try {
        yield call(signInWithGoogleRedirect);
        const response = yield call(getRedirectResult(auth));
        if (response) {
            console.log(response.user);
            yield call(getSnapshotFromUserAuth, response.user);
        }
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(logInWithEmailAndPassword, email, password);
        console.log('user signing in ', user);
        yield call(getSnapshotFromUserAuth, user);
        // store it inside the UserContext
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

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signUpWithEmail({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSucess(user, { displayName }));
    } catch(error) {
        yield put(signUpFailed(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignInWithGoogleStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onSignInWithGoogleRedirectStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_REDIRECT_SIGN_IN_START, signInWithGoogleRedirectSaga)
}

export function* onSignInWithEmailStart() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUpWithEmail)
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield (all(
        [
            call(onCheckUserSession),
            call(onSignInWithGoogleStart),
            call(onSignInWithEmailStart),
            call(onSignInWithGoogleRedirectStart),
            call(onSignUpStart),
            call(onSignUpSuccess),
            call(onSignOut),
        ]));
}