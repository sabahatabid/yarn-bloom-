import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type OrderRequest = {
  items?: Array<{
    product_id: string;
    product?: { name?: string; primary_image?: string | null };
    quantity: number;
    unit_price: number;
    selected_variant?: string;
    customization_note?: string;
  }>;
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
    city?: string;
    address?: string;
    orderNotes?: string;
  };
  paymentMethod?: string;
};

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as OrderRequest | null;
  const items = body?.items ?? [];
  const customer = body?.customer;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty' }, { status: 400 });
  }

  if (body?.paymentMethod !== 'COD') {
    return NextResponse.json({ error: 'Only Cash on Delivery is available' }, { status: 400 });
  }

  if (!customer?.fullName || !customer.email || !customer.phone || !customer.city || !customer.address) {
    return NextResponse.json({ error: 'Please complete your delivery details' }, { status: 400 });
  }

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.unit_price) * Number(item.quantity),
    0
  );
  const deliveryFee = subtotal >= 3000 ? 0 : 250;
  const total = subtotal + deliveryFee;
  const orderNumber = `YB-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`;
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_name: customer.fullName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      delivery_address: customer.address,
      city: customer.city,
      order_notes: customer.orderNotes || null,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      payment_method: 'COD',
      payment_status: 'pending',
      status: 'pending',
    })
    .select('id, order_number')
    .single();

  if (orderError || !order) {
    console.error('Failed to create COD order:', orderError);
    return NextResponse.json({ error: 'Unable to place your order' }, { status: 500 });
  }

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id || null,
    product_name: item.product?.name ?? 'Product',
    product_image: item.product?.primary_image ?? null,
    quantity: Number(item.quantity),
    unit_price: Number(item.unit_price),
    total_price: Number(item.unit_price) * Number(item.quantity),
    selected_variant: item.selected_variant ?? null,
    customization_note: item.customization_note ?? null,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) {
    await supabase.from('orders').delete().eq('id', order.id);
    console.error('Failed to create COD order items:', itemsError);
    return NextResponse.json({ error: 'Unable to save your order items' }, { status: 500 });
  }

  return NextResponse.json({ orderNumber: order.order_number });
}
