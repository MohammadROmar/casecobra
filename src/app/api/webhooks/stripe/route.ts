import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { db } from '@/db';
import { stripe } from '@/lib/stripe';
import OrderReceivedEmail from '@/components/emails/order-received-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      return new NextResponse('Invalid signature', { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === 'checkout.session.completed') {
      if (!event.data.object.customer_details?.email) {
        throw new Error('Missing user email');
      }

      const session = event.data.object;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error('Invalid request data');
      }

      const billingAddress = session.customer_details?.address;
      const shippingAddress =
        session.collected_information?.shipping_details?.address;

      if (!billingAddress || !shippingAddress) {
        throw new Error('No address provided');
      }

      const { createdAt, shippingAddressId } = await db.order.update({
        where: { id: orderId },
        data: {
          billingAddress: {
            create: {
              name: session.customer_details?.name || '',
              city: billingAddress.city || '',
              country: billingAddress.country || '',
              postalCode: billingAddress.postal_code || '',
              street: billingAddress.line1 || '',
              state: billingAddress.state,
            },
          },
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details?.name || '',
              city: shippingAddress.city || '',
              country: shippingAddress.country || '',
              postalCode: shippingAddress.postal_code || '',
              street: shippingAddress.line1 || '',
              state: shippingAddress.state,
            },
          },
        },
      });

      await resend.emails.send({
        from: 'Casecobra <onboarding@resend.dev>',
        to: [event.data.object.customer_details.email],
        subject: 'Thanks for your order.',
        react: OrderReceivedEmail({
          orderId,
          orderDate: createdAt.toLocaleDateString(),
          shippingAddress: {
            id: shippingAddressId || '',
            name: session.customer_details?.name || '',
            city: billingAddress.city || '',
            country: billingAddress.country || '',
            postalCode: billingAddress.postal_code || '',
            street: billingAddress.line1 || '',
            state: billingAddress.state,
            phoneNumber: '',
          },
        }),
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { message: 'Something went wrong', ok: false },
      { status: 500 },
    );
  }
}
