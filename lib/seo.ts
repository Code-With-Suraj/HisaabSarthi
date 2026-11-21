import type { Metadata } from 'next';
import { WHATSAPP_CONFIG } from '@/lib/whatsapp';

export const SITE_CONFIG = {
  brandName: 'HisabSarthi',
  alternateBrandName: 'HisaabSarthi',
  parentCompany: 'Suraj Automation',
  domain: 'https://hisaabsarthi.surajdx.com',
  email: 'surajsingh.noida98@gmail.com',
  phoneDisplay: WHATSAPP_CONFIG.displayPhone,
  phoneE164: `+${WHATSAPP_CONFIG.number}`,
  whatsappUrl: `https://wa.me/${WHATSAPP_CONFIG.number}`,
  priceInr: '4999',
  currency: 'INR',
  logoPath: '/assets/aistudio/HisabSarthi_Growth_Accounting_Logo_ec3c4863.png',
  ogImagePath: '/assets/aistudio/HisaabSarthi_96f9e8f2.PNG',
  location: {
    city: 'Noida',
    region: 'Uttar Pradesh',
    country: 'IN',
  },
} as const;

export function getSiteUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    SITE_CONFIG.domain;
  return configured.replace(/\/+$/, '');
}

export function absoluteUrl(path = '/'): string {
  const base = getSiteUrl();
  if (!path || path === '/') return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = SITE_CONFIG.ogImagePath,
  imageAlt = 'HisabSarthi Smart Accounting & Business Reporting Dashboard by Suraj Automation',
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      url,
      siteName: SITE_CONFIG.brandName,
      title,
      description,
      locale: 'en_IN',
      ...(type === 'article' && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime || publishedTime,
            authors: [SITE_CONFIG.parentCompany],
          }
        : {}),
      images: [
        {
          url: ogImage,
          width: 1366,
          height: 641,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// --- Schema.org JSON-LD Builders (Strictly aligned with visible on-page facts) ---

export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: SITE_CONFIG.parentCompany,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE_CONFIG.logoPath),
      width: 1536,
      height: 1024,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phoneE164,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.region,
      addressCountry: SITE_CONFIG.location.country,
    },
  };
}

export function buildWebsiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_CONFIG.brandName,
    alternateName: [
      SITE_CONFIG.alternateBrandName,
      'HisabSarthi by Suraj Automation',
    ],
    description:
      'Smart accounting, inventory, delivery challan, ageing, and GST reporting software built on Google Sheets and Google Apps Script for growing Indian businesses.',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-IN',
  };
}

export function buildSoftwareApplicationSchema() {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteUrl}/#software`,
    name: SITE_CONFIG.brandName,
    alternateName: SITE_CONFIG.alternateBrandName,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Accounting and Inventory Management Software',
    operatingSystem: 'Web Browser (Google Workspace / Google Sheets)',
    url: siteUrl,
    image: absoluteUrl(SITE_CONFIG.ogImagePath),
    screenshot: [
      absoluteUrl('/assets/aistudio/HisaabSarthi_96f9e8f2.PNG'),
      absoluteUrl('/assets/aistudio/image_cad0b701.png'),
      absoluteUrl('/assets/aistudio/image_0ae04a43.png'),
      absoluteUrl('/assets/aistudio/image_eff33f61.png'),
    ],
    description:
      'Smart accounting, inventory, delivery challan consolidation, custom customer pricing, party ledger, ageing analysis, and GST summary reporting software set up in your own Google Drive by Suraj Automation Team.',
    creator: {
      '@id': `${siteUrl}/#organization`,
    },
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    featureList: [
      'Tax Invoice and Bill of Supply Management',
      'Delivery Challan Tracking and Consolidated Invoice Generation',
      'Real-Time Inventory and Stock Valuation at Cost',
      'Vendor Bills and Purchase Management',
      'Customer and Site-Wise Custom Product Pricing',
      'Customer Receipts, Vendor Payments, and Party-Wise Ledgers',
      'Multi-Bank Account Management and Smart Bank Reconciliation (BRS) with CSV Auto-Matching',
      'Outstanding Receivables Ageing Reports',
      'GST Sales, Purchase, and HSN/SAC Summary Reports for Accounting Review',
      'Dedicated Google Sheets Database in Customer Google Drive',
      'Initial Professional Setup by Suraj Automation Team',
    ],
    offers: {
      '@type': 'Offer',
      name: 'HisabSarthi Lifetime Software Access with Initial Setup',
      price: SITE_CONFIG.priceInr,
      priceCurrency: SITE_CONFIG.currency,
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/#pricing`,
      seller: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  };
}

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question.replace(/^Q\d+\.\s*/i, ''),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  crumbs: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  image = SITE_CONFIG.ogImagePath,
}: {
  title: string;
  description: string;
  path: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(path),
    },
    image: absoluteUrl(image),
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.parentCompany,
      url: siteUrl,
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-IN',
  };
}
