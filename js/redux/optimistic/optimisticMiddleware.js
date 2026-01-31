// optimisticMiddleware.js
export const optimisticMiddleware = store => next => action => {
    // You can add additional handling here if needed
    return next(action);
  };