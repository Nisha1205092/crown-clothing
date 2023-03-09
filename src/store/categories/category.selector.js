export const selectCategoriesMap = (state) => {
    console.log('state inside selectCategoriesMap ', state.categories.categories);
    return state.categories.categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
}
// selectors perform transformation operation on
// basic data fetched from APIs.  