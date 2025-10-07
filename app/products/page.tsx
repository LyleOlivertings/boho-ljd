// app/products/page.tsx

import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products');
  if (!res.ok) {
    // It's good practice to log or handle the error properly
    console.error('Failed to fetch products');
    return []; // Return an empty array on failure
  }
  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const allProducts = await getProducts();
  // Access the category parameter safely
  const category = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category;

  const filteredProducts = category
    ? allProducts.filter((product: any) => product.category === category)
    : allProducts;

  if (allProducts.length === 0) {
    return <div className="text-center p-10">No products found.</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Filter products={allProducts} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}