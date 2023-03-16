import { createAction } from "../../utils/reducers/reducers.utils";
import { CATEGORY_ACTION_TYPE } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () =>
    createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
    createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) =>
    createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error);

// redux-thunk
export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try {
        const categoriesArray = getCategoriesAndDocuments(); // async
        console.log('typeof categoriesArray: ', typeof(categoriesArray));
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
};

