import { createSelector } from "reselect";

const appState = state => state.app;

// memoized selector to get all cars data
export const getCarsLists = createSelector(
  [appState],
  (app) => app.data
);
