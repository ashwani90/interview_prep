// types/preload.ts
export interface PreloadedData {
    [key: string]: any;
    timestamp: number;
  }
  
  export interface PreloadConfig {
    routes: {
      [path: string]: {
        apiUrls: string[];
        cacheTime?: number;
        priority?: number;
      };
    };
  }
  
  export interface PreloadResult {
    success: boolean;
    data?: any;
    error?: string;
    timestamp: number;
  }