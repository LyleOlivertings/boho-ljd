// components/Hero.tsx

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png" // Using the image from the public folder
          alt="LJD Boho Boutique hero image"
          fill // Fill the parent container
          style={{ objectFit: 'cover' }}
          priority // Prioritize loading this image for better performance
          className="transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 backdrop-blur-sm"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 p-6 max-w-2xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight drop-shadow-lg">
          LJD Boho Boutique
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-neutral-100 font-light italic drop-shadow-lg">
          Crafted in the spirit of Cape Town.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/products?sort=latest" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-neutral-900 font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-neutral-200"
            >
              Shop Latest Arrivals
            </motion.button>
          </Link>
          <Link href="/products" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-white hover:text-neutral-900"
            >
              Browse All
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}