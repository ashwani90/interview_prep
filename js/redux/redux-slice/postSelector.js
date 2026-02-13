import { createSelector } from '@reduxjs/toolkit';

export const selectPostsState = (state) => state.posts;

export const selectAllPosts = createSelector(
  [selectPostsState],
  (posts) => posts.items
);

export const selectPostById = (postId) => createSelector(
  [selectAllPosts],
  (posts) => posts.find(post => post.id === postId)
);

export const selectPostsByUser = (userId) => createSelector(
  [selectAllPosts],
  (posts) => posts.filter(post => post.user === userId)
);

export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;