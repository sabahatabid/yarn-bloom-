import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json({ ok: false, message: 'Stripe webhook not configured' }, { status: 500 });
  }

  if (!supabaseUrl || !supabaseServiceRole) {
    return NextResponse.json({ ok: false, message: 'Supabase service key not configured' }, { status: 500 });
  }

  const payload = await req.text();
  const sig = req.headers.get('stripe-signature') ?? '';

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' });

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: `Webhook error: ${err.message}` }, { status: 400 });
  }

  // Only process checkout completions
  if (event.type === 'checkout.session.completed') {
    try {
      const session = event.data.object as any;

      // Retrieve the session with line items
      const sessionWithLines = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product', 'customer_details'],
      });

      const line_items = (sessionWithLines as any).line_items?.data ?? [];

      // Compute subtotal (in currency units)
      const subtotal = line_items.reduce((sum: number, li: any) => {
        const unit = (li.price?.unit_amount ?? 0) / 100;
        return sum + unit * (li.quantity ?? 1);
      }, 0);

      const DELIVERY_FREE_THRESHOLD = 3000;
      const DELIVERY_FEE = 250;
      const delivery_fee = subtotal >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE;
      const total = subtotal + delivery_fee;

      // Build order payload
      const orderNumber = `YB-${Date.now().toString(36)}-${Math.floor(Math.random() * 9000) + 1000}`;

      const customer: any = (sessionWithLines as any).customer_details ?? {};

      // Create Supabase client with service role key
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseServiceRole, {
        auth: { persistSession: false },
      });

      // Insert order
      const orderInsert = {
        order_number: orderNumber,
        user_id: null,
        customer_name: customer.name ?? sessionWithLines.metadata?.customer_name ?? 'Guest',
        customer_email: customer.email ?? sessionWithLines.metadata?.customer_email ?? '',
        customer_phone: customer.phone ?? sessionWithLines.metadata?.customer_phone ?? '',
        delivery_address: sessionWithLines.metadata?.delivery_address ?? '',
        city: sessionWithLines.metadata?.city ?? '',
        order_notes: sessionWithLines.metadata?.order_notes ?? null,
        subtotal: subtotal,
        delivery_fee: delivery_fee,
        total: total,
        payment_method: 'card',
        payment_status: 'paid',
        status: 'confirmed',
      };

      const { data: orderData, error: orderError } = await supabase.from('orders').insert(orderInsert).select().single();
      if (orderError || !orderData) {
        // log error and continue
        console.error('Failed to insert order:', orderError);
        return NextResponse.json({ ok: false, message: 'Failed to create order record' }, { status: 500 });
      }

      const orderId = orderData.id;

      // Insert order items
      const orderItems = line_items.map((li: any) => {
        const unit = (li.price?.unit_amount ?? 0) / 100;
        const quantity = li.quantity ?? 1;
        const productName = li.price?.product?.name ?? li.description ?? li.price?.product ?? 'Product';
        const productImage = Array.isArray(li.price?.product?.images) ? li.price.product.images[0] : null;

        return {
          order_id: orderId,
          product_id: null,
          product_name: productName,
          product_image: productImage,
          quantity: quantity,
          unit_price: unit,
          total_price: unit * quantity,
          selected_variant: null,
          customization_note: null,
        };
      });

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) {
        console.error('Failed to insert order items:', itemsError);
        // Not fatal — but report
        return NextResponse.json({ ok: false, message: 'Order created but failed to insert items' }, { status: 500 });
      }

      // Optionally: you can clear a cart associated with metadata/session here

      return NextResponse.json({ ok: true, order_id: orderId });
    } catch (err: any) {
      console.error('Webhook processing error:', err);
      return NextResponse.json({ ok: false, message: err.message ?? 'Processing error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
