export interface FeatureModule {
  id: string;
  number: string;
  category: 'sales' | 'inventory' | 'purchases' | 'accounting';
  title: string;
  description: string;
  bullets: string[];
  callout?: string;
  footnote?: string;
}

export interface PainPoint {
  number: string;
  title: string;
  description: string;
}

export interface SetupStep {
  step: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  excel: string;
  hisabSarthi: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const PAIN_POINTS: PainPoint[] = [
  {
    number: 'Problem 1',
    title: 'Sales Management Is Complicated',
    description:
      'Creating invoices, tracking delivery challans and managing customer-wise billing takes unnecessary time.',
  },
  {
    number: 'Problem 2',
    title: 'Outstanding Payments Are Hard to Track',
    description:
      "You don't always know which customer owes how much or how long a payment has been pending.",
  },
  {
    number: 'Problem 3',
    title: 'Inventory Is Never Fully Updated',
    description:
      'Manual stock entries, purchase records and sales deductions create stock mismatches.',
  },
  {
    number: 'Problem 4',
    title: 'Vendor Bills Are Scattered',
    description:
      'Purchase bills, vendor payments and outstanding balances become difficult to reconcile.',
  },
  {
    number: 'Problem 5',
    title: 'Business Reports Take Too Much Time',
    description:
      'You spend hours collecting information just to understand your business performance.',
  },
];

export const INTRO_CAPABILITIES: string[] = [
  'Create professional sales invoices.',
  'Manage daily delivery challans.',
  'Generate consolidated invoices.',
  'Record vendor bills and purchases.',
  'Track customer and vendor payments.',
  'Maintain item-wise inventory.',
  'Manage customer-wise custom pricing.',
  'Generate ledgers and ageing reports.',
  'Reconcile multiple bank accounts with automated BRS.',
  'View GST summaries and business reports.',
];

export const FEATURE_MODULES: FeatureModule[] = [
  {
    id: 'sales-invoice',
    number: '01.',
    category: 'sales',
    title: 'Sales & Invoice Management',
    description:
      'Create and manage your sales transactions without repetitive manual work.',
    bullets: [
      'Tax Invoice and Bill of Supply',
      'Customer-wise billing',
      'Site-wise billing',
      'GST calculations',
      'Invoice printing',
      'Invoice search and tracking',
      'CSV import for historical invoices',
    ],
  },
  {
    id: 'delivery-challan',
    number: '02.',
    category: 'sales',
    title: 'Smart Delivery Challan Management',
    description: 'Manage daily dispatches and convert them into invoices.',
    bullets: [
      'Create delivery challans',
      'Customer and delivery-site selection',
      'Item-wise dispatch records',
      'Pending and invoiced challan tracking',
      'Print delivery challans',
      'Consolidated invoice generation',
    ],
    callout: 'Multiple Delivery Challans? Generate One Consolidated Invoice.',
  },
  {
    id: 'inventory-stock',
    number: '03.',
    category: 'inventory',
    title: 'Inventory & Stock Management',
    description:
      'Know what you have, what you sold and what needs to be purchased.',
    bullets: [
      'Real-time stock tracking',
      'Stock valuation at cost',
      'Product and SKU management',
      'Barcode and SKU search',
      'Stock movement ledger',
      'Stock adjustments',
      'Low-stock and out-of-stock alerts',
      'Reorder suggestions',
      'Dead-stock analysis',
      'Inventory CSV export',
    ],
  },
  {
    id: 'vendor-purchase',
    number: '04.',
    category: 'purchases',
    title: 'Vendor & Purchase Management',
    description: 'Keep your purchase records and vendor accounts organized.',
    bullets: [
      'Vendor bill creation',
      'Purchase entry management',
      'GST purchase records',
      'Vendor-wise transaction tracking',
      'Purchase bill search',
      'Historical vendor bill import',
      'Vendor payment tracking',
    ],
  },
  {
    id: 'customer-vendor-masters',
    number: '05.',
    category: 'accounting',
    title: 'Customer & Vendor Masters',
    description: 'Manage your business relationships centrally.',
    bullets: [
      'Debtor management',
      'Creditor management',
      'Product master',
      'GST rate master',
      'Bank account master',
      'Customer and site management',
    ],
  },
  {
    id: 'custom-pricing',
    number: '06.',
    category: 'inventory',
    title: 'Custom Product Pricing',
    description:
      'Different customers. Different rates. One organized pricing system.',
    bullets: [
      'Customer-wise product pricing',
      'Site-wise custom rates',
      'Effective date management',
      'Rate revision',
      'Default and custom price comparison',
      'Active pricing status',
    ],
    callout: 'No more confusion about which customer gets which rate.',
  },
  {
    id: 'payments-accounting',
    number: '07.',
    category: 'accounting',
    title: 'Payments & Accounting',
    description: 'Keep track of the money coming in and going out.',
    bullets: [
      'Customer receipts',
      'Vendor payments',
      'Debit and credit notes',
      'Journal entries',
      'Party-wise ledger',
      'Payment history',
      'Outstanding balances',
    ],
  },
  {
    id: 'reports-gst',
    number: '08.',
    category: 'purchases',
    title: 'Business Reports & GST',
    description:
      'Understand your business with organized financial reports.',
    bullets: [
      'Sales reports',
      'Purchase reports',
      'Ledger statements',
      'Outstanding ageing reports',
      'GST sales and purchase summaries',
      'HSN/SAC summaries',
      'CGST, SGST and IGST summaries',
      'Business dashboard and quick statistics',
    ],
    footnote:
      'GST reports are intended for accounting review and reconciliation. They do not automatically file GST returns.',
  },
  {
    id: 'bank-reconciliation',
    number: '09.',
    category: 'accounting',
    title: 'Multi-Bank & Smart Bank Reconciliation (BRS)',
    description:
      'Manage multiple bank accounts, auto-match NetBanking CSV statements, track uncleared cheques, and achieve ₹0.00 variance with audit-ready BRS reports.',
    bullets: [
      'Multi-Bank Master (Current, Savings, OD/CC)',
      'IFSC, UPI VPA & default bank tracking',
      'Live 4-card reconciliation workspace',
      'Instant ₹0.00 zero-difference variance check',
      'NetBanking CSV smart auto-matcher',
      '1-click clearance & bulk value-date updates',
      'Quick bank adjustments (fees & interest)',
      'CA-standard BRS print/PDF with Annexures',
    ],
    callout:
      'Multiple Bank Accounts & Uncleared Cheques? Reconcile to ₹0.00 Variance in Seconds.',
  },
];

export const SETUP_STEPS: SetupStep[] = [
  {
    step: 'Step 1',
    title: 'Purchase HisabSarthi',
    description: 'Complete your one-time payment of ₹4,999.',
  },
  {
    step: 'Step 2',
    title: 'Share Your Business Details',
    description: 'Submit your business information and Gmail ID.',
  },
  {
    step: 'Step 3',
    title: 'Connect Your Google Account',
    description:
      "Authorize the required Google permissions securely through Google's official authorization process.",
  },
  {
    step: 'Step 4',
    title: 'We Configure Your Software',
    description:
      'Our team will configure your business application and initialize your business database.',
  },
  {
    step: 'Step 5',
    title: 'Get Your Ready-to-Use Application',
    description:
      'Receive your application link and start managing your business.',
  },
];

export const DATA_OWNERSHIP_POINTS: string[] = [
  'A dedicated Google Spreadsheet is created in your authorized Google account.',
  'Your business transactions are stored in that spreadsheet.',
  'Your application accesses the data through authorized Google permissions.',
  'You retain ownership of your Google account and database file.',
  'No Google password is required by our team.',
];

export const TARGET_BUSINESSES: string[] = [
  'Wholesalers & Distributors',
  'Traders & Retailers',
  'Food & Grocery Suppliers',
  'Corporate Catering Suppliers',
  'Small & Medium Businesses',
  'Multi-Site Supply Businesses',
  'Growing Trading Businesses',
];

export const PRICING_INCLUDED: string[] = [
  'HisabSarthi Accounting Software',
  'Sales Invoice Management',
  'Delivery Challan Management',
  'Consolidated Invoice Generation',
  'Inventory & Stock Management',
  'Vendor & Purchase Management',
  'Customer-wise Custom Pricing',
  'Payment & Ledger Management',
  'Multi-Bank Master & Smart Bank Reconciliation (BRS)',
  'GST & Ageing Reports',
  'Professional Initial Setup by Suraj Automation Team',
  'Dedicated Business Database Setup',
  'Application Access Link',
  'Initial Guided Onboarding',
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'Sales Invoices', excel: 'Manual', hisabSarthi: 'Organized' },
  {
    feature: 'Delivery Challans',
    excel: 'Separate tracking',
    hisabSarthi: 'Integrated',
  },
  {
    feature: 'Consolidated Invoices',
    excel: 'Manual work',
    hisabSarthi: 'Built-in',
  },
  {
    feature: 'Inventory Tracking',
    excel: 'Manual updates',
    hisabSarthi: 'Stock management',
  },
  {
    feature: 'Custom Pricing',
    excel: 'Separate records',
    hisabSarthi: 'Centralized',
  },
  {
    feature: 'Customer Ledger',
    excel: 'Manual reconciliation',
    hisabSarthi: 'Generated reports',
  },
  {
    feature: 'Ageing Analysis',
    excel: 'Manual calculation',
    hisabSarthi: 'Automated report',
  },
  {
    feature: 'GST Summary',
    excel: 'Manual preparation',
    hisabSarthi: 'GST reports',
  },
  {
    feature: 'Bank Reconciliation (BRS)',
    excel: 'Manual ticking & highlights',
    hisabSarthi: 'Smart CSV auto-match & audit-ready BRS',
  },
  {
    feature: 'Setup Assistance',
    excel: 'Self-managed',
    hisabSarthi: 'Our team handles initial setup',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Q1. Do I need to download any software?',
    answer:
      'No. HisabSarthi is browser-based. You can access it through your application link.',
  },
  {
    id: 'faq-2',
    question: 'Q2. Do I need technical knowledge?',
    answer:
      'No. Suraj Automation Team handles your initial setup and provides guided onboarding.',
  },
  {
    id: 'faq-3',
    question: 'Q3. Do I need to share my Gmail password?',
    answer:
      "Absolutely not. You authorize Google permissions yourself through Google's official authorization screen.",
  },
  {
    id: 'faq-4',
    question: 'Q4. Where is my business data stored?',
    answer:
      'Your dedicated business database is created in your authorized Google Drive account.',
  },
  {
    id: 'faq-5',
    question: 'Q5. Is there any monthly or yearly subscription?',
    answer:
      'No. The advertised plan is ₹4,999 as a one-time payment for lifetime software access.',
  },
  {
    id: 'faq-6',
    question: 'Q6. Can I manage inventory and accounting together?',
    answer:
      'Yes. HisabSarthi includes sales, purchase, inventory, payment, ledger and reporting modules.',
  },
  {
    id: 'faq-7',
    question: 'Q7. Can I generate one invoice from multiple delivery challans?',
    answer:
      'Yes. You can select eligible delivery challans and generate a consolidated invoice.',
  },
  {
    id: 'faq-8',
    question: 'Q8. Can I manage different prices for different customers?',
    answer:
      'Yes. Custom pricing supports customer-wise and site-wise product rates with effective dates.',
  },
  {
    id: 'faq-9',
    question: 'Q9. Will my software stop working if my Google account is disconnected?',
    answer:
      'The application requires authorized Google access. If authorization is revoked or access is unavailable, some or all functions may stop until access is restored.',
  },
  {
    id: 'faq-10',
    question: 'Q10. Does HisabSarthi automatically file GST returns?',
    answer:
      'No. It generates accounting and GST summary reports for review and reconciliation. GST filing is not an included automatic filing feature.',
  },
];

