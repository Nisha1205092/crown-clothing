import { createAction, Action, ActionWithPayload } from "../../utils/reducers/reducers.utils";
import { CATEGORY_ACTION_TYPE, Category, withMatcher } from "./category.types";

export type FetchCategoriesStart = Action<CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_FAILED, Error>; 

// matchable action creators with the use of withMatcher
export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
    createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_START));

export const fetchCategoriesSuccess = withMatcher((categories: Category[]): FetchCategoriesSuccess =>
    createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, categories));

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
    createAction(CATEGORY_ACTION_TYPE.FETCH_CATEGORIES_FAILED, error));

