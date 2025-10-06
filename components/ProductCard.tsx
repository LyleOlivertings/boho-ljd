// components/ProductCard.tsx

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductCard({ product }: { product: any }) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300"
    >
      <Link href={`/product/${product.id}`} passHref>
        <div className="relative w-full h-80 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-medium text-neutral-900 mb-1">
            {product.name}
          </h3>
          <p className="text-md text-neutral-600 font-light">
            R{product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}