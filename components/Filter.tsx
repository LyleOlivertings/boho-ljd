// components/Filter.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const containerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

const filterSectionVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Filter({ products }: { products: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedFilters, setSelectedFilters] = useState({
    category: new Set<string>(),
    color: new Set<string>(),
    size: new Set<string>(),
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  // Extract unique options from products
  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  const uniqueColors = [...new Set(products.flatMap((p) => p.colors || []))];
  const uniqueSizes = [...new Set(products.flatMap((p) => p.sizes || []))];

  useEffect(() => {
    // Sync state with URL search params on mount and change
    const params = new URLSearchParams(searchParams.toString());
    const newFilters = {
      category: new Set(params.get('category')?.split(',') || []),
      color: new Set(params.get('color')?.split(',') || []),
      size: new Set(params.get('size')?.split(',') || []),
    };
    setSelectedFilters(newFilters);
    setPriceRange([
      parseFloat(params.get('minPrice') || '0'),
      parseFloat(params.get('maxPrice') || '1000'),
    ]);
  }, [searchParams]);

  const updateUrl = (newFilters: typeof selectedFilters, newPriceRange: [number, number]) => {
    const params = new URLSearchParams();
    
    if (newFilters.category.size > 0) {
      params.set('category', Array.from(newFilters.category).join(','));
    }
    if (newFilters.color.size > 0) {
      params.set('color', Array.from(newFilters.color).join(','));
    }
    if (newFilters.size.size > 0) {
      params.set('size', Array.from(newFilters.size).join(','));
    }
    if (newPriceRange[0] > 0) {
      params.set('minPrice', newPriceRange[0].toString());
    }
    if (newPriceRange[1] < 1000) {
      params.set('maxPrice', newPriceRange[1].toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (type: keyof typeof selectedFilters, value: string) => {
    const newFilters = { ...selectedFilters };
    if (newFilters[type].has(value)) {
      newFilters[type].delete(value);
    } else {
      newFilters[type].add(value);
    }
    setSelectedFilters(newFilters);
    updateUrl(newFilters, priceRange);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [min, max] = priceRange;
    const value = parseFloat(e.target.value);
    const newRange: [number, number] = e.target.name === 'min' ? [value, max] : [min, value];
    setPriceRange(newRange);
  };
  
  const handlePriceApply = () => {
    updateUrl(selectedFilters, priceRange);
  };

  const handleClearAll = () => {
    setSelectedFilters({ category: new Set(), color: new Set(), size: new Set() });
    setPriceRange([0, 1000]);
    router.push(pathname);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif text-neutral-800">Filters</h2>
        <motion.button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          {isFilterOpen ? 'Hide' : 'Show'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="mt-4 overflow-hidden"
          >
            <div className="space-y-6">
              {/* Price Filter */}
              <motion.div variants={filterSectionVariants}>
                <h3 className="font-semibold text-neutral-800 mb-2">Price Range (R{priceRange[0]} - R{priceRange[1]})</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    name="min"
                    min="0"
                    max="1000"
                    value={priceRange[0]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    name="max"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <motion.button 
                  onClick={handlePriceApply}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 px-4 py-1 text-sm bg-neutral-800 text-white rounded-full transition-colors"
                >
                  Apply Price
                </motion.button>
              </motion.div>

              {/* Category Filter */}
              <motion.div variants={filterSectionVariants}>
                <h3 className="font-semibold text-neutral-800 mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueCategories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilterChange('category', category)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                        selectedFilters.category.has(category)
                          ? 'bg-neutral-800 text-white shadow-md'
                          : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              {/* Color Filter */}
              <motion.div variants={filterSectionVariants}>
                <h3 className="font-semibold text-neutral-800 mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueColors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilterChange('color', color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedFilters.color.has(color) ? 'border-neutral-900 scale-110' : 'border-neutral-300'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      aria-label={`Filter by color ${color}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Size Filter */}
              <motion.div variants={filterSectionVariants}>
                <h3 className="font-semibold text-neutral-800 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueSizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFilterChange('size', size)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                        selectedFilters.size.has(size)
                          ? 'bg-neutral-800 text-white shadow-md'
                          : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.button
                onClick={handleClearAll}
                className="w-full mt-4 px-4 py-2 text-sm text-center text-neutral-500 border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors"
              >
                Clear All Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}