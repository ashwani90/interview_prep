// routeActions.js
export const ROUTE_DATA_REQUEST = 'ROUTE_DATA_REQUEST';
export const ROUTE_DATA_SUCCESS = 'ROUTE_DATA_SUCCESS';
export const ROUTE_DATA_FAILURE = 'ROUTE_DATA_FAILURE';

export const loadRouteData = (routeName) => async (dispatch, getState) => {
  dispatch({ type: ROUTE_DATA_REQUEST, payload: { routeName } });
  
  try {
    let data = {};
    
    // Route-specific data loading
    switch(routeName) {
      case 'profile':
        const userId = getState().auth.user.id;
        const [userProfile, userPosts] = await Promise.all([
          fetch(`/api/users/${userId}`).then(res => res.json()),
          fetch(`/api/users/${userId}/posts`).then(res => res.json())
        ]);
        data = { userProfile, userPosts };
        break;
        
      case 'dashboard':
        data = await fetch('/api/dashboard').then(res => res.json());
        break;
        
      // Add more routes as needed
    }
    
    dispatch({ type: ROUTE_DATA_SUCCESS, payload: { routeName, data } });
    return data;
  } catch (error) {
    dispatch({ type: ROUTE_DATA_FAILURE, payload: { routeName, error } });
    throw error;
  }
};