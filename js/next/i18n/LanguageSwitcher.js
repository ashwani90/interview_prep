// components/LanguageSwitcher.js
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, languageNames } from '../lib/i18n';

export default function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (newLang) => {
    // Replace the current locale in the pathname
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPathname);
  };

  return (
    <div className="relative">
      <select
        value={currentLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {i18n.locales.map((locale) => (
          <option key={locale} value={locale}>
            {languageNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}