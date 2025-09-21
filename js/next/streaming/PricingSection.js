// app/components/PricingSection.js
async function PricingSection() {
    // Longest delay for the least critical content
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    const plans = [
      {
        name: "Starter",
        price: "$19",
        features: ["Basic features", "5 projects", "Email support"]
      },
      {
        name: "Professional",
        price: "$49",
        features: ["All features", "Unlimited projects", "Priority support", "Advanced analytics"]
      },
      {
        name: "Enterprise",
        price: "$99",
        features: ["Everything in Pro", "Dedicated account manager", "Custom integrations", "SLA guarantee"]
      }
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`p-8 rounded-lg border-2 ${
                index === 1 
                  ? 'border-blue-500 shadow-xl scale-105' 
                  : 'border-gray-200 shadow-sm'
              }`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">{plan.price}<span className="text-sm font-normal text-gray-600">/month</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold ${
                  index === 1
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  export default PricingSection;