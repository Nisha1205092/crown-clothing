import { AnyAction } from "redux";
import { Category } from "./category.types";
import { 
    fetchCategoriesFailed, 
    fetchCategoriesStart, 
    fetchCategoriesSuccess 
} from "./category.action";

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
};

export const categoriesReducer = (
    state=INITIAL_STATE, 
    action={} as AnyAction
    ): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true };
    }
    if (fetchCategoriesSuccess.match(action)) {
        return { ...state, categories: action.payload, isLoading: false };
    }
    if (fetchCategoriesFailed.match(action)) {
        return { ...state, isLoading: false, error: action.payload };
    }
    return state;
}