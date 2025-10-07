// app/api/products/[id]/route.ts

import { NextResponse } from 'next/server';

const mockProducts = [
  {
    id: '1',
    name: 'Boho Tassel Bag',
    description: 'A hand-woven bag with intricate tassel details.',
    price: 350,
    category: 'Bags',
    image: '/tassel-bag.webp',
    colors: ['Beige', 'Brown'],
    sizes: ['One Size'],
    reviews: [
      { id: 'a', user: 'Zanele', rating: 5, comment: 'I love this bag! The quality is amazing.' },
      { id: 'b', user: 'Thabo', rating: 4, comment: 'Great bag, looks just like the picture.' },
    ],
  },
  {
    id: '2',
    name: 'Fringe Kimono',
    description: 'A light, airy kimono with a beautiful fringe.',
    price: 480,
    category: 'Apparel',
    image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/fringe-kimono.jpg',
    colors: ['White', 'Black', 'Blue'],
    sizes: ['S', 'M', 'L'],
    reviews: [
      { id: 'c', user: 'Nomusa', rating: 5, comment: 'So comfortable and stylish!' },
    ],
  },
  {
    id: '3',
    name: 'Woven Sun Hat',
    description: 'Perfect for a sunny day on the beach.',
    price: 250,
    category: 'Accessories',
    image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/woven-hat.jpg',
    colors: ['Straw', 'Khaki'],
    sizes: ['One Size'],
    reviews: [],
  },
  {
    id: '4',
    name: 'Feather Earrings',
    description: 'Delicate earrings with a feather motif.',
    price: 180,
    category: 'Jewelry',
    image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/feather-earrings.jpg',
    colors: ['Silver', 'Gold'],
    sizes: ['One Size'],
    reviews: [
      { id: 'd', user: 'Sipho', rating: 5, comment: 'Beautiful and unique! I love them.' },
    ],
  },
  {
    id: '5',
    name: 'Silk Scarf',
    description: 'A smooth and elegant scarf.',
    price: 300,
    category: 'Accessories',
    image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/silk-scarf.jpg',
    colors: ['Pink', 'Green', 'Purple'],
    sizes: ['One Size'],
    reviews: [],
  },
  {
    id: '6',
    name: 'Embroidered Dress',
    description: 'A beautiful dress with hand-embroidered details.',
    price: 750,
    category: 'Apparel',
    image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/embroidered-dress.jpg',
    colors: ['White', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL'],
    reviews: [],
  },
];

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const product = mockProducts.find((p) => p.id === params.id);
  
  if (!product) {
    return new NextResponse(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.json(product);
}