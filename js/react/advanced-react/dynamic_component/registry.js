// Static component registry (could be loaded from API)
export const componentRegistry = {
    heroBanner: {
      name: 'HeroBanner',
      path: './components/dynamic/HeroBanner'
    },
    featureGrid: {
      name: 'FeatureGrid',
      path: './components/dynamic/FeatureGrid'
    },
    testimonialSlider: {
      name: 'TestimonialSlider',
      path: './components/dynamic/TestimonialSlider'
    },
    ctaSection: {
      name: 'CTASection',
      path: './components/dynamic/CTASection'
    }
  };
  
  // Async function to load component (simulating API fetch)
  export const fetchComponentConfig = async (componentId) => {
    // In a real app, this would fetch from a CMS/API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: componentId,
          type: componentId,
          props: {
            // Default props - could be overridden by CMS data
            title: `Dynamic ${componentId}`,
            content: `This is a dynamically loaded ${componentId} component`
          }
        });
      }, 300); // Simulate network delay
    });
  };