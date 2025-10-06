// app/api/products/route.ts

import { NextResponse } from 'next/server';

const mockProducts = [
  {
    id: '1',
    name: 'Boho Tassel Bag',
    description: 'A hand-woven bag with intricate tassel details.',
    price: 350,
    image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/tassel-bag.jpg',
  },
  {
    id: '2',
    name: 'Fringe Kimono',
    description: 'A light, airy kimono with a beautiful fringe.',
    price: 480,
    image: 'https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/fringe-kimono.jpg',
  },
];

export function GET() {
  return NextResponse.json(mockProducts);
}