Here are **20 intermediate-level Redux problems** designed to help you **demonstrate a strong understanding of Redux principles**, middleware, and integration with React. These go beyond boilerplate and dive into useful patterns, edge cases, and API use.

---

### ⚙️ 1. **Persist Redux State to LocalStorage**

* Save a slice of Redux state (e.g., auth or cart) to `localStorage`.
* Load it when the app starts.
* Debounce saves to avoid performance hits.

---

### ⚙️ 2. **Redux Form State Management**

* Create a multi-step form where each step saves data to Redux.
* Show a final review page with all collected data.

---

### ⚙️ 3. **Middleware for Logging Actions**

* Write a custom Redux middleware that logs:

  * Action type
  * Payload
  * Current state
* Add support for enabling/disabling logging dynamically.

---

### ⚙️ 4. **Undo/Redo State with Redux**

* Track the state history of a counter or list app.
* Implement undo and redo using Redux and keyboard shortcuts.

---

### ⚙️ 5. **Async API Requests with Thunks**

* Fetch data using `redux-thunk`.
* Dispatch actions for `loading`, `success`, `failure`.
* Display the state in the UI.

---

### ⚙️ 6. **Handle Normalized Data in Redux**

* Store a list of users in normalized format:

  ```js
  {
    users: {
      byId: { 1: {…}, 2: {…} },
      allIds: [1, 2]
    }
  }
  ```
* Create selectors to get all users and specific user by ID.

---

### ⚙️ 7. **Redux DevTools Integration**

* Enable Redux DevTools only in development mode.
* Show time-travel and action inspection.

---

### ⚙️ 8. **Redux Slice Isolation**

* Create isolated slices (e.g., `auth`, `posts`, `notifications`).
* Show how each slice handles its own actions and selectors.

---

### ⚙️ 9. **Reset Store on Logout**

* Clear all Redux state when a user logs out.
* Optional: Preserve theme or language preferences.

---

### ⚙️ 10. **Redux State Hydration on Route Change**

* Pre-fetch and populate Redux store when navigating to certain routes (e.g., profile page).
* Use React Router + Thunk for async loading.

---

### ⚙️ 11. **Notification Queue System**

* Use Redux to manage a queue of toasts.
* Dispatch `ADD_NOTIFICATION` and auto-remove after timeout.
* Only show X toasts at once.

---

### ⚙️ 12. **Redux + RTK Query for Data Fetching**

* Use [Redux Toolkit Query (RTKQ)](https://redux-toolkit.js.org/rtk-query/overview) to:

  * Fetch list of posts
  * Automatically cache, refetch, and manage loading states

---

### ⚙️ 13. **Paginated API State Management**

* Store paginated data in Redux (e.g., page number, total count).
* Preserve state when user goes back to a previous page.

---

### ⚙️ 14. **Redux for Modal State**

* Centralize modal open/close state in Redux.
* Allow triggering modals from anywhere in the app.

---

### ⚙️ 15. **Redux for Feature Flags**

* Store feature flags in Redux from API.
* Conditionally render components based on flags.

---

### ⚙️ 16. **Redux Error Boundary Recovery**

* Catch app errors and show fallback UI.
* Allow Redux to reset broken state via action dispatch.

---

### ⚙️ 17. **Optimistic UI Updates with Redux**

* Immediately update UI when a user submits a form or likes a post.
* Roll back if the API request fails.

---

### ⚙️ 18. **Redux Entity Relationships**

* Manage relationships like:

  * Users have posts
  * Posts have comments
* Normalize and access via selectors.

---

### ⚙️ 19. **Redux Store with Refresh Token Logic**

* Use Redux to manage access and refresh tokens.
* Auto-refresh token when expired using a thunk or middleware.

---

### ⚙️ 20. **Redux + WebSocket Integration**

* Connect to a WebSocket server.
* Dispatch Redux actions when a new message or notification is received.
* Keep socket connection in middleware or a service.

---

These problems will test your grasp of:

* Redux architecture
* Middlewares
* Async patterns
* State normalization
* Integration with the rest of the React app

---

Would you like code templates or solutions for any of these? Or want the same level of tasks for **Redux Toolkit**, **Zustand**, or **React Query**?
