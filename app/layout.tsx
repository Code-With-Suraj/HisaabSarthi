import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HisabSarthi by Suraj Automation — Smart Accounting & Inventory Software',
  description:
    'Manage Sales, Delivery Challans, Consolidated Invoices, Purchases, Inventory, Custom Pricing, and GST Reports in one place. ₹4,999 one-time lifetime access with free professional setup.',
  icons: {
    icon: '/assets/aistudio/image_b899084e.png',
  },
  openGraph: {
    title: 'HisabSarthi by Suraj Automation — ₹4,999 Lifetime Access',
    description:
      'Smart Accounting & Inventory Management Software for Growing Businesses. Free professional setup by Suraj Automation Team.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HisabSarthi by Suraj Automation — ₹4,999 Lifetime Access',
    description:
      'Smart Accounting & Inventory Management Software for Growing Businesses. One-time payment, zero monthly subscription.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FAF9F6] text-[#0F172A] antialiased selection:bg-emerald-100 selection:text-emerald-950"
      >
        {children}
      </body>
    </html>
  );
}
