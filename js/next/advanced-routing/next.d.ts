// types/next.d.ts
import { NextPage } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export interface DynamicPageProps {
  params: Promise<Params>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export type DynamicPage = NextPage<DynamicPageProps>;

// Route pattern types
export interface RoutePattern {
  segments: string[];
  validation?: (slug: string[]) => boolean;
  metadata?: (params: Params) => Promise<{
    title: string;
    description: string;
  }>;
}

export interface RouteValidationResult {
  isValid: boolean;
  params?: Record<string, string>;
  error?: string;
}