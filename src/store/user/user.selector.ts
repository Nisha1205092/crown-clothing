import { createSelector } from "reselect"; // for memoized selectors, that remember outputs for same inputs
import { UserState } from "./user.reducer";
import { User } from "./user.types";
export const selectUserReducer = (state): UserState => state.user;

export const selectCurrentUser = createSelector([selectUserReducer], (userSlice): User | null => userSlice.currentUser);

export const selectUserIsLoading = createSelector([selectUserReducer], (userSlice): boolean => userSlice.isLoading);