import {
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_POST_DETAILS_REQUEST,
    FETCH_POST_DETAILS_SUCCESS,
    FETCH_POST_DETAILS_FAILURE
  } from '../actions/postActions';
  
  const initialState = {
    posts: [],
    postDetails: null,
    loading: false,
    error: null
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POSTS_REQUEST:
      case FETCH_POST_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_POSTS_SUCCESS:
        return {
          ...state,
          loading: false,
          posts: action.payload,
          error: null
        };
  
      case FETCH_POST_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          postDetails: action.payload,
          error: null
        };
  
      case FETCH_POSTS_FAILURE:
      case FETCH_POST_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default postReducer;