// --- Interactive Simulator Dataset ---

export interface DemoInvoice {
  id: string;
  date: string;
  customer: string;
  site: string;
  type: 'Tax Invoice' | 'Bill of Supply';
  taxableAmount: number;
  gstAmount: number;
  totalAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: {
    name: string;
    hsn: string;
    qty: number;
    unit: string;
    rate: number;
    gstRate: number;
  }[];
}

export interface DemoChallanItem {
  sku: string;
  name: string;
  hsn: string;
  qty: number;
  unit: string;
  defaultRate: number;
  customRate: number;
  gstRate: number;
}

export interface DemoChallan {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  siteName: string;
  gstin: string;
  status: 'Pending' | 'Invoiced';
  items: DemoChallanItem[];
}

export interface DemoInventoryItem {
  sku: string;
  name: string;
  category: string;
  hsn: string;
  stockQty: number;
  reorderLevel: number;
  unit: string;
  costPrice: number;
  defaultRate: number;
  customRates: {
    'ganesh-andheri': { rate: number; effectiveFrom: string };
    'annapurna-bkc': { rate: number; effectiveFrom: string };
  };
  movementNote: string;
}

export interface DemoAgeingRow {
  party: string;
  type: 'Debtor' | 'Creditor';
  current0to30: number;
  days31to60: number;
  days60Plus: number;
  total: number;
}

