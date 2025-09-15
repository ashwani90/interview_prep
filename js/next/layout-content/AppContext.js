// contexts/AppContext.js
'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  theme: 'light',
  language: 'en',
  notifications: [],
  isLoading: true,
  sidebarOpen: false,
};

// Action types
const actionTypes = {
  SET_USER: 'SET_USER',
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_LOADING: 'SET_LOADING',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    case actionTypes.SET_THEME:
      // Save to localStorage for persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
      }
      return { ...state, theme: action.payload };
    
    case actionTypes.SET_LANGUAGE:
      return { ...state, language: action.payload };
    
    case actionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    
    case actionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
      };
    
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case actionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Context provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize state from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    
    if (savedTheme) {
      dispatch({ type: actionTypes.SET_THEME, payload: savedTheme });
    }
    
    if (savedLanguage) {
      dispatch({ type: actionTypes.SET_LANGUAGE, payload: savedLanguage });
    }
    
    // Simulate user loading
    const loadUser = async () => {
      try {
        // In a real app, you might fetch user data from an API
        const userData = JSON.parse(localStorage.getItem('user')) || null;
        dispatch({ type: actionTypes.SET_USER, payload: userData });
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      }
    };

    loadUser();
  }, []);

  // Actions
  const actions = {
    setUser: (user) => dispatch({ type: actionTypes.SET_USER, payload: user }),
    
    setTheme: (theme) => dispatch({ type: actionTypes.SET_THEME, payload: theme }),
    
    setLanguage: (language) => {
      localStorage.setItem('language', language);
      dispatch({ type: actionTypes.SET_LANGUAGE, payload: language });
    },
    
    addNotification: (notification) => {
      const id = Date.now().toString();
      dispatch({
        type: actionTypes.ADD_NOTIFICATION,
        payload: { id, ...notification },
      });
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        actions.removeNotification(id);
      }, 5000);
    },
    
    removeNotification: (id) => 
      dispatch({ type: actionTypes.REMOVE_NOTIFICATION, payload: id }),
    
    setLoading: (loading) => 
      dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    
    toggleSidebar: () => dispatch({ type: actionTypes.TOGGLE_SIDEBAR }),
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
}