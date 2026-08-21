import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Require Stripe secret key
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const stripePublishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripeSecret || !stripePublishable) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const { items = [], success_url, cancel_url, customer = {} } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
  }

  // Dynamically import stripe
  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' });

  // Map items to Stripe line items
  const line_items = items.map((it: any) => ({
    price_data: {
      currency: 'pkr',
      product_data: {
        name: it.product.name,
        description: it.product.short_description ?? undefined,
        images: it.product.primary_image ? [it.product.primary_image] : undefined,
      },
      unit_amount: Math.round((it.unit_price || 0) * 100),
    },
    quantity: it.quantity || 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: success_url ?? `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url ?? `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/checkout`,
      metadata: {
        // include minimal metadata to help match orders later
        customer_email: customer.email ?? '',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Stripe error' }, { status: 500 });
  }
}
