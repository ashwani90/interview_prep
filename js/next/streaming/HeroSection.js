// app/components/HeroSection.js
async function HeroSection() {
    // Simulate data fetching delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const heroData = {
      title: "Welcome to Our Platform",
      subtitle: "Streaming content with React Suspense and Server Components",
      cta: "Get Started"
    };
  
    return (
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">{heroData.title}</h1>
          <p className="text-xl mb-8 opacity-90">{heroData.subtitle}</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {heroData.cta}
          </button>
        </div>
      </section>
    );
  }
  
  export default HeroSection;