// types/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      // Server-side
      APP_ENV: 'development' | 'staging' | 'production';
      API_URL: string;
      API_TOKEN: string;
      USE_MOCK_DATA: string;
      
      // Client-side
      NEXT_PUBLIC_APP_ENV: string;
      NEXT_PUBLIC_API_URL: string;
    }
  }