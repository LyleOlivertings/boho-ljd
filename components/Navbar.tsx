// components/Navbar.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuVariants = {
    hidden: { x: '100%' },
    visible: {
      x: '0%',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" passHref>
          <div className="text-2xl font-serif font-bold text-neutral-900 cursor-pointer">
            LJD Boho Boutique
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} passHref>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
              >
                {link.name}
              </motion.div>
            </Link>
          ))}
          <Link href="/profile" passHref>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {/* User Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.div>
          </Link>
          <Link href="/cart" passHref>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {/* Shopping Cart Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.186 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <motion.button onClick={toggleMobileMenu} className="focus:outline-none z-[100]" animate={isMobileMenuOpen ? 'open' : 'closed'}>
            <motion.div
              className="w-6 h-1 bg-neutral-900 rounded-full my-1"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 7 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-1 bg-neutral-900 rounded-full my-1"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-1 bg-neutral-900 rounded-full my-1"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -7 },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="fixed top-0 left-0 w-full h-full bg-white text-neutral-900 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.5, delay: 0.2 + navLinks.indexOf(link) * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href={link.href} passHref>
                  <h2 className="text-3xl font-serif text-neutral-800">
                    {link.name}
                  </h2>
                </Link>
              </motion.div>
            ))}
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/profile" passHref>
                <h2 className="text-3xl font-serif text-neutral-800">Profile</h2>
              </Link>
            </motion.div>
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5, delay: 0.7 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/cart" passHref>
                <h2 className="text-3xl font-serif text-neutral-800">Cart</h2>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}