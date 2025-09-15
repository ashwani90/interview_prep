// components/ThemeInitializer.js
'use client';

import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export function ThemeInitializer() {
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize theme class on document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null; // This component doesn't render anything
}