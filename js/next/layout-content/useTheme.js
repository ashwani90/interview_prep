// hooks/useTheme.js
import { useApp } from '../contexts/AppContext';

export function useTheme() {
  const { theme, setTheme } = useApp();
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update document class for Tailwind dark mode
    if (typeof document !== 'undefined') {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}