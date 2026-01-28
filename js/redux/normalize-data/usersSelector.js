import { createSelector } from 'reselect';

// Basic selectors
const selectUsersState = (state) => state.users;

export const selectUsersById = createSelector(
  [selectUsersState],
  (users) => users.byId
);

export const selectUsersAllIds = createSelector(
  [selectUsersState],
  (users) => users.allIds
);

export const selectUsersLoading = createSelector(
  [selectUsersState],
  (users) => users.loading
);

export const selectUsersError = createSelector(
  [selectUsersState],
  (users) => users.error
);

// Derived selectors
export const selectAllUsers = createSelector(
  [selectUsersById, selectUsersAllIds],
  (byId, allIds) => allIds.map(id => byId[id])
);

export const selectUserById = (userId) => createSelector(
  [selectUsersById],
  (byId) => byId[userId]
);

export const selectUsersCount = createSelector(
  [selectUsersAllIds],
  (allIds) => allIds.length
);