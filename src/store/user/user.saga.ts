import { takeLatest, put, call, all } from "typed-redux-saga/macro";
import { USER_ACTION_TYPE } from "./user.types";
import { getRedirectResult } from 'firebase/auth';
import {
    signInSucess,
    signInFailed,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSucess,
    EmailSignInStart,
    SignUpSuccess,
    SignUpStart
} from "./user.action";
import {
    auth,
    signOutUser,
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    logInWithEmailAndPassword,
    signInWithGoogleRedirect,
    createAuthUserWithEmailAndPassword,
    AdditionalInfo,
    UserData
} from "../../utils/firebase/firebase.utils";
import { User, Auth } from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: User, additionalInfo?: AdditionalInfo) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalInfo);
        if (userSnapshot) {
            console.log('userSnapshot: ', userSnapshot, 'userSnapshot.data: ', userSnapshot.data());
            yield* put(signInSucess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        console.log('sign in with google', user);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogleRedirectSaga() {
    try {
        yield* call(signInWithGoogleRedirect);
        const userCredential = yield* call(getRedirectResult, auth);
        if (userCredential) {
            console.log(userCredential.user);
            yield* call(getSnapshotFromUserAuth, userCredential.user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredential = yield* call(logInWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            console.log('user signing in ', user);
            yield* call(getSnapshotFromUserAuth, user);
            // store it inside the UserContext
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signOut() {
    console.log('signing out');
    try {
        yield* call(signOutUser);
        yield put(signOutSuccess())

    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signUpWithEmail({ payload: { email, password, displayName } }: SignUpStart) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield* put(signUpSucess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignInWithGoogleStart() {
    yield* takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onSignInWithGoogleRedirectStart() {
    yield* takeLatest(USER_ACTION_TYPE.GOOGLE_REDIRECT_SIGN_IN_START, signInWithGoogleRedirectSaga)
}

export function* onSignInWithEmailStart() {
    yield* takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUpWithEmail)
}

export function* onSignOut() {
    yield* takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut)
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield* (all(
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