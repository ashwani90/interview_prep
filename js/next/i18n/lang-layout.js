// app/[lang]/layout.js
import { i18n, isValidLocale } from '../../lib/i18n';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function LangLayout({ children, params }) {
  const { lang } = params;
  
  if (!isValidLocale(lang)) {
    // This should be handled by middleware, but just in case
    return notFound();
  }

  return (
    <html lang={lang}>
      <body>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-xl font-semibold">
                {lang.toUpperCase()}
              </div>
              <LanguageSwitcher currentLang={lang} />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Multilingual Site',
  description: 'Internationalized website',
};