// store.js
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import postsReducer from './postsSlice' // Your other reducers if any

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    posts: postsReducer, // Your other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

// Optional: Setup listeners for refetchOnFocus/refetchOnReconnect
// Requires adding setupListeners in your app's entry point
// import { setupListeners } from '@reduxjs/toolkit/query'
// setupListeners(store.dispatch)