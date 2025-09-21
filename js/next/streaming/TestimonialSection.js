// app/components/TestimonialsSection.js
async function TestimonialsSection() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 4000));
  
    const testimonials = [
      {
        name: "Sarah Johnson",
        role: "Product Manager",
        content: "The streaming implementation reduced our perceived load time by 60% and improved user engagement significantly."
      },
      {
        name: "Michael Chen",
        role: "Frontend Developer",
        content: "Suspense boundaries make it easy to create progressive loading experiences without complex state management."
      }
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default TestimonialsSection;