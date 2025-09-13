// types/i18n.d.ts
export type Locale = 'en' | 'fr' | 'es' | 'de' | 'ja';

export interface TranslationDictionary {
  home: {
    title: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
  };
  navigation: {
    home: string;
    about: string;
    contact: string;
  };
}

declare module '../lib/i18n' {
  export const i18n: {
    defaultLocale: Locale;
    locales: Locale[];
  };
  
  export function isValidLocale(locale: string): locale is Locale;
  export function getTranslations(lang: string): TranslationDictionary;
}