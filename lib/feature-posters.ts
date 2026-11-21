export type PosterCategory =
  | 'billing'
  | 'banking'
  | 'inventory'
  | 'operations';

export interface FeaturePoster {
  id: string;
  order: string;
  shortLabel: string;
  title: string;
  tagline: string;
  category: PosterCategory;
  src: string;
  alt: string;
  width: number;
  height: number;
  featureModuleId: string;
  detailHref: string;
  detailLabel: string;
  featurePageSlugs: string[];
}

export const FEATURE_POSTERS: FeaturePoster[] = [
  {
    id: 'executive-dashboard',
    order: '01',
    shortLabel: 'Executive Dashboard',
    title: 'Executive Dashboard & Real-Time Analytics',
    tagline:
      'Total Sales, Receivables, Payables, Purchases, Recent Invoices and Low-Stock Alerts in one screen.',
    category: 'billing',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.47_PM__1__75346ba4.jpeg',
    alt: 'HisabSarthi Executive Dashboard and Real-Time Analytics showing Total Sales, Receivables, Payables, Recent Invoices and Live Business Stats',
    width: 1086,
    height: 1448,
    featureModuleId: 'reports-gst',
    detailHref: '/features/business-dashboard',
    detailLabel: 'Explore Dashboard & MIS',
    featurePageSlugs: ['business-dashboard'],
  },
  {
    id: 'gst-sales-invoicing',
    order: '02',
    shortLabel: 'GST Invoicing',
    title: 'GST Sales Invoicing & Billing Engine',
    tagline:
      'Create B2B/B2C GST invoices with auto CGST/SGST/IGST, client & site billing, and bulk PDF export.',
    category: 'billing',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.46_PM__2__12da04da.jpeg',
    alt: 'HisabSarthi GST Sales Invoicing and Billing Engine with auto CGST SGST IGST calculation, client site-wise billing and PDF export',
    width: 1086,
    height: 1448,
    featureModuleId: 'sales-invoice',
    detailHref: '/features/gst-reporting',
    detailLabel: 'Explore GST Billing & Reports',
    featurePageSlugs: ['gst-reporting', 'business-dashboard'],
  },
  {
    id: 'delivery-challans-dispatch',
    order: '03',
    shortLabel: 'Delivery Challans',
    title: 'Delivery Challans & Dispatch Management',
    tagline:
      'Track daily material dispatches across multiple client sites with 1-click challan-to-invoice conversion.',
    category: 'billing',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.47_PM_88a9569a.jpeg',
    alt: 'HisabSarthi Delivery Challans and Dispatch Management showing vehicle, transporter, multi-site delivery tracking and 1-click invoice conversion',
    width: 1086,
    height: 1448,
    featureModuleId: 'delivery-challan',
    detailHref: '/features/delivery-challan-management',
    detailLabel: 'Explore Delivery Challans',
    featurePageSlugs: ['delivery-challan-management'],
  },
  {
    id: 'modern-brs-multibank',
    order: '04',
    shortLabel: 'Multi-Bank BRS',
    title: 'Modern Bank Reconciliation Statement (BRS)',
    tagline:
      'Reconcile multiple bank accounts, track cleared/uncleared entries, auto-match statements and export audit-ready BRS.',
    category: 'banking',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.44_PM__1__ea746c57.jpeg',
    alt: 'HisabSarthi Modern Bank Reconciliation Statement BRS with multiple bank accounts HDFC ICICI SBI and cleared/uncleared transaction tracking',
    width: 1086,
    height: 1448,
    featureModuleId: 'bank-reconciliation',
    detailHref: '/features/bank-reconciliation-multi-bank',
    detailLabel: 'Explore Multi-Bank & BRS',
    featurePageSlugs: ['bank-reconciliation-multi-bank'],
  },
  {
    id: 'inventory-stock-badging',
    order: '05',
    shortLabel: 'Inventory & Stock',
    title: 'Inventory & Stock Management with Low Stock Badging',
    tagline:
      'Real-time stock valuation at cost, barcode/SKU lookup, movement ledger, adjustments and low-stock alerts.',
    category: 'inventory',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.45_PM_4dec51ee.jpeg',
    alt: 'HisabSarthi Inventory and Stock Management with low stock badging, stock valuation at cost, barcode SKU support and movement reports',
    width: 1086,
    height: 1448,
    featureModuleId: 'inventory-stock',
    detailHref: '/features/inventory-management',
    detailLabel: 'Explore Inventory & Stock',
    featurePageSlugs: ['inventory-management'],
  },
  {
    id: 'custom-product-pricing',
    order: '06',
    shortLabel: 'Custom Pricing',
    title: 'Client-Wise & Site-Wise Custom Product Pricing Engine',
    tagline:
      'Configure custom item rates per client and delivery site with validity periods applied automatically on invoices.',
    category: 'inventory',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.46_PM__1__6c2774fa.jpeg',
    alt: 'HisabSarthi Client-Wise and Site-Wise Custom Product Pricing Engine with effective dates and automatic sales invoice rate application',
    width: 1086,
    height: 1448,
    featureModuleId: 'custom-pricing',
    detailHref: '/features/custom-pricing',
    detailLabel: 'Explore Custom Pricing',
    featurePageSlugs: ['custom-pricing'],
  },
  {
    id: 'vendor-bills-purchases',
    order: '07',
    shortLabel: 'Vendor Bills',
    title: 'Vendor Bills & Purchase Management',
    tagline:
      'Record new or imported vendor bills, monitor supplier payables, control purchase costs and auto-update ledgers.',
    category: 'operations',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.46_PM_2ffb59f1.jpeg',
    alt: 'HisabSarthi Vendor Bills and Purchase Management with old bill import, supplier payment tracking and auto-updated ledgers',
    width: 1086,
    height: 1448,
    featureModuleId: 'vendor-purchase',
    detailHref: '/features/gst-reporting',
    detailLabel: 'Explore Purchase & GST Flow',
    featurePageSlugs: ['gst-reporting'],
  },
  {
    id: 'payments-receipts-fastbook',
    order: '08',
    shortLabel: 'Fast-Book Payments',
    title: 'Payments & Receipts Fast-Book',
    tagline:
      'Record Cash, Bank, Cheque and UPI entries with UTR references to auto-update debtor and creditor ledgers.',
    category: 'banking',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.45_PM__2__876fea10.jpeg',
    alt: 'HisabSarthi Payments and Receipts Fast-Book with multi-mode Cash Bank Cheque UPI tracking, UTR narration and live ledger updates',
    width: 1086,
    height: 1448,
    featureModuleId: 'payments-accounting',
    detailHref: '/features/ageing-reports',
    detailLabel: 'Explore Payments & Ledgers',
    featurePageSlugs: ['ageing-reports'],
  },
  {
    id: 'automated-party-ledgers',
    order: '09',
    shortLabel: 'Party Ledgers',
    title: 'Automated Party Ledgers & Monthly Summaries',
    tagline:
      'Instant client and vendor statements with opening balances, invoice-wise history and dual print formats.',
    category: 'banking',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.44_PM__3__4684b277.jpeg',
    alt: 'HisabSarthi Automated Party Ledgers and Monthly Summaries showing client and vendor statements with opening balances and Print A and B formats',
    width: 1086,
    height: 1448,
    featureModuleId: 'payments-accounting',
    detailHref: '/features/ageing-reports',
    detailLabel: 'Explore Ledgers & Statements',
    featurePageSlugs: ['ageing-reports'],
  },
  {
    id: 'debtors-creditors-ageing',
    order: '10',
    shortLabel: 'Ageing Analysis',
    title: 'Debtors & Creditors Ageing Analysis Report',
    tagline:
      'Bucket-wise ageing visibility (0–30, 31–60, 61–90, 90+ days) to identify overdue accounts and speed up recovery.',
    category: 'banking',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.44_PM__2__83cbcf92.jpeg',
    alt: 'HisabSarthi Debtors and Creditors Ageing Analysis Report with bucket-wise outstanding totals and Print A Print B CSV export',
    width: 1086,
    height: 1448,
    featureModuleId: 'reports-gst',
    detailHref: '/features/ageing-reports',
    detailLabel: 'Explore Ageing Reports',
    featurePageSlugs: ['ageing-reports'],
  },
  {
    id: 'debit-credit-notes',
    order: '11',
    shortLabel: 'Debit & Credit Notes',
    title: 'Debit Notes & Credit Notes Management',
    tagline:
      'Handle sales returns, discounts and price corrections linked to original invoices with clean GST handling.',
    category: 'billing',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.45_PM__1__8226acc6.jpeg',
    alt: 'HisabSarthi Debit Notes and Credit Notes Management for sales returns, billing adjustments and GST-compliant invoice linking',
    width: 1086,
    height: 1448,
    featureModuleId: 'payments-accounting',
    detailHref: '/features/gst-reporting',
    detailLabel: 'Explore Adjustments & GST',
    featurePageSlugs: ['gst-reporting'],
  },
  {
    id: 'business-settings-migration',
    order: '12',
    shortLabel: 'Settings & Migration',
    title: 'Business Settings, Dual Print Formats & Easy Data Migration',
    tagline:
      'Configure company GST profile, bank details, Print A/Print B invoice layouts and import existing business data.',
    category: 'operations',
    src: '/assets/aistudio/WhatsApp_Image_2026-11-21_at_5.45.44_PM_227c86ea.jpeg',
    alt: 'HisabSarthi Business Settings, Dual Print Formats A and B, Bank Details Management and Easy Data Migration',
    width: 1086,
    height: 1448,
    featureModuleId: 'customer-vendor-masters',
    detailHref: '/how-it-works',
    detailLabel: 'Explore Setup & Migration',
    featurePageSlugs: ['business-dashboard'],
  },
];

export function getPostersByFeatureSlug(slug: string): FeaturePoster[] {
  return FEATURE_POSTERS.filter((poster) =>
    poster.featurePageSlugs.includes(slug)
  );
}
