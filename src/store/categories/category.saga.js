import { all, call, put, takeLatest } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action";
import { CATEGORY_ACTION_TYPE } from "./category.types";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments); // async
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
};

// generators listen to actions
export function* onFetchCategories() {
    // "take" is where we receive "actions"
    yield takeLatest(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START, fetchCategoriesAsync);

}

export function* categoriesSaga() { // holds all sagas related to Categories
    // works like an accumulator
    yield all([call(onFetchCategories)]);
}