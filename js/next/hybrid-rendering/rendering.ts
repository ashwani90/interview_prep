// types/rendering.ts
export type RenderingStrategy = 'STATIC' | 'ISR' | 'SSR' | 'CSR';

export interface RenderingConfig {
  dynamic?: 'auto' | 'force-dynamic' | 'force-static' | 'error';
  revalidate?: number | false;
  dynamicParams?: boolean;
}

export interface PageMetrics {
  page: string;
  strategy: RenderingStrategy;
  duration: number;
  timestamp: number;
}