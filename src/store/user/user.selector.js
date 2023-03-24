import { createSelector } from "reselect"; // for memoized selectors, that remember outputs for same inputs

export const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector([selectUserReducer], (userSlice) => userSlice.currentUser);

export const selectUserIsLoading = createSelector([selectUserReducer], (userSlice) => userSlice.isLoading);