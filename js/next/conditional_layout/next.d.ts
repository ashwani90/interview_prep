// types/next.d.ts
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};