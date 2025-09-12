// app/(static)/about/page.js
export default function AboutPage() {
    return (
      <div>
        <h1>About Us</h1>
        <p>This page is statically generated at build time.</p>
      </div>
    );
  }
  
  // Mark as static - no configuration needed for pure static pages
  export const dynamic = 'error'; // Ensure no dynamic behavior
  
  // Optional: Generate static params if needed
  export async function generateStaticParams() {
    return []; // No dynamic params for static pages
  }
  
  export const metadata = {
    title: 'About Us - Static Page',
    description: 'Learn more about our company',
  };