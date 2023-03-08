import { createAction } from "../../utils/reducers/reducers.utils";
import { CATEGORY_ACTION_TYPE } from "./category.types";

export const setCategoriesMap = (categoriesMap) =>
    createAction(CATEGORY_ACTION_TYPE.SET_CATEGORIES_MAP, categoriesMap);