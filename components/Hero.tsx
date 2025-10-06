// components/Hero.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517702808076-21ce62dfd827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-30 backdrop-blur-sm"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 p-6 max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight drop-shadow-lg">
          LJD Boho Boutique
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-neutral-100 font-light italic">
          Crafted in the spirit of Cape Town.
        </p>
        <Link href="/products" passHref>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-white text-neutral-900 font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-neutral-200"
          >
            Explore the Collection
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}