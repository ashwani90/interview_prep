// app/[lang]/contact/page.js
import { getTranslations } from '../../../lib/i18n';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const t = getTranslations(lang);
  
  return {
    title: t.navigation.contact,
  };
}

export default function ContactPage({ params }) {
  const { lang } = params;
  const t = getTranslations(lang);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">{t.navigation.contact}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
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