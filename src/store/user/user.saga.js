import { takeLatest, put, call, all } from "redux-saga/effects";    
import { USER_ACTION_TYPE } from "./user.types";
import { signInSucess, signInFailed } from "./user.action";
import { getCurrentUser, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
    try {
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInfo);
        console.log(userSnapshot, userSnapshot.data());
        yield put(signInSucess({ id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(signInFailed(error));        
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
    yield(all([call(onCheckUserSession)]));
}