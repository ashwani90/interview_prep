// app/[lang]/about/page.js
import { getTranslations } from '../../../lib/i18n';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const t = getTranslations(lang);
  
  return {
    title: t.about.title,
    description: t.about.description,
  };
}

export default function AboutPage({ params }) {
  const { lang } = params;
  const t = getTranslations(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">{t.about.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{t.about.description}</p>
      
      <div className="prose max-w-none">
        <p>This is the about page in {lang}.</p>
        <p>You can add your actual about content here.</p>
      </div>
      
      <div className="mt-8">
        <Link 
          href={`/${lang}`}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { locales } = await import('../../../lib/i18n');
  return locales.map((locale) => ({ lang: locale }));
}