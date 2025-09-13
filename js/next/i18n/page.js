// app/[lang]/page.js
import { getTranslations } from '../../lib/i18n';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const t = getTranslations(lang);
  
  return {
    title: t.home.title,
    description: t.home.description,
  };
}

export default function HomePage({ params }) {
  const { lang } = params;
  const t = getTranslations(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">{t.home.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{t.home.description}</p>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Available Pages:</h2>
        <div className="space-y-2">
          <Link 
            href={`/${lang}/about`}
            className="block text-blue-600 hover:text-blue-800"
          >
            → {t.navigation.about}
          </Link>
          <Link 
            href={`/${lang}/contact`}
            className="block text-blue-600 hover:text-blue-800"
          >
            → {t.navigation.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}