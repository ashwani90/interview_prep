// app/layout.js
import { EnvProvider } from '../components/EnvProvider';
import { env } from '../lib/env';
import Script from 'next/script';

export const metadata = {
  title: 'My App',
  description: 'A Next.js application with environment-aware configuration',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Inject environment variables as global window variable */}
        <Script
          id="env-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.__ENV = ${JSON.stringify(env.client)};
              window.__BUILD_INFO = {
                time: '${new Date().toISOString()}',
                id: '${process.env.BUILD_ID || 'dev'}',
                environment: '${process.env.NEXT_PUBLIC_APP_ENV || 'development'}'
              };
            `,
          }}
        />
      </head>
      <body>
        <EnvProvider>
          {children}
        </EnvProvider>
      </body>
    </html>
  );
}