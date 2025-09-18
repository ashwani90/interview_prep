// hooks/useEnvironment.js
export const useEnvironment = () => {
    const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';
    const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging';
    const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development';
    
    // Fallback to NODE_ENV if APP_ENV is not set
    const environment = process.env.NEXT_PUBLIC_APP_ENV || 
                       (process.env.NODE_ENV === 'production' ? 'production' : 'development');
  
    return {
      isProduction,
      isStaging,
      isDevelopment,
      environment,
      isCrawlable: isProduction && !isStaging,
    };
  };