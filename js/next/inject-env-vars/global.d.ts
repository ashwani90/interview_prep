// types/global.d.ts
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        // Build information
        BUILD_ID?: string;
        BUILD_TIME?: string;
        
        // Public environment variables
        NEXT_PUBLIC_APP_ENV: string;
        NEXT_PUBLIC_APP_VERSION: string;
        NEXT_PUBLIC_SITE_URL: string;
        NEXT_PUBLIC_API_URL: string;
        NEXT_PUBLIC_GA_ID?: string;
        
        // Private environment variables (server-only)
        API_URL?: string;
        AUTH_SECRET?: string;
        DATABASE_URL?: string;
      }
    }
    
    interface Window {
      __ENV: {
        NEXT_PUBLIC_APP_ENV: string;
        NEXT_PUBLIC_APP_VERSION: string;
        NEXT_PUBLIC_SITE_URL: string;
        NEXT_PUBLIC_API_URL: string;
        NEXT_PUBLIC_GA_ID?: string;
      };
      __BUILD_INFO: {
        time: string;
        id: string;
        environment: string;
      };
    }
  }
  
  export {};