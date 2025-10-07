// components/ProductActions.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProductActions({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Implement cart logic here. For now, we'll just log the selection.
    console.log({
      productId: product.id,
      quantity,
      selectedColor,
      selectedSize,
    });
    alert(`Added ${quantity} of ${product.name} to cart!`);
  };

  const handleReviewSubmit = () => {
    // Implement review submission logic here. For now, a placeholder.
    alert('Review submitted! (This is a demo)');
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Color Options */}
      {product.colors && product.colors.length > 1 && (
        <div>
          <h3 className="font-semibold text-neutral-800 mb-2">Color: {selectedColor}</h3>
          <div className="flex gap-2">
            {product.colors.map((color: string) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ease-in-out ${
                  selectedColor === color ? 'border-neutral-900 scale-110' : 'border-neutral-300'
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Options */}
      {product.sizes && product.sizes.length > 1 && (
        <div>
          <h3 className="font-semibold text-neutral-800 mb-2">Size: {selectedSize}</h3>
          <div className="flex gap-2">
            {product.sizes.map((size: string) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full border-2 transition-colors duration-200 ${
                  selectedSize === size
                    ? 'bg-neutral-800 text-white border-neutral-800'
                    : 'bg-white text-neutral-600 border-neutral-300'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Add to Cart Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="quantity" className="font-semibold text-neutral-800">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)) || 1)}
            min="1"
            className="w-20 text-center border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-neutral-300"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="w-full sm:w-auto px-8 py-3 bg-neutral-900 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-neutral-800"
        >
          Add to Cart
        </motion.button>
      </div>

      {/* Review Form (Placeholder) */}
      <div className="mt-8">
        <h3 className="font-semibold text-neutral-800 mb-2">Leave a Review</h3>
        <textarea
          placeholder="Write your review here..."
          className="w-full h-24 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-300"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReviewSubmit}
          className="mt-2 px-6 py-2 bg-neutral-800 text-white rounded-full transition-colors duration-200 hover:bg-neutral-700"
        >
          Submit Review
        </motion.button>
      </div>
    </div>
  );
}