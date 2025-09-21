// app/page.js
import { Suspense } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import SectionSkeleton from './components/SectionSkeleton';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Immediate render - no suspense needed */}
      <Header />
      
      {/* Stream each section independently */}
      <Suspense fallback={<SectionSkeleton type="hero" />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton type="features" />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton type="testimonials" />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton type="pricing" />}>
        <PricingSection />
      </Suspense>

      {/* Footer renders immediately */}
      <Footer />
    </div>
  );
}

// Optional: Add loading state for the entire page
export function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="space-y-8">
        <SectionSkeleton type="hero" />
        <SectionSkeleton type="features" />
        <SectionSkeleton type="testimonials" />
        <SectionSkeleton type="pricing" />
      </div>
      <Footer />
    </div>
  );
}