export interface DemoGstHsnRow {
  hsn: string;
  description: string;
  taxableValue: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
}

export const DEMO_RECENT_INVOICES: DemoInvoice[] = [
  {
    id: 'INV-2026-0418',
    date: '16 Nov 2026',
    customer: 'Shree Ganesh Mart',
    site: 'Andheri West Depot',
    type: 'Tax Invoice',
    taxableAmount: 48200,
    gstAmount: 2410,
    totalAmount: 50610,
    status: 'Paid',
    items: [
      { name: 'Basmati Rice Premium 25kg', hsn: '1006', qty: 18, unit: 'Bag', rate: 2100, gstRate: 5 },
      { name: 'Refined Sunflower Oil 15L', hsn: '1512', qty: 4, unit: 'Tin', rate: 2600, gstRate: 5 },
    ],
  },
  {
    id: 'INV-2026-0417',
    date: '15 Nov 2026',
    customer: 'Annapurna Corporate Caterers',
    site: 'BKC Kitchen Unit 2',
    type: 'Tax Invoice',
    taxableAmount: 76400,
    gstAmount: 9168,
    totalAmount: 85568,
    status: 'Pending',
    items: [
      { name: 'Toor Dal Grade-A 30kg', hsn: '0713', qty: 12, unit: 'Bag', rate: 3900, gstRate: 12 },
      { name: 'Commercial Aluminum Foil Roll', hsn: '7607', qty: 40, unit: 'Roll', rate: 740, gstRate: 12 },
    ],
  },
  {
    id: 'INV-2026-0416',
    date: '12 Nov 2026',
    customer: 'Navrang Kirana Stores',
    site: 'Thane Main Branch',
    type: 'Bill of Supply',
    taxableAmount: 29500,
    gstAmount: 0,
    totalAmount: 29500,
    status: 'Overdue',
    items: [
      { name: 'Whole Wheat Chakki Atta 50kg', hsn: '1101', qty: 15, unit: 'Bag', rate: 1966.67, gstRate: 0 },
    ],
  },
  {
    id: 'INV-2026-0415',
    date: '10 Nov 2026',
    customer: 'Metro Hospitality Group',
    site: 'Powai Central',
    type: 'Tax Invoice',
    taxableAmount: 64000,
    gstAmount: 11520,
    totalAmount: 75520,
    status: 'Paid',
    items: [
      { name: 'Heavy Duty Kitchen Dispenser Pack', hsn: '3924', qty: 32, unit: 'Box', rate: 2000, gstRate: 18 },
    ],
  },
];

