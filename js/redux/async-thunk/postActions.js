import { fetchPosts, fetchPostDetails } from '../services/api';

// Action types
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST_DETAILS_REQUEST = 'FETCH_POST_DETAILS_REQUEST';
export const FETCH_POST_DETAILS_SUCCESS = 'FETCH_POST_DETAILS_SUCCESS';
export const FETCH_POST_DETAILS_FAILURE = 'FETCH_POST_DETAILS_FAILURE';

// Action creators
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error
});

// Thunk action for fetching posts
export const fetchPostsAction = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    try {
      const posts = await fetchPosts();
      dispatch(fetchPostsSuccess(posts));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };
};

// Similar actions for post details
export const fetchPostDetailsRequest = () => ({
  type: FETCH_POST_DETAILS_REQUEST
});

export const fetchPostDetailsSuccess = (post) => ({
  type: FETCH_POST_DETAILS_SUCCESS,
  payload: post
});

export const fetchPostDetailsFailure = (error) => ({
  type: FETCH_POST_DETAILS_FAILURE,
  payload: error
});

export const fetchPostDetailsAction = (postId) => {
  return async (dispatch) => {
    dispatch(fetchPostDetailsRequest());
    try {
      const post = await fetchPostDetails(postId);
      dispatch(fetchPostDetailsSuccess(post));
    } catch (error) {
      dispatch(fetchPostDetailsFailure(error.message));
    }
  };
};