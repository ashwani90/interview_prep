import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
  } from '../actions/userActions';
  
  const initialState = {
    byId: {},
    allIds: [],
    loading: false,
    error: null
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          byId: action.payload.byId,
          allIds: action.payload.allIds,
          error: null
        };
  
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default usersReducer;