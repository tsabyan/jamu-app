import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/serverClient';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { customer, items, total_amount } = body;

    // 1. Create or update customer (simplified: always create new entry for guest checkout feeling, or we could check email)
    // Ideally we check if user exists, but for prompt simplicity "Creates a customer if not existing (for simplicity you can create a new one every time)"
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      })
      .select()
      .single();

    if (customerError) {
      console.error('Customer Error:', customerError);
      return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
    }

    // 2. Create Order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customerData.id,
        status: 'pending',
        total_amount: total_amount,
        payment_method: 'cod', // Defaulting to COD for now as no payment gateway
        note: customer.note
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order Error:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // 3. Create Order Items
    const orderItems = items.map((item: any) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.unit_price * item.quantity
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
       console.error('Items Error:', itemsError);
       return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId: orderData.id });

  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
