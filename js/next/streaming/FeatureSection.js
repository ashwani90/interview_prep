// app/components/FeaturesSection.js
async function FeaturesSection() {
    // Simulate longer data fetching
    await new Promise(resolve => setTimeout(resolve, 3000));
  
    const features = [
      {
        title: "Instant Loading",
        description: "Stream content as it becomes available for better perceived performance."
      },
      {
        title: "Progressive Enhancement",
        description: "Users see content gradually instead of waiting for everything to load."
      },
      {
        title: "Better UX",
        description: "Skeleton screens provide visual feedback during loading."
      }
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default FeaturesSection;