export const INITIAL_DEMO_CHALLANS: DemoChallan[] = [
  {
    id: 'DC-1101',
    date: '14 Nov 2026',
    customerId: 'ganesh-andheri',
    customerName: 'Shree Ganesh Mart',
    siteName: 'Andheri West Depot',
    gstin: '27AABCS1429B1Z5',
    status: 'Pending',
    items: [
      {
        sku: 'SKU-RICE-25',
        name: 'Basmati Rice Premium 25kg',
        hsn: '1006',
        qty: 10,
        unit: 'Bag',
        defaultRate: 2250,
        customRate: 2100,
        gstRate: 5,
      },
      {
        sku: 'SKU-OIL-15',
        name: 'Refined Sunflower Oil 15L',
        hsn: '1512',
        qty: 6,
        unit: 'Tin',
        defaultRate: 2720,
        customRate: 2600,
        gstRate: 5,
      },
    ],
  },
  {
    id: 'DC-1104',
    date: '16 Nov 2026',
    customerId: 'ganesh-andheri',
    customerName: 'Shree Ganesh Mart',
    siteName: 'Andheri West Depot',
    gstin: '27AABCS1429B1Z5',
    status: 'Pending',
    items: [
      {
        sku: 'SKU-DAL-30',
        name: 'Toor Dal Grade-A 30kg',
        hsn: '0713',
        qty: 8,
        unit: 'Bag',
        defaultRate: 4100,
        customRate: 3920,
        gstRate: 5,
      },
    ],
  },
  {
    id: 'DC-1107',
    date: '17 Nov 2026',
    customerId: 'ganesh-andheri',
    customerName: 'Shree Ganesh Mart',
    siteName: 'Andheri West Depot',
    gstin: '27AABCS1429B1Z5',
    status: 'Pending',
    items: [
      {
        sku: 'SKU-SUGAR-50',
        name: 'Sulphur-Free Sugar M30 50kg',
        hsn: '1701',
        qty: 12,
        unit: 'Bag',
        defaultRate: 2150,
        customRate: 2050,
        gstRate: 5,
      },
    ],
  },
  {
    id: 'DC-1109',
    date: '17 Nov 2026',
    customerId: 'annapurna-bkc',
    customerName: 'Annapurna Corporate Caterers',
    siteName: 'BKC Kitchen Unit 2',
    gstin: '27AAECA8812K1Z1',
    status: 'Pending',
    items: [
      {
        sku: 'SKU-FOIL-90',
        name: 'Commercial Aluminum Foil Roll',
        hsn: '7607',
        qty: 25,
        unit: 'Roll',
        defaultRate: 790,
        customRate: 740,
        gstRate: 18,
      },
    ],
  },
];

