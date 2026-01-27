export const normalizeUsers = (usersArray) => {
    return usersArray.reduce((result, user) => {
      return {
        byId: {
          ...result.byId,
          [user.id]: user
        },
        allIds: [...result.allIds, user.id]
      };
    }, { byId: {}, allIds: [] });
  };
  
  // Example usage:
  // const normalizedData = normalizeUsers(usersArray);