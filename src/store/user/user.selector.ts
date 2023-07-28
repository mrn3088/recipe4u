import { UserState } from "./user.reducer";

import { RootState } from "../store";

import { createSelector } from "reselect";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (userState) => userState.currentUser
);
