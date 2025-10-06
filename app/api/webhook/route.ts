// app/api/webhook/route.ts

import { headers } from 'next/headers';
import Stripe from 'stripe';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const orderItems = session.line_items; // You may need to fetch the line items
    const totalAmount = session.amount_total;

    await dbConnect();
    // Create a new order in your database
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      stripeSessionId: session.id,
      paymentStatus: 'completed',
    });
    await newOrder.save();

    return new NextResponse('Order created', { status: 200 });
  }

  return new NextResponse('Event not handled', { status: 400 });
}