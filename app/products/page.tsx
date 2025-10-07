// app/products/page.tsx

import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    console.error('Failed to fetch products');
    return [];
  }
  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const allProducts = await getProducts();
  
  if (allProducts.length === 0) {
    return <div className="text-center p-10">No products found.</div>;
  }

  // Parse filters from searchParams safely
  const categories = (searchParams['category'] as string)?.split(',') || [];
  const colors = (searchParams['color'] as string)?.split(',') || [];
  const sizes = (searchParams['size'] as string)?.split(',') || [];
  const minPrice = parseFloat((searchParams['minPrice'] as string) || '0');
  const maxPrice = parseFloat((searchParams['maxPrice'] as string) || '1000');

  const filteredProducts = allProducts.filter((product: any) => {
    const passesCategory = categories.length === 0 || categories.includes(product.category);
    const passesColor = colors.length === 0 || product.colors.some((color: string) => colors.includes(color));
    const passesSize = sizes.length === 0 || product.sizes.some((size: string) => sizes.includes(size));
    const passesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    return passesCategory && passesColor && passesSize && passesPrice;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif text-neutral-900 text-center mb-8">All Products</h1>
      <div className="lg:flex lg:space-x-8">
        <aside className="lg:w-1/4 mb-8 lg:mb-0">
          <Filter products={allProducts} />
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}