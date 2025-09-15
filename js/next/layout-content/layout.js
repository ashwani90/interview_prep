// app/layout.js
import { AppProvider } from '../contexts/AppContext';
import { ThemeInitializer } from '../components/ThemeInitializer';
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'App with shared context across layouts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <ThemeInitializer />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}