export const DEMO_INVENTORY_ITEMS: DemoInventoryItem[] = [
  {
    sku: 'SKU-RICE-25',
    name: 'Basmati Rice Premium 25kg',
    category: 'Grains & Staples',
    hsn: '1006',
    stockQty: 142,
    reorderLevel: 40,
    unit: 'Bag',
    costPrice: 1890,
    defaultRate: 2250,
    customRates: {
      'ganesh-andheri': { rate: 2100, effectiveFrom: '01 Nov 2026' },
      'annapurna-bkc': { rate: 2140, effectiveFrom: '05 Nov 2026' },
    },
    movementNote: '18 Bags dispatched 16 Nov',
  },
  {
    sku: 'SKU-OIL-15',
    name: 'Refined Sunflower Oil 15L',
    category: 'Edible Oils',
    hsn: '1512',
    stockQty: 14,
    reorderLevel: 25,
    unit: 'Tin',
    costPrice: 2380,
    defaultRate: 2720,
    customRates: {
      'ganesh-andheri': { rate: 2600, effectiveFrom: '01 Nov 2026' },
      'annapurna-bkc': { rate: 2580, effectiveFrom: '10 Nov 2026' },
    },
    movementNote: 'Low stock · Reorder 30 Tins',
  },
  {
    sku: 'SKU-DAL-30',
    name: 'Toor Dal Grade-A 30kg',
    category: 'Pulses',
    hsn: '0713',
    stockQty: 64,
    reorderLevel: 20,
    unit: 'Bag',
    costPrice: 3560,
    defaultRate: 4100,
    customRates: {
      'ganesh-andheri': { rate: 3920, effectiveFrom: '01 Nov 2026' },
      'annapurna-bkc': { rate: 3900, effectiveFrom: '01 Nov 2026' },
    },
    movementNote: 'Steady turnover',
  },
  {
    sku: 'SKU-FOIL-90',
    name: 'Commercial Aluminum Foil Roll',
    category: 'Catering Supplies',
    hsn: '7607',
    stockQty: 0,
    reorderLevel: 30,
    unit: 'Roll',
    costPrice: 640,
    defaultRate: 790,
    customRates: {
      'ganesh-andheri': { rate: 760, effectiveFrom: '12 Oct 2026' },
      'annapurna-bkc': { rate: 740, effectiveFrom: '01 Nov 2026' },
    },
    movementNote: 'Out of stock · Urgent PO needed',
  },
  {
    sku: 'SKU-SUGAR-50',
    name: 'Sulphur-Free Sugar M30 50kg',
    category: 'Grains & Staples',
    hsn: '1701',
    stockQty: 88,
    reorderLevel: 35,
    unit: 'Bag',
    costPrice: 1875,
    defaultRate: 2150,
    customRates: {
      'ganesh-andheri': { rate: 2050, effectiveFrom: '03 Nov 2026' },
      'annapurna-bkc': { rate: 2080, effectiveFrom: '03 Nov 2026' },
    },
    movementNote: 'Last inward 11 Nov',
  },
];

