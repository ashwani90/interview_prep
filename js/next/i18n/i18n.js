// lib/i18n.js
export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es', 'de', 'ja'],
  } as const;
  
  export type Locale = typeof i18n['locales'][number];
  
  // Translation dictionaries
  export const translations = {
    en: {
      home: {
        title: 'Welcome to our website',
        description: 'This is the home page in English',
      },
      about: {
        title: 'About Us',
        description: 'Learn more about our company',
      },
      navigation: {
        home: 'Home',
        about: 'About',
        contact: 'Contact',
      },
    },
    fr: {
      home: {
        title: 'Bienvenue sur notre site web',
        description: 'Ceci est la page d\'accueil en Français',
      },
      about: {
        title: 'À propos de nous',
        description: 'En savoir plus sur notre entreprise',
      },
      navigation: {
        home: 'Accueil',
        about: 'À propos',
        contact: 'Contact',
      },
    },
    es: {
      home: {
        title: 'Bienvenido a nuestro sitio web',
        description: 'Esta es la página principal en Español',
      },
      about: {
        title: 'Sobre nosotros',
        description: 'Conoce más sobre nuestra empresa',
      },
      navigation: {
        home: 'Inicio',
        about: 'Sobre',
        contact: 'Contacto',
      },
    },
    de: {
      home: {
        title: 'Willkommen auf unserer Website',
        description: 'Dies ist die Startseite auf Deutsch',
      },
      about: {
        title: 'Über uns',
        description: 'Erfahren Sie mehr über unser Unternehmen',
      },
      navigation: {
        home: 'Startseite',
        about: 'Über',
        contact: 'Kontakt',
      },
    },
    ja: {
      home: {
        title: '私たちのウェブサイトへようこそ',
        description: 'これは日本語のホームページです',
      },
      about: {
        title: '私たちについて',
        description: '私たちの会社についてもっと知る',
      },
      navigation: {
        home: 'ホーム',
        about: 'について',
        contact: 'お問い合わせ',
      },
    },
  };
  
  export function getTranslations(lang) {
    return translations[lang] || translations[i18n.defaultLocale];
  }
  
  // Language names for display
  export const languageNames = {
    en: 'English',
    fr: 'Français',
    es: 'Español',
    de: 'Deutsch',
    ja: '日本語',
  };
  
  // Helper to validate locale
  export function isValidLocale(locale) {
    return i18n.locales.includes(locale);
  }
  
  // Get user's preferred locale from Accept-Language header
  export function getPreferredLocale(request) {
    const acceptLanguage = request.headers.get('accept-language');
    if (!acceptLanguage) return i18n.defaultLocale;
  
    const languages = acceptLanguage.split(',').map(lang => {
      const [code, quality = 'q=1'] = lang.split(';');
      return {
        code: code.trim(),
        quality: parseFloat(quality.replace('q=', '')) || 1,
      };
    });
  
    // Sort by quality and find the first supported locale
    languages.sort((a, b) => b.quality - a.quality);
    
    for (const lang of languages) {
      const code = lang.code.split('-')[0]; // Convert en-US to en
      if (isValidLocale(code)) {
        return code;
      }
    }
  
    return i18n.defaultLocale;
  }