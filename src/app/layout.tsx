import type { Metadata } from 'next';

import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Casecobra', template: '%s - Casecobra' },
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
      <body className="selection:text-primary-foreground selection:bg-primary grid min-h-screen grid-rows-[auto_1fr_auto] overflow-x-hidden bg-slate-50 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
