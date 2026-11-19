import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import JsonLd from '@/components/JsonLd';
import {
  SITE_CONFIG,
  getSiteUrl,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from '@/lib/seo';

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

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'HisabSarthi — Smart Accounting & Inventory Software',
    template: '%s',
  },
  description:
    'Manage sales invoices, delivery challans, inventory, custom pricing, party ledgers, ageing & GST reports in Google Sheets. ₹4,999 lifetime access.',
  applicationName: SITE_CONFIG.brandName,
  authors: [{ name: SITE_CONFIG.parentCompany, url: getSiteUrl() }],
  creator: SITE_CONFIG.parentCompany,
  publisher: SITE_CONFIG.parentCompany,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification
            ? { other: { 'msvalidate.01': bingVerification } }
            : {}),
        },
      }
    : {}),
  icons: {
    icon: SITE_CONFIG.logoPath,
    apple: SITE_CONFIG.logoPath,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: getSiteUrl(),
    siteName: SITE_CONFIG.brandName,
    title: 'HisabSarthi — Smart Accounting & Inventory Software',
    description:
      'Google Sheets-powered accounting, delivery challans, consolidated invoicing, inventory & GST summaries for ₹4,999 one-time with free team setup.',
    images: [
      {
        url: SITE_CONFIG.ogImagePath,
        width: 1366,
        height: 641,
        alt: 'HisabSarthi Smart Accounting & Business Reporting Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HisabSarthi — Smart Accounting & Inventory Software',
    description:
      'Smart accounting, delivery challans, inventory & GST summaries in your own Google Drive. ₹4,999 lifetime access with free setup.',
    images: [SITE_CONFIG.ogImagePath],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FAF9F6] text-[#0F172A] antialiased selection:bg-emerald-100 selection:text-emerald-950"
      >
        <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
