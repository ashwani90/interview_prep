export const selectActiveUsers = createSelector(
    [selectAllUsers],
    (users) => users.filter(user => user.isActive)
  );
  
  export const selectUsersByCompany = (companyId) => createSelector(
    [selectAllUsers],
    (users) => users.filter(user => user.companyId === companyId)
  );