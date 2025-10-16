import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import type { ShippingAddress } from '@prisma/client';

type OrderReceivedEmailProps = {
  orderId: string;
  orderDate: string;
  shippingAddress: ShippingAddress;
};

function OrderReceivedEmail({
  orderId,
  orderDate,
  shippingAddress,
}: OrderReceivedEmailProps) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://casecobra-app.vercel.app'
      : 'http://localhost:3000';

  return (
    <Html>
      <Head />
      <Preview>Your order summary and estimated delivert date</Preview>
      <Tailwind>
        <Body
          className="bg-white"
          style={{
            fontFamily:
              '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
          }}
        >
          <Container className="mx-auto my-2.5 max-w-full border border-solid border-gray-200">
            <Section className="px-[74px] py-10 text-center">
              <Img
                src={`${baseUrl}/snake-3.png`}
                width="65"
                height="73"
                alt="Delivery snack"
                className="m-auto"
              />
              <Heading className="text-center text-3xl leading-snug font-bold tracking-tight">
                Thank you for your order!
              </Heading>
              <Text className="m-0 leading-loose font-medium text-gray-600">
                We&apos;re preparing everything for delivary and will notify you
                once your package has been shipped. Delivery usually takes 2
                days.
              </Text>
              <Text className="m-0 mt-6 leading-0.5 font-medium text-gray-600">
                If you have any questions redarding your order, please feel free
                to contact us with your order number and we&apos;re here to
                help.
              </Text>

              <Hr className="m-0 border-gray-200" />
            </Section>

            <Section className="px-10 py-6">
              <Text className="m-0 text-sm leading-loose font-bold">
                Shipping to: {shippingAddress.name}
              </Text>
              <Text className="m-0 text-sm leading-loose text-gray-600">
                {shippingAddress.street}, {shippingAddress.city},{' '}
                {shippingAddress.state} {shippingAddress.postalCode}
              </Text>
              <Hr className="m-0 border-gray-200" />
            </Section>

            <Section className="px-10 py-6">
              <Row className="mb-10 inline-flex">
                <Column className="w-[170px]">
                  <Text className="m-0 leading-loose font-bold">
                    Order Number
                  </Text>
                  <Text className="mt-3 leading-snug font-medium text-gray-600">
                    {orderId}
                  </Text>
                </Column>
                <Column className="w-[170px]">
                  <Text className="m-0 leading-loose font-bold">
                    Order Date
                  </Text>
                  <Text className="mt-3 leading-snug font-medium text-gray-600">
                    {orderDate}
                  </Text>
                </Column>
              </Row>

              <Hr className="m-0 border-gray-200" />
            </Section>

            <Section className="py-6">
              <Row>
                <Text className="m-0 py-8 text-center text-sm text-gray-400">
                  Please contact us if you have any questions. (If you reply to
                  this email we won&apos;t be able to see it.)
                </Text>
              </Row>
              <Row>
                <Text className="m-0 text-center text-sm text-gray-400">
                  &copy; Casecobra, Inc. All Rights Reserved.
                </Text>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default OrderReceivedEmail;
