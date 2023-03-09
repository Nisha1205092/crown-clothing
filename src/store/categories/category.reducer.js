import { CATEGORY_ACTION_TYPE } from "./category.types";

const INITIAL_STATE = {
    categories: []
};

export const categoriesReducer = (state=INITIAL_STATE, action={}) => {
    const { type, payload } = action;
    console.log('inside categories reducer, payload: ', payload);

    switch(type) {
        case CATEGORY_ACTION_TYPE.SET_CATEGORIES:
            return {
                ...state, 
                categories: payload
            }
        default:
            return state; 
    }
}