// app/page.tsx

import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';

// This is a mock data fetching function. In a real app,
// you would fetch from your /api/products endpoint.
async function getProducts() {
  const products = [
    {
      id: '1',
      name: 'Boho Tassel Bag',
      price: 350,
      image: '/tassel-bag.webp',
    },
    {
      id: '2',
      name: 'Fringe Kimono',
      price: 480,
      image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/fringe-kimono.jpg',
    },
    {
      id: '3',
      name: 'Woven Sun Hat',
      price: 250,
      image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/woven-hat.jpg',
    },
    {
      id: '4',
      name: 'Feather Earrings',
      price: 180,
      image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/feather-earrings.jpg',
    },
  ];
  return products;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-800">
      <Hero />
      <FeaturedProducts products={products} />
      {/* Add other sections here like a "Shop the Look" or "About Us" section */}
    </main>
  );
}