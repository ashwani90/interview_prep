// app/products/[id]/page.js
import { getProductData } from '@/lib/edge-data';

export const runtime = 'edge';

export async function generateStaticParams() {
  // Generate static params for top products
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function ProductPage({ params }) {
  const product = await getProductData(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="bg-blue-100 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          Served from edge location near you! 🚀
        </p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const product = await getProductData(params.id);
  
  return {
    title: `${product.name} - Our Store`,
    description: product.description,
  };
}