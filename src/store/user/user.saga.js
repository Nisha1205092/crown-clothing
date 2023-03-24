import { takeLatest, put, call, all } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.types";
import { getRedirectResult } from 'firebase/auth';
import {
    signInSucess,
    signInFailed,
    checkUserSession,
    signOutFailed,
    signOutSuccess,
    signUpFailed
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
        yield put(checkUserSession());
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
        yield put(checkUserSession());
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

export function* signUpWithEmail({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield call(createUserDocumentFromAuth, user, { displayName });
        yield put(checkUserSession())
    } catch(error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log('email already exists');
        } else if(error.code === 'auth/weak-password') {
            console.log('weak password');
        } else {
            console.log('error creating user', error.code);
        }   
        yield put(signUpFailed());
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signInWithGoogleStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithGoogleRedirectStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_REDIRECT_SIGN_IN_START, signInWithGoogleRedirectSaga)
}

export function* signInWithEmailStart() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* signUpStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUpWithEmail)
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield (all(
        [
            call(onCheckUserSession),
            call(signInWithGoogleStart),
            call(signInWithEmailStart),
            call(signInWithGoogleRedirectStart),
            call(signUpStart),
            call(onSignOut),
        ]));
}