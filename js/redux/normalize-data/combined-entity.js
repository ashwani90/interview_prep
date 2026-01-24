export const selectUserWithPosts = (userId) => createSelector(
    [selectUserById(userId), selectAllPosts],
    (user, posts) => {
      if (!user) return null;
      return {
        ...user,
        posts: posts.filter(post => post.userId === userId)
      };
    }
  );