export const DEMO_AGEING_ROWS: DemoAgeingRow[] = [
  {
    party: 'Annapurna Corporate Caterers',
    type: 'Debtor',
    current0to30: 85568,
    days31to60: 24000,
    days60Plus: 0,
    total: 109568,
  },
  {
    party: 'Navrang Kirana Stores',
    type: 'Debtor',
    current0to30: 14200,
    days31to60: 18500,
    days60Plus: 29500,
    total: 62200,
  },
  {
    party: 'Shree Ganesh Mart',
    type: 'Debtor',
    current0to30: 42150,
    days31to60: 0,
    days60Plus: 0,
    total: 42150,
  },
  {
    party: 'Kaveri Agro Mills (Vendor)',
    type: 'Creditor',
    current0to30: 94000,
    days31to60: 32000,
    days60Plus: 0,
    total: 126000,
  },
];

export const DEMO_GST_HSN_ROWS: DemoGstHsnRow[] = [
  {
    hsn: '1006',
    description: 'Basmati & Semi-Milled Rice (5%)',
    taxableValue: 412000,
    cgst: 10300,
    sgst: 10300,
    igst: 0,
    totalTax: 20600,
  },
  {
    hsn: '1512',
    description: 'Refined Sunflower & Edible Oils (5%)',
    taxableValue: 268000,
    cgst: 6700,
    sgst: 6700,
    igst: 0,
    totalTax: 13400,
  },
  {
    hsn: '0713',
    description: 'Dried Leguminous Pulses & Dal (5%)',
    taxableValue: 194500,
    cgst: 4862.5,
    sgst: 4862.5,
    igst: 0,
    totalTax: 9725,
  },
  {
    hsn: '7607',
    description: 'Commercial Packaging & Foil (18%)',
    taxableValue: 148000,
    cgst: 10620,
    sgst: 10620,
    igst: 5400,
    totalTax: 26640,
  },
];

// --- Multi-Bank & BRS Simulator Dataset ---

export interface DemoBankAccount {
  id: string;
  bankName: string;
  accountType: 'Current' | 'OD / CC' | 'Savings';
  accountMask: string;
  ifsc: string;
  upiVpa: string;
  isDefault?: boolean;
  openingBalance: number;
  statementBalance: number;
}

export interface DemoBrsTransaction {
  id: string;
  bankId: string;
  voucherDate: string;
  party: string;
  reference: string;
  type: 'Inflow' | 'Outflow';
  amount: number;
  clearedDate: string | null;
  csvMatchScore?: number;
  csvMatched?: boolean;
}

