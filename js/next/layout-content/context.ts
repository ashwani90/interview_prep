// types/context.ts
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
  }
  
  export interface AppState {
    user: User | null;
    theme: string;
    language: string;
    notifications: Notification[];
    isLoading: boolean;
    sidebarOpen: boolean;
  }
  
  export interface AppActions {
    setUser: (user: User | null) => void;
    setTheme: (theme: string) => void;
    setLanguage: (language: string) => void;
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    removeNotification: (id: string) => void;
    setLoading: (loading: boolean) => void;
    toggleSidebar: () => void;
  }
  
  export type AppContextType = AppState & AppActions;