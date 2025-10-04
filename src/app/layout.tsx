import type { Metadata } from 'next';

import Header from '@/components/header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Casecobra',
  description:
    'Casecobra lets you design unique mobile cases with full customization. Choose your favorite color, upload any image, and arrange it freely on the cover to create a personalized phone case that matches your style.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-slate-50 antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
