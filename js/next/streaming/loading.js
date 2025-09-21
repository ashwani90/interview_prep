// app/loading.js
import SectionSkeleton from './components/SectionSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header loads immediately */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Skeleton sections */}
      <div className="space-y-8">
        <SectionSkeleton type="hero" />
        <SectionSkeleton type="features" />
        <SectionSkeleton type="testimonials" />
        <SectionSkeleton type="pricing" />
      </div>

      {/* Footer loads immediately */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-6 bg-gray-700 rounded w-48 mx-auto animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-64 mx-auto animate-pulse"></div>
        </div>
      </footer>
    </div>
  );
}