export const DEMO_BANK_ACCOUNTS: DemoBankAccount[] = [
  {
    id: 'hdfc-current',
    bankName: 'HDFC Bank',
    accountType: 'Current',
    accountMask: 'XXXX 4821',
    ifsc: 'HDFC0001248',
    upiVpa: 'hisabsarthi.biz@hdfcbank',
    isDefault: true,
    openingBalance: 425000,
    statementBalance: 472410,
  },
  {
    id: 'sbi-cc',
    bankName: 'State Bank of India',
    accountType: 'OD / CC',
    accountMask: 'XXXX 9034',
    ifsc: 'SBIN0004312',
    upiVpa: 'surajauto.sbi@sbi',
    openingBalance: 185000,
    statementBalance: 162500,
  },
  {
    id: 'icici-business',
    bankName: 'ICICI Bank',
    accountType: 'Current',
    accountMask: 'XXXX 6170',
    ifsc: 'ICIC0000842',
    upiVpa: 'trading.desk@icici',
    openingBalance: 112000,
    statementBalance: 112000,
  },
];

export const INITIAL_BRS_TRANSACTIONS: DemoBrsTransaction[] = [
  {
    id: 'BRS-101',
    bankId: 'hdfc-current',
    voucherDate: '14 Nov 2026',
    party: 'Shree Ganesh Mart',
    reference: 'UTR4319820411',
    type: 'Inflow',
    amount: 50610,
    clearedDate: '14 Nov 2026',
    csvMatchScore: 100,
    csvMatched: true,
  },
  {
    id: 'BRS-102',
    bankId: 'hdfc-current',
    voucherDate: '16 Nov 2026',
    party: 'Kaveri Agro Mills (Cheque #004812)',
    reference: 'CHQ-004812',
    type: 'Outflow',
    amount: 32000,
    clearedDate: null,
    csvMatchScore: 97,
  },
  {
    id: 'BRS-103',
    bankId: 'hdfc-current',
    voucherDate: '17 Nov 2026',
    party: 'Annapurna Corporate Caterers (Cheque #091244)',
    reference: 'CHQ-091244',
    type: 'Inflow',
    amount: 42500,
    clearedDate: null,
    csvMatchScore: 95,
  },
  {
    id: 'BRS-104',
    bankId: 'hdfc-current',
    voucherDate: '18 Nov 2026',
    party: 'Metro Hospitality Group',
    reference: 'NEFT2611180092',
    type: 'Inflow',
    amount: 18500,
    clearedDate: null,
    csvMatchScore: 99,
  },
  {
    id: 'BRS-105',
    bankId: 'hdfc-current',
    voucherDate: '18 Nov 2026',
    party: 'Noida Packaging Traders',
    reference: 'IMPS8821041',
    type: 'Outflow',
    amount: 21700,
    clearedDate: null,
    csvMatchScore: 98,
  },
  {
    id: 'BRS-201',
    bankId: 'sbi-cc',
    voucherDate: '15 Nov 2026',
    party: 'Shree Laxmi Flour Mill',
    reference: 'CHQ-771021',
    type: 'Outflow',
    amount: 22500,
    clearedDate: '16 Nov 2026',
    csvMatchScore: 100,
    csvMatched: true,
  },
  {
    id: 'BRS-202',
    bankId: 'sbi-cc',
    voucherDate: '17 Nov 2026',
    party: 'Navrang Kirana Stores',
    reference: 'CHQ-550912',
    type: 'Inflow',
    amount: 29500,
    clearedDate: null,
    csvMatchScore: 94,
  },
  {
    id: 'BRS-301',
    bankId: 'icici-business',
    voucherDate: '12 Nov 2026',
    party: 'Opening Transfer Verified',
    reference: 'RTGS0091200',
    type: 'Inflow',
    amount: 24000,
    clearedDate: '12 Nov 2026',
    csvMatchScore: 100,
    csvMatched: true,
  },
  {
    id: 'BRS-302',
    bankId: 'icici-business',
    voucherDate: '13 Nov 2026',
    party: 'Logistics Freight Settlement',
    reference: 'NEFT4109823',
    type: 'Outflow',
    amount: 24000,
    clearedDate: '13 Nov 2026',
    csvMatchScore: 100,
    csvMatched: true,
  },
];
