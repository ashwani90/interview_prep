// routeMiddleware.js
import { loadRouteData } from './routeActions';

export const routeMiddleware = (store) => (next) => (action) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const { pathname } = action.payload.location;
    
    // Map routes to their data loading requirements
    const routeMap = {
      '/profile': 'profile',
      '/dashboard': 'dashboard',
      // Add more route mappings
    };
    
    const routeName = routeMap[pathname];
    if (routeName) {
      store.dispatch(loadRouteData(routeName));
    }
  }
  
  return next(action);
};