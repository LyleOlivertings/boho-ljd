// app/product/[id]/page.tsx

'use client'; // Add this directive at the top

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductActions from '@/components/ProductActions';
import { useEffect, useState } from 'react';

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

export default function ProductPage({ params }: { params: { id: string } }) {
  // Use useEffect to fetch data on the client side if necessary, or pass the data as props
  // For simplicity, we'll keep the async data fetch here, but the component itself is now client-side.
  interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    reviews?: { id: string; user: string; rating: number; comment: string }[];
  }

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProduct(params.id);
      if (!fetchedProduct) {
        notFound();
      }
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>; // Or a nice skeleton loader
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-96 md:h-[600px] rounded-lg overflow-hidden shadow-xl"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>

        {/* Product Details & Actions Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-xl"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-900 leading-tight">
            {product.name}
          </h1>
          <p className="mt-2 text-xl font-medium text-neutral-600">R{product.price.toFixed(2)}</p>
          <p className="mt-6 text-neutral-700 leading-relaxed">{product.description}</p>
          
          <ProductActions product={product} />

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-serif text-neutral-900 border-b pb-2">Customer Reviews</h2>
            <div className="mt-4 space-y-4">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review: any) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-800">{review.user}</span>
                      <span className="text-yellow-500">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-600 italic">"{review.comment}"</p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-500">No reviews yet. Be the first to leave one!</p>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
