// pages/_app.tsx (with TypeScript)
import { AppPropsWithLayout } from '../types/next';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;