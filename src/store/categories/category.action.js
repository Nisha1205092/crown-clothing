import { createAction } from "../../utils/reducers/reducers.utils";
import { CATEGORY_ACTION_TYPE } from "./category.types";

export const setCategories = (categories) =>
    createAction(CATEGORY_ACTION_TYPE.SET_CATEGORIES, categories);