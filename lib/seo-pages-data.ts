export interface FeaturePageData {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  headline: string;
  directAnswer: string;
  screenId: string;
  whoNeedsIt: string[];
  keyCapabilities: { title: string; detail: string }[];
  workflowSteps: { step: string; detail: string }[];
  practicalExample: {
    scenario: string;
    outcome: string;
  };
  limitations: string[];
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  relatedGuideSlug: string;
}

export interface SolutionPageData {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  headline: string;
  directAnswer: string;
  challenges: { title: string; detail: string }[];
  howHisabSarthiHelps: { module: string; benefit: string; featureSlug: string }[];
  typicalWorkflow: string[];
  faqs: { question: string; answer: string }[];
  relatedGuideSlug: string;
}

export interface GuideArticleData {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  publishedTime: string;
  readingTime: string;
  directAnswer: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  practicalExample: {
    title: string;
    body: string;
  };
  limitationsNote: string;
  faqs: { question: string; answer: string }[];
  relatedFeatureSlug: string;
  relatedFeatureLabel: string;
}

export const FEATURE_PAGES: FeaturePageData[] = [
  {
    slug: 'business-dashboard',
    title: 'Business Dashboard & MIS',
    seoTitle: 'Business Dashboard & MIS Reporting Software | HisabSarthi',
    seoDescription:
      'Monitor Total Sales, Receivables, Payables, Purchases, Recent Invoices, and Stock Valuation in one Google Sheets-powered business dashboard.',
    kicker: 'Feature Deep-Dive · Business Dashboard & MIS',
    headline: 'Your Complete Business MIS Dashboard Without Manual Excel Compilation',
    directAnswer:
      'The HisabSarthi Business Dashboard consolidates Total Sales, Receivables, Payables, Total Purchases, Recent Invoices, Stock Valuation, Low-Stock Alerts, Total Products, Debtors, and Creditors into one browser screen backed directly by your Google Sheets database.',
    screenId: 'dashboard',
    whoNeedsIt: [
      'Business owners who want daily cash-flow and sales visibility without waiting for end-of-month spreadsheets',
      'Wholesalers and trading firms reconciling multiple customer accounts and supplier bills weekly',
      'Operations managers tracking stock value alongside pending customer receivables',
    ],
    keyCapabilities: [
      {
        title: 'Consolidated Financial KPIs',
        detail:
          'Review Total Sales, Receivables, Payables, and Total Purchases side by side on opening the workspace.',
      },
      {
        title: 'Recent Invoices Snapshot',
        detail:
          'Verify newly issued Tax Invoices and Bills of Supply with invoice numbers, dates, and amounts.',
      },
      {
        title: 'Inventory & Stock Health',
        detail:
          'Monitor Stock Valuation at cost alongside Low-Stock and Out-of-Stock SKU counts before dispatch delays occur.',
      },
      {
        title: 'Party Master Counters',
        detail:
          'Track total active products, debtors, creditors, and recorded vouchers directly from the dashboard.',
      },
    ],
    workflowSteps: [
      {
        step: 'Record daily entries',
        detail:
          'Enter delivery challans, sales invoices, vendor bills, and receipts inside HisabSarthi.',
      },
      {
        step: 'Automatic ledger sync',
        detail:
          'Google Apps Script writes structured transactions into your dedicated Google Spreadsheet in your Google Drive.',
      },
      {
        step: 'Instant dashboard review',
        detail:
          'Open the dashboard from any browser to check updated sales, receivables, payables, and stock totals.',
      },
    ],
    practicalExample: {
      scenario:
        'A Noida food-supply distributor previously merged 4 separate Excel files every Saturday to see total weekly sales and overdue buyer balances.',
      outcome:
        'With HisabSarthi, each invoice and receipt updates the dashboard totals immediately, allowing the owner to check receivables and low-stock SKUs in under two minutes.',
    },
    limitations: [
      'Dashboard metrics reflect entries recorded inside HisabSarthi; external cash or bank transactions must be logged to appear in totals.',
      'Requires an active internet connection and authorized Google account access under standard Google Apps Script quotas.',
    ],
    faqs: [
      {
        question: 'Does the HisabSarthi dashboard require desktop installation?',
        answer:
          'No. The dashboard runs in a standard web browser via your dedicated application link set up by the Suraj Automation Team.',
      },
      {
        question: 'Where does the dashboard pull its numbers from?',
        answer:
          'It reads and summarizes structured transaction records stored inside the dedicated Google Spreadsheet created in your authorized Google Drive.',
      },
    ],
    relatedSlugs: ['gst-reporting', 'ageing-reports', 'inventory-management'],
    relatedGuideSlug: 'automated-mis-reporting-google-sheets',
  },
  {
    slug: 'delivery-challan-management',
    title: 'Delivery Challans & Consolidated Billing',
    seoTitle: 'Delivery Challan & Consolidated Invoice Software | HisabSarthi',
    seoDescription:
      'Create daily delivery challans by customer and delivery site, track pending dispatches, and convert multiple challans into one consolidated GST invoice.',
    kicker: 'Feature Deep-Dive · Delivery Challans & Dispatch',
    headline: 'Track Daily Delivery Challans and Generate One Consolidated Invoice',
    directAnswer:
      'HisabSarthi Delivery Challan Management records daily item-wise dispatches per customer and delivery site, tracks whether each challan is Pending or Invoiced, prints dispatch slips, and merges multiple selected challans into a single consolidated invoice.',
    screenId: 'consolidated-invoice',
    whoNeedsIt: [
      'Corporate catering and grocery suppliers sending daily dispatches to multiple client sites',
      'Distributors and wholesalers who dispatch goods throughout the week or month and bill periodically',
      'Multi-site B2B supply businesses needing receiver sign-off slips plus accurate month-end invoicing',
    ],
    keyCapabilities: [
      {
        title: 'Customer & Site-Wise Dispatch Records',
        detail:
          'Log each delivery challan against a specific client and delivery site along with vehicle, transporter, LR, and E-Way bill references.',
      },
      {
        title: 'Pending vs. Invoiced Status Tracking',
        detail:
          'See total unbilled challans and pending dispatch value immediately so no delivery is accidentally missed during billing.',
      },
      {
        title: 'Group Items or Itemized Line Consolidation',
        detail:
          'Combine matching products across multiple challans into summed quantities or retain separate rows tagged with challan number and date.',
      },
      {
        title: 'Ready-to-Print Delivery Challan Slips',
        detail:
          'Print clean dispatch slips complete with consignee details, delivery site address, and receiver signature stamp boxes.',
      },
    ],
    workflowSteps: [
      {
        step: 'Create daily challans',
        detail:
          'Select customer, delivery site, and dispatched item quantities to generate a printable challan.',
      },
      {
        step: 'Filter unbilled challans',
        detail:
          'At week-end or month-end, open Consolidated Invoice and fetch pending challans by client, site, and date range.',
      },
      {
        step: 'Generate one consolidated invoice',
        detail:
          'Select eligible challans, pick Group Items or Itemized Lines, and convert them into one GST-ready invoice.',
      },
    ],
    practicalExample: {
      scenario:
        'A kitchen supplier delivers 22 separate orders across a month to two corporate cafeteria sites of the same client.',
      outcome:
        'Instead of re-typing 22 challans into Excel, the billing operator selects the site and date range, previews grouped item quantities, and generates one verified consolidated invoice.',
    },
    limitations: [
      'Consolidated invoices combine eligible unbilled challans belonging to a single selected customer account.',
      'Once challans are marked Invoiced, verify quantities before printing and dispatching the final tax bill.',
    ],
    faqs: [
      {
        question: 'Can I print individual delivery challans before invoicing?',
        answer:
          'Yes. Every delivery challan has a print-ready slip displaying consignee info, site address, vehicle/LR fields, item totals, and a receiver signature area.',
      },
      {
        question: 'Can I keep separate challan dates visible inside a consolidated invoice?',
        answer:
          'Yes. HisabSarthi supports both Group Items mode (combining matching products) and Itemized Lines mode (keeping rows tagged with challan and date).',
      },
    ],
    relatedSlugs: ['custom-pricing', 'business-dashboard', 'inventory-management'],
    relatedGuideSlug: 'multiple-delivery-challans-consolidated-invoice',
  },
  {
    slug: 'gst-reporting',
    title: 'GST Summary & HSN Reporting',
    seoTitle: 'GST Summary & HSN Reconciliation Reporting Software | HisabSarthi',
    seoDescription:
      'Generate organized GST sales and purchase summaries, HSN/SAC breakdowns, and CGST, SGST, IGST reports for faster accounting review and reconciliation.',
    kicker: 'Feature Deep-Dive · Business Reports & GST',
    headline: 'Organized GST Sales, Purchase, and HSN Summaries for Accounting Review',
    directAnswer:
      'HisabSarthi automatically organizes recorded Tax Invoices, Bills of Supply, and vendor purchase bills into structured GST Sales and Purchase Summaries, HSN/SAC summaries, and CGST/SGST/IGST breakdowns to simplify review and CA reconciliation.',
    screenId: 'printable-invoice',
    whoNeedsIt: [
      'Traders and distributors who spend hours totaling GST rates across scattered billing sheets before filing',
      'Accounting teams preparing clean sales, purchase, and HSN summaries for their Chartered Accountant',
      'Growing SMBs issuing both intra-state (CGST/SGST) and inter-state (IGST) invoices',
    ],
    keyCapabilities: [
      {
        title: 'Tax Invoice & Bill of Supply Support',
        detail:
          'Generate properly formatted Tax Invoices with GST calculations alongside Bills of Supply for exempt or non-GST items.',
      },
      {
        title: 'CGST, SGST & IGST Summaries',
        detail:
          'Review tax split totals cleanly across intra-state and inter-state supply transactions.',
      },
      {
        title: 'HSN / SAC Code Summaries',
        detail:
          'Aggregate taxable value and tax amounts grouped by HSN/SAC code directly from recorded product masters.',
      },
      {
        title: 'Sales & Purchase Reconciliation',
        detail:
          'Cross-check GST sales registers against recorded GST vendor purchase bills in one place.',
      },
    ],
    workflowSteps: [
      {
        step: 'Configure GST Rate & Product Master',
        detail:
          'Set HSN/SAC codes and applicable GST rates once during setup with the Suraj Automation Team.',
      },
      {
        step: 'Record sales & purchase bills',
        detail:
          'Create Tax Invoices, Bills of Supply, and vendor purchase entries as transactions happen.',
      },
      {
        step: 'Review GST reports',
        detail:
          'Open GST Reports for any date range to reconcile CGST, SGST, IGST, and HSN totals with your accountant.',
      },
    ],
    practicalExample: {
      scenario:
        'A wholesale trader previously collected printed purchase bills and manual invoice sheets every month to manually sum 5%, 12%, and 18% GST totals.',
      outcome:
        'With HisabSarthi, sales and purchase GST summaries stay organized continuously, giving the accountant clean review tables ready for verification prior to filing.',
    },
    limitations: [
      'GST reports are intended for accounting review and reconciliation only.',
      'HisabSarthi does not automatically file GST returns on the GST portal; businesses and their tax advisors remain responsible for verifying and submitting statutory filings.',
    ],
    faqs: [
      {
        question: 'Does HisabSarthi file GSTR-1 or GSTR-3B automatically?',
        answer:
          'No. HisabSarthi prepares organized GST sales, purchase, CGST/SGST/IGST, and HSN/SAC summary reports for accounting review and reconciliation. Automatic portal filing is not included.',
      },
      {
        question: 'Can I record both Tax Invoices and Bills of Supply?',
        answer:
          'Yes. HisabSarthi supports both Tax Invoices with GST calculation and Bills of Supply for applicable items.',
      },
    ],
    relatedSlugs: ['business-dashboard', 'ageing-reports', 'delivery-challan-management'],
    relatedGuideSlug: 'gst-reporting-reconciliation-guide',
  },
  {
    slug: 'ageing-reports',
    title: 'Ageing Reports & Party Ledgers',
    seoTitle: 'Outstanding Ageing Report & Party Ledger Software | HisabSarthi',
    seoDescription:
      'Track pending customer payments, party-wise ledgers, debit/credit notes, and automated outstanding ageing reports in HisabSarthi.',
    kicker: 'Feature Deep-Dive · Receivables & Party Ledgers',
    headline: 'Know Exactly Who Owes What — and How Long Payments Have Been Pending',
    directAnswer:
      'HisabSarthi pairs party-wise Debtor and Creditor ledgers with automated Outstanding Ageing Reports so business owners can see pending balances grouped by overdue duration and follow up on receivables systematically.',
    screenId: 'party-ledger',
    whoNeedsIt: [
      'Wholesalers and distributors selling on 15-day, 30-day, or 45-day credit terms',
      'Business owners who lose track of partial payments across dozens of active buyers',
      'Accounts staff who frequently send party ledger statements for balance confirmation',
    ],
    keyCapabilities: [
      {
        title: 'Party-Wise Debtor & Creditor Ledgers',
        detail:
          'View opening balance, date-wise invoices, payments, debit/credit notes, journal entries, and running balance for every customer or vendor.',
      },
      {
        title: 'Automated Outstanding Ageing Analysis',
        detail:
          'Group unpaid amounts into ageing buckets so long-pending invoices stand out immediately.',
      },
      {
        title: 'Customer Receipts & Vendor Payments',
        detail:
          'Record incoming customer receipts and outgoing vendor payouts to keep balances reconciled.',
      },
      {
        title: 'Print-Ready Ledger Statements',
        detail:
          'Generate clean party ledger statements (Print A / Print B formats) to share during reconciliation.',
      },
    ],
    workflowSteps: [
      {
        step: 'Issue invoices & record bills',
        detail:
          'Every sales invoice increases customer receivables and every vendor bill updates payables automatically.',
      },
      {
        step: 'Log receipts & adjustments',
        detail:
          'Enter customer receipts, vendor payments, and debit/credit notes as settlements arrive.',
      },
      {
        step: 'Inspect Ageing & Ledgers',
        detail:
          'Filter party ledgers by date range or review the Ageing Report to prioritize overdue collections.',
      },
    ],
    practicalExample: {
      scenario:
        'A multi-site supplier had ₹12 lakh+ in outstanding receivables spread across 30 clients without knowing which invoices had crossed 60 days.',
      outcome:
        'Using HisabSarthi party ledgers and ageing views, the team identified overdue accounts in minutes and sent printable ledger statements for faster settlement.',
    },
    limitations: [
      'Ageing accuracy depends on recording customer receipts and credit notes promptly after payments are received.',
    ],
    faqs: [
      {
        question: 'Can I view separate ledgers for customers (debtors) and vendors (creditors)?',
        answer:
          'Yes. HisabSarthi maintains separate Debtor and Creditor masters with dedicated date-range party ledger statements.',
      },
      {
        question: 'Are debit notes, credit notes, and journal entries supported?',
        answer:
          'Yes. The Payments & Accounting module includes receipts, vendor payments, debit/credit notes, and journal entries.',
      },
    ],
    relatedSlugs: ['business-dashboard', 'gst-reporting', 'delivery-challan-management'],
    relatedGuideSlug: 'ageing-report-outstanding-payments',
  },
  {
    slug: 'inventory-management',
    title: 'Inventory & Stock Management',
    seoTitle: 'Inventory & Stock Valuation Software on Google Sheets | HisabSarthi',
    seoDescription:
      'Track real-time stock quantities, stock valuation at cost, movement ledgers, low-stock alerts, reorder suggestions, and dead-stock analysis.',
    kicker: 'Feature Deep-Dive · Inventory & Stock Control',
    headline: 'Real-Time Stock Tracking, Valuation at Cost, and Low-Stock Alerts',
    directAnswer:
      'HisabSarthi Inventory & Stock Management tracks opening stock, purchases, sales deductions, manual adjustments, stock valuation at cost, low-stock/out-of-stock alerts, reorder suggestions, and dead-stock analysis from one centralized SKU ledger.',
    screenId: 'inventory-stock',
    whoNeedsIt: [
      'Traders and wholesalers dealing with stock mismatches between purchase bills and daily dispatches',
      'Grocery, FMCG, and supply businesses managing dozens or hundreds of SKUs',
      'Store managers wanting fast barcode/SKU lookup and dead-stock visibility',
    ],
    keyCapabilities: [
      {
        title: 'Stock Valuation at Cost & Margin Insight',
        detail:
          'Monitor current warehouse asset capital at cost alongside potential sales value.',
      },
      {
        title: 'Stock Movement Ledger & Adjustments',
        detail:
          'Audit opening stock, purchased quantities, sold quantities, and manual stock adjustments per SKU.',
      },
      {
        title: 'Low-Stock Alerts & Reorder Suggestions',
        detail:
          'Spot items approaching safety levels or running out of stock before customer orders stall.',
      },
      {
        title: 'Dead-Stock Analysis & CSV Export',
        detail:
          'Identify idle inventory with no recent movement and export stock summaries to CSV anytime.',
      },
    ],
    workflowSteps: [
      {
        step: 'Set up Product & SKU Master',
        detail:
          'Import or add products with SKUs, units, cost prices, default selling prices, and safety levels.',
      },
      {
        step: 'Record purchases & sales',
        detail:
          'Purchase entries add to stock while sales and adjustments update stock-in-hand automatically.',
      },
      {
        step: 'Review stock health & export',
        detail:
          'Filter out-of-stock or low-stock SKUs, inspect movement history, or export inventory to CSV.',
      },
    ],
    practicalExample: {
      scenario:
        'A trading firm frequently over-ordered slow-moving items while running out of fast-selling essentials because stock lived in a manual register.',
      outcome:
        'With HisabSarthi Inventory & Stock Management, the team checks low-stock alerts every morning and reviews dead-stock capital before placing vendor orders.',
    },
    limitations: [
      'Physical stock counts should still be reconciled periodically using the Stock Adjustments tool to account for spoilage, breakage, or pilferage.',
    ],
    faqs: [
      {
        question: 'Can I search products by barcode or SKU?',
        answer:
          'Yes. The Inventory module includes SKU, product name, HSN, and barcode search filtering.',
      },
      {
        question: 'Can I export my current inventory data?',
        answer:
          'Yes. You can export inventory lists to CSV directly, and your underlying master data also resides in your Google Drive spreadsheet.',
      },
    ],
    relatedSlugs: ['custom-pricing', 'delivery-challan-management', 'business-dashboard'],
    relatedGuideSlug: 'automated-mis-reporting-google-sheets',
  },
  {
    slug: 'custom-pricing',
    title: 'Customer & Site-Wise Custom Pricing',
    seoTitle: 'Customer & Site-Wise Custom Product Pricing Software | HisabSarthi',
    seoDescription:
      'Manage customer-specific and site-specific product rates with effective dates, rate revisions, and default vs custom price comparison.',
    kicker: 'Feature Deep-Dive · Custom Product Pricing',
    headline: 'Different Customers. Different Sites. One Organized Pricing System.',
    directAnswer:
      'HisabSarthi Custom Product Pricing lets B2B suppliers configure customer-wise and delivery-site-wise product rates with effective start and end dates, eliminating billing rate errors across contract accounts.',
    screenId: 'custom-pricing',
    whoNeedsIt: [
      'B2B wholesalers negotiating custom contract rates for high-volume buyers',
      'Food, vegetable, and grocery suppliers whose rates differ by delivery site or monthly contract',
      'Billing teams tired of checking old WhatsApp chats or notebooks to verify a customer rate',
    ],
    keyCapabilities: [
      {
        title: 'Customer & Delivery-Site Rate Overrides',
        detail:
          'Assign distinct rates not only per client, but also per delivery location when multi-site contracts vary.',
      },
      {
        title: 'Effective Date Management',
        detail:
          'Set Effective From and optional Effective To dates along with contract remarks for clean rate revisions.',
      },
      {
        title: 'Default vs. Custom Price Comparison',
        detail:
          'Inspect default catalog price, current active rate, and revised custom rate side by side before saving.',
      },
      {
        title: 'Active Pricing Status Control',
        detail:
          'Keep active contract price sheets organized without overwriting your base product master.',
      },
    ],
    workflowSteps: [
      {
        step: 'Select client & delivery site',
        detail:
          'Pick the debtor account and place-of-supply site from your central master list.',
      },
      {
        step: 'Set effective dates & custom rates',
        detail:
          'Enter revised custom rates for applicable SKUs or fill defaults and adjust exceptions.',
      },
      {
        step: 'Bill accurately every time',
        detail:
          'Reference active customer-site pricing cleanly when raising challans and sales invoices.',
      },
    ],
    practicalExample: {
      scenario:
        'A corporate catering supplier bills 12 client kitchens where each contract has different negotiated rates for staples and vegetables.',
      outcome:
        'Instead of manually remembering prices during billing, operators maintain active customer-site rate sheets with clear effective dates inside HisabSarthi.',
    },
    limitations: [
      'Rate revisions require updating the effective date entry when supplier contracts renegotiate pricing.',
    ],
    faqs: [
      {
        question: 'Can two sites of the same company have different rates?',
        answer:
          'Yes. Custom Product Pricing supports both client-level and specific delivery-site rate configurations.',
      },
      {
        question: 'Does custom pricing overwrite my default product price?',
        answer:
          'No. Default product rates stay intact in the Product Master, and HisabSarthi shows default vs. custom rates side by side.',
      },
    ],
    relatedSlugs: ['delivery-challan-management', 'inventory-management', 'business-dashboard'],
    relatedGuideSlug: 'multiple-delivery-challans-consolidated-invoice',
  },
  {
    slug: 'bank-reconciliation-multi-bank',
    title: 'Multi-Bank & Smart BRS',
    seoTitle: 'Multi-Bank & Smart Bank Reconciliation (BRS) Software | HisabSarthi',
    seoDescription:
      'Manage multiple business bank accounts, auto-match NetBanking CSV statements, track uncleared cheques, and generate CA-standard BRS reports with ₹0.00 variance.',
    kicker: 'New Feature · Intelligent Banking & Reconciliation',
    headline: 'Effortless Bank Reconciliation with Multi-Bank Power.',
    directAnswer:
      'HisabSarthi Multi-Bank & Smart Bank Reconciliation (BRS) lets growing businesses manage unlimited Current, Savings, and OD/CC bank accounts, auto-match NetBanking CSV statements by amount, date, and UTR/cheque reference, track uncleared cheques, book quick bank charges or interest on the fly, and print CA-standard BRS reports with Annexures.',
    screenId: 'dashboard',
    whoNeedsIt: [
      'Growing businesses operating multiple Current, Savings, or OD/CC accounts across HDFC, SBI, ICICI, Axis, Kotak, and more',
      'Accounts teams spending hours manually ticking NetBanking statements against Excel ledgers',
      'Business owners preparing clean audit-ready BRS statements with uncleared cheque annexures for their Chartered Accountant',
    ],
    keyCapabilities: [
      {
        title: 'Multi-Bank Account Management',
        detail:
          'Configure HDFC, SBI, ICICI, Axis, Kotak, and more with opening balances, IFSC codes, UPI VPAs, and default bank selection.',
      },
      {
        title: 'Live 4-Card Reconciliation Workspace',
        detail:
          'Monitor Balance as per Company Books, (+) Cheques Issued Not Yet Presented, (-) Cheques Deposited Not Yet Cleared, and (=) Reconciled Passbook Balance in real time.',
      },
      {
        title: 'Smart Bank Statement CSV Auto-Matcher',
        detail:
          'Drop NetBanking CSV statements to auto-match amounts, dates, and UTR/cheque references with confidence scores.',
      },
      {
        title: '1-Click Clearance & Quick Bank Adjustments',
        detail:
          'Use instant Clear Today, bulk value-date updates, and inline Quick Bank Adjustments for bank fees or interest credits without leaving BRS.',
      },
    ],
    workflowSteps: [
      {
        step: 'Pick Your Bank & Cut-Off Date',
        detail:
          'Select your bank account and cut-off date (Today, Month-End, or Custom Period), then enter your statement balance.',
      },
      {
        step: 'Clear & Auto-Match Transactions',
        detail:
          'Click Clear Today, batch update clearance dates, or upload your NetBanking CSV for automated matching.',
      },
      {
        step: 'Export Audit-Ready BRS',
        detail:
          'Verify your ₹0.00 variance, then print or download a professional PDF/CSV statement complete with Annexures of uncleared cheques.',
      },
    ],
    practicalExample: {
      scenario:
        'An accounts operator previously maintained 3 separate Excel workbooks for HDFC Current, SBI CC, and ICICI accounts, manually color-highlighting uncleared cheques each month.',
      outcome:
        'With HisabSarthi Smart BRS, switching bank accounts takes one dropdown click, CSV auto-matching reconciles cleared entries in seconds, and CA-ready BRS Annexures print in one click.',
    },
    limitations: [
      'CSV auto-matching depends on downloading standard CSV statements from your bank NetBanking portal and verifying suggested matches before finalizing.',
      'Bank adjustments and BRS reports support accounting review and audit preparation inside your Google Sheets database.',
    ],
    faqs: [
      {
        question: 'Can I reconcile multiple bank accounts including OD/CC accounts in HisabSarthi?',
        answer:
          'Yes. The Multi-Bank Master supports Current, Savings, and OD/CC accounts with opening balances, IFSC codes, UPI VPAs, and a unified dropdown switcher inside the BRS workspace.',
      },
      {
        question: 'How does the NetBanking CSV Auto-Matcher work?',
        answer:
          'Download your bank statement CSV from NetBanking and upload it into HisabSarthi BRS to automatically match entries by amount, date proximity, and UTR/cheque reference with confidence scores.',
      },
    ],
    relatedSlugs: ['ageing-reports', 'business-dashboard', 'gst-reporting'],
    relatedGuideSlug: 'automated-mis-reporting-google-sheets',
  },
];

export const SOLUTION_PAGES: SolutionPageData[] = [
  {
    slug: 'wholesalers-distributors',
    title: 'Wholesalers & Distributors',
    seoTitle: 'Accounting & Inventory Software for Wholesalers & Distributors | HisabSarthi',
    seoDescription:
      'Manage wholesale billing, daily delivery challans, customer-wise pricing, warehouse stock valuation, and overdue ageing in one lifetime software.',
    kicker: 'Industry Solution · Wholesalers & Distributors',
    headline: 'Connected Billing, Stock Control, and Receivables Tracking for Wholesalers & Distributors',
    directAnswer:
      'Wholesalers and distributors use HisabSarthi to connect daily delivery challans, consolidated invoices, customer-specific wholesale rates, real-time stock valuation, vendor bills, and party ageing reports inside one Google Sheets-powered workspace.',
    challenges: [
      {
        title: 'High-volume daily dispatches',
        detail:
          'Tracking dozens of daily deliveries across separate Excel sheets leads to unbilled challans and lost revenue.',
      },
      {
        title: 'Credit-cycle receivables risk',
        detail:
          'Without automated ageing reports, overdue distributor accounts slip past 30 and 60 days unnoticed.',
      },
      {
        title: 'Tiered wholesale pricing',
        detail:
          'Different dealers receive negotiated prices, making manual invoice verification slow and error-prone.',
      },
    ],
    howHisabSarthiHelps: [
      {
        module: 'Delivery Challans & Consolidated Billing',
        benefit: 'Convert multiple weekly dispatches per dealer into one clean GST Tax Invoice.',
        featureSlug: 'delivery-challan-management',
      },
      {
        module: 'Customer-Wise Custom Pricing',
        benefit: 'Store negotiated dealer rates with effective dates alongside default catalog pricing.',
        featureSlug: 'custom-pricing',
      },
      {
        module: 'Inventory & Stock Valuation',
        benefit: 'Monitor real-time warehouse stock at cost, low-stock alerts, and dead stock.',
        featureSlug: 'inventory-management',
      },
      {
        module: 'Ageing Reports & Party Ledgers',
        benefit: 'Track every rupee receivable by age bracket and generate printable party ledgers.',
        featureSlug: 'ageing-reports',
      },
    ],
    typicalWorkflow: [
      'Record inward supplier purchase bills to update warehouse inventory and vendor payables.',
      'Issue printable delivery challans with vehicle and site details for daily wholesale dispatches.',
      'Select pending challans at week-end or month-end to generate consolidated Tax Invoices.',
      'Track incoming receipts, inspect ageing reports, and export GST summaries for CA review.',
    ],
    faqs: [
      {
        question: 'Is there a recurring monthly fee as our wholesale order volume grows?',
        answer:
          'No. HisabSarthi is offered at a one-time payment of ₹4,999 for lifetime software access, including initial setup by the Suraj Automation Team (standard Google account and Apps Script usage quotas apply).',
      },
      {
        question: 'Can we import our existing historical invoices or vendor bills?',
        answer:
          'Yes. HisabSarthi supports CSV import for historical sales invoices and vendor bills.',
      },
    ],
    relatedGuideSlug: 'ageing-report-outstanding-payments',
  },
  {
    slug: 'food-catering-suppliers',
    title: 'Food, Grocery & Corporate Catering Suppliers',
    seoTitle: 'Billing & Challan Software for Food, Grocery & Catering Suppliers | HisabSarthi',
    seoDescription:
      'Handle multi-site daily deliveries, site-wise custom rates, Bill of Supply & Tax Invoices, and consolidated monthly billing with HisabSarthi.',
    kicker: 'Industry Solution · Food, Grocery & Catering Suppliers',
    headline: 'Purpose-Built Multi-Site Challans and Consolidated Invoicing for Food & Catering Suppliers',
    directAnswer:
      'Food, grocery, and corporate catering suppliers use HisabSarthi to log daily site-wise deliveries, apply client-contract rates, print site challans, and merge a whole week or month of deliveries into one accurate consolidated Bill of Supply or Tax Invoice.',
    challenges: [
      {
        title: 'Multiple client sites per corporate account',
        detail:
          'One corporate buyer often requires deliveries to 3–10 separate kitchens, offices, or store locations.',
      },
      {
        title: 'Frequent rate revisions on perishables',
        detail:
          'Weekly or monthly contract pricing changes create billing disputes if not tracked with effective dates.',
      },
      {
        title: 'Time-consuming month-end bill consolidation',
        detail:
          'Manually adding up 20–30 delivery slips per site takes hours and risks arithmetic errors.',
      },
    ],
    howHisabSarthiHelps: [
      {
        module: 'Multi-Site Delivery Challans',
        benefit: 'Log daily dispatches tagged to exact delivery sites with receiver signature slips.',
        featureSlug: 'delivery-challan-management',
      },
      {
        module: 'Site-Wise Custom Pricing',
        benefit: 'Maintain client and site-specific contract rates with Effective From / To dates.',
        featureSlug: 'custom-pricing',
      },
      {
        module: 'Bill of Supply & Tax Invoice',
        benefit: 'Handle both GST-exempt fresh produce (Bill of Supply) and taxable packaged supplies cleanly.',
        featureSlug: 'gst-reporting',
      },
      {
        module: 'Business Dashboard & Receivables',
        benefit: 'Track site-wise billing totals and corporate payout timelines in one view.',
        featureSlug: 'business-dashboard',
      },
    ],
    typicalWorkflow: [
      'Configure corporate clients and their individual delivery sites in Customer & Site Masters.',
      'Set monthly or periodic contract rates per site inside Custom Product Pricing.',
      'Print daily Delivery Challans for drivers and collect receiver signatures at each site.',
      'At billing close, fetch all unbilled challans for a site and generate one consolidated invoice.',
    ],
    faqs: [
      {
        question: 'Can HisabSarthi generate Bills of Supply for fresh vegetables and exempt grocery items?',
        answer:
          'Yes. HisabSarthi supports both Tax Invoices (with CGST/SGST/IGST) and Bills of Supply with full delivery site and bank/UPI details.',
      },
      {
        question: 'Can we group repeated daily items like potatoes or oil into one summed invoice line?',
        answer:
          'Yes. Consolidated Invoice generation includes Group Items mode to sum repeated items, or Itemized Lines mode if your client prefers date-wise rows.',
      },
    ],
    relatedGuideSlug: 'multiple-delivery-challans-consolidated-invoice',
  },
  {
    slug: 'small-business-accounting',
    title: 'Small & Medium Businesses',
    seoTitle: 'Affordable Lifetime Accounting Software for Small Businesses | HisabSarthi',
    seoDescription:
      'Replace scattered Excel files and monthly software subscriptions with HisabSarthi — ₹4,999 one-time lifetime accounting software with free team setup.',
    kicker: 'Industry Solution · Small & Medium Businesses',
    headline: 'Practical Business Accounting Without Monthly Subscriptions or Technical Setup Headaches',
    directAnswer:
      'Small and medium trading businesses use HisabSarthi to replace disconnected Excel spreadsheets with one browser-based accounting and inventory system stored in their own Google Drive, configured end-to-end by the Suraj Automation Team for a one-time ₹4,999 payment.',
    challenges: [
      {
        title: 'Recurring SaaS subscription fatigue',
        detail:
          'Paying monthly or annual renewal fees for basic invoicing, stock, and ledger tools adds recurring overhead.',
      },
      {
        title: 'Complex enterprise software learning curves',
        detail:
          'Heavy accounting suites require specialized operators and lengthy self-configuration.',
      },
      {
        title: 'Data lock-in anxiety',
        detail:
          'Business owners want direct visibility and ownership over their transaction records.',
      },
    ],
    howHisabSarthiHelps: [
      {
        module: 'Business Dashboard & Quick Stats',
        benefit: 'See sales, purchases, stock value, receivables, and payables in seconds.',
        featureSlug: 'business-dashboard',
      },
      {
        module: 'Inventory & Reorder Alerts',
        benefit: 'Keep item-wise stock accurate without manual spreadsheet formulas.',
        featureSlug: 'inventory-management',
      },
      {
        module: 'Party Ledgers & Ageing',
        benefit: 'Track every customer receipt and vendor payment with printable statements.',
        featureSlug: 'ageing-reports',
      },
      {
        module: 'GST & HSN Review Summaries',
        benefit: 'Share clean GST sales, purchase, and HSN summaries with your CA.',
        featureSlug: 'gst-reporting',
      },
    ],
    typicalWorkflow: [
      'Confirm setup with Suraj Automation Team via WhatsApp or call (+91 93553 37839).',
      'Authorize Google Drive access via Google’s official screen—no password sharing required.',
      'Receive your ready-to-use browser application link and complete guided onboarding.',
      'Run daily invoices, purchases, stock, and ledgers with zero monthly subscription fees.',
    ],
    faqs: [
      {
        question: 'Do I need technical or coding skills to use HisabSarthi?',
        answer:
          'No. The Suraj Automation Team configures the application, initializes your Google Sheets database, and guides you through initial onboarding.',
      },
      {
        question: 'Can I access HisabSarthi from multiple computers?',
        answer:
          'Because HisabSarthi is browser-based and connected to your authorized Google Workspace/Gmail account, you can access it via your application link without installing desktop software.',
      },
    ],
    relatedGuideSlug: 'what-is-hisabsarthi',
  },
];

export const GUIDE_ARTICLES: GuideArticleData[] = [
  {
    slug: 'what-is-hisabsarthi',
    title: 'What Is HisabSarthi? Complete Guide to Google Sheets-Based Business Accounting',
    seoTitle: 'What Is HisabSarthi? Features, Pricing & Architecture Guide',
    seoDescription:
      'Learn what HisabSarthi by Suraj Automation is, how its Google Sheets & Apps Script architecture works, what modules are included for ₹4,999, and its transparent limitations.',
    category: 'Product Overview & AEO',
    publishedTime: '2026-11-18',
    readingTime: '5 min read',
    directAnswer:
      'HisabSarthi (also searched as HisaabSarthi) is a browser-based smart accounting, inventory, delivery challan, and business MIS reporting application built by Suraj Automation using Google Apps Script and Google Sheets. Offered at a one-time payment of ₹4,999 for lifetime software access, it includes full initial setup by the Suraj Automation Team and stores your business database directly inside your authorized Google Drive.',
    sections: [
      {
        heading: 'Who Built HisabSarthi and Who Is It For?',
        paragraphs: [
          'HisabSarthi is developed and implemented by Suraj Automation for growing Indian wholesalers, distributors, food and grocery suppliers, corporate catering suppliers, retailers, and small-to-medium trading businesses.',
          'Rather than forcing businesses into complex enterprise ERP software or disconnected manual Excel sheets, HisabSarthi connects daily sales, dispatches, purchases, stock movements, and accounting ledgers inside one clean browser interface.',
        ],
      },
      {
        heading: 'Core Modules Included in the ₹4,999 Lifetime Plan',
        paragraphs: [
          'Every business deployment includes eight integrated operational modules configured for practical day-to-day workflows:',
        ],
        bullets: [
          'Sales & Invoice Management (Tax Invoice, Bill of Supply, site-wise billing, printing, CSV import)',
          'Smart Delivery Challan Management (daily site dispatches and consolidated invoice generation)',
          'Inventory & Stock Management (stock valuation at cost, movement ledger, low-stock and dead-stock analysis)',
          'Vendor & Purchase Management (vendor bills, GST purchase entries, vendor payment tracking)',
          'Customer & Vendor Masters (debtors, creditors, products, GST rates, bank accounts, delivery sites)',
          'Custom Product Pricing (customer-wise and site-wise rates with effective dates)',
          'Payments & Accounting (receipts, payments, debit/credit notes, journal entries, party ledgers)',
          'Business Reports & GST Summaries (dashboard KPIs, outstanding ageing, CGST/SGST/IGST and HSN summaries)',
        ],
      },
      {
        heading: 'How Customer Data Storage & Access Works',
        paragraphs: [
          'During onboarding, a dedicated Google Spreadsheet is created inside the customer’s authorized Google Drive account. HisabSarthi reads and writes business transactions through Google’s official OAuth authorization flow—customers never share their Gmail password with Suraj Automation.',
          'You retain ownership of your Google account and spreadsheet file, while HisabSarthi’s authorized code interacts with the connected business database to run invoices, stock updates, and reports.',
        ],
      },
    ],
    practicalExample: {
      title: 'Typical Transition From Manual Excel to HisabSarthi',
      body: 'A trading business previously using 5 separate Excel workbooks (one for billing, one for challans, one for stock, one for customer balances, and one for purchase bills) moves to HisabSarthi in 5 guided steps. Once configured by Suraj Automation Team, raising an invoice or recording a payment updates the dashboard, stock ledger, and party balance automatically.',
    },
    limitationsNote:
      'Transparency note: HisabSarthi requires a Google account and internet connection, operates within standard Google service availability and Apps Script usage quotas, and generates GST reports strictly for accounting review and reconciliation rather than automatic GST portal filing.',
    faqs: [
      {
        question: 'Is HisabSarthi a subscription or a one-time payment?',
        answer:
          'HisabSarthi is offered as a one-time payment of ₹4,999 for lifetime software access, including initial professional setup by the Suraj Automation Team.',
      },
      {
        question: 'Do I have to share my Gmail password during setup?',
        answer:
          'No. You authorize required permissions yourself through Google’s official authorization screen.',
      },
    ],
    relatedFeatureSlug: 'business-dashboard',
    relatedFeatureLabel: 'Explore the Business Dashboard',
  },
  {
    slug: 'automated-mis-reporting-google-sheets',
    title: 'How Automated MIS Reporting Works in Google Sheets & Apps Script',
    seoTitle: 'Automated MIS Reporting Using Google Sheets & Apps Script | Guide',
    seoDescription:
      'Discover how small and medium businesses replace manual Excel reporting with automated MIS dashboards powered by Google Sheets and Google Apps Script.',
    category: 'Google Sheets Automation',
    publishedTime: '2026-11-18',
    readingTime: '6 min read',
    directAnswer:
      'Automated MIS (Management Information System) reporting using Google Sheets and Google Apps Script works by capturing daily business transactions—such as sales invoices, vendor bills, receipts, and inventory adjustments—through a structured web interface and writing them into normalized spreadsheet tables that instantly power live dashboards and financial summaries.',
    sections: [
      {
        heading: 'Why Manual Excel MIS Breaks as a Business Grows',
        paragraphs: [
          'In early-stage businesses, maintaining sales and stock in standalone Excel files feels simple. Once order volume grows, however, manual copy-pasting introduces broken formulas, mismatched party balances, duplicate invoice numbers, and hours of end-of-week reconciliation.',
          'Structured Google Apps Script applications solve this by separating the data-entry UI (forms, validation, printing, search) from the underlying Google Sheets database.',
        ],
      },
      {
        heading: 'Key Components of a Reliable Google Sheets MIS Workflow',
        paragraphs: [
          'A dependable Sheets-backed MIS system relies on four architectural building blocks:',
        ],
        bullets: [
          'Central Masters: Standardized lists for customers, delivery sites, vendors, products/SKUs, and GST rates so names never fragment.',
          'Transactional Validation: Controlled entry screens for challans, invoices, purchase bills, and payments so every record follows a consistent schema.',
          'Automated Rollups: Real-time computation of Total Sales, Receivables, Payables, Stock Valuation, and Ageing buckets without manual pivot tables.',
          'Owner-Controlled Storage: Keeping structured tables inside the business owner’s Google Drive for straightforward backup and auditability.',
        ],
      },
      {
        heading: 'How HisabSarthi Implements Google Apps Script Automation',
        paragraphs: [
          'Instead of asking business owners to write formulas or Apps Script code themselves, the Suraj Automation Team deploys and configures HisabSarthi directly against a dedicated Google Spreadsheet in your Drive. You get a clean web application interface while keeping familiar spreadsheet transparency underneath.',
        ],
      },
    ],
    practicalExample: {
      title: 'Daily 2-Minute Owner MIS Check',
      body: 'Every evening, instead of calling three staff members for sales totals, pending receivables, and low-stock items, a distributor opens the HisabSarthi Dashboard to inspect Total Sales, Receivables, Payables, Recent Invoices, and Out-of-Stock SKUs in one screen.',
    },
    limitationsNote:
      'Google Apps Script workflows depend on internet connectivity and Google Workspace/Consumer Apps Script execution quotas, making them well-suited for small and medium trading businesses rather than high-frequency enterprise transaction processing.',
    faqs: [
      {
        question: 'Can Google Sheets reliably handle small business accounting and MIS?',
        answer:
          'Yes, when paired with a structured Google Apps Script application that enforces clean master records and consistent transaction schemas rather than ad-hoc manual cell editing.',
      },
      {
        question: 'Will I need to code Google Apps Script myself to use HisabSarthi?',
        answer:
          'No. Suraj Automation Team handles the complete initial configuration and database initialization.',
      },
    ],
    relatedFeatureSlug: 'business-dashboard',
    relatedFeatureLabel: 'See Business Dashboard Features',
  },
  {
    slug: 'gst-reporting-reconciliation-guide',
    title: 'How Growing Businesses Organize GST Summaries & HSN Reconciliation',
    seoTitle: 'How to Organize GST Summary & HSN Reconciliation Reports | Guide',
    seoDescription:
      'A practical guide to organizing GST sales, purchase bills, CGST/SGST/IGST splits, and HSN/SAC summaries for smooth monthly accounting review.',
    category: 'GST Reporting',
    publishedTime: '2026-11-18',
    readingTime: '5 min read',
    directAnswer:
      'To simplify monthly GST review without last-minute spreadsheet panic, businesses should record every Tax Invoice, Bill of Supply, and vendor purchase bill with standardized HSN/SAC codes and tax rates at transaction time, enabling instant CGST, SGST, IGST, and HSN summary tables for Chartered Accountant verification.',
    sections: [
      {
        heading: 'Common Causes of Monthly GST Reconciliation Delays',
        paragraphs: [
          'Most GST reconciliation headaches stem from recording sales in one format, keeping vendor bills in physical folders or WhatsApp photos, and missing HSN codes or intra-state vs. inter-state supply classifications until filing week.',
        ],
        bullets: [
          'Missing or inconsistent HSN/SAC codes across repeated products',
          'Mixing GST-taxable supplies and exempt Bills of Supply in unorganized sheets',
          'Unrecorded vendor purchase bills causing incomplete input-tax review',
          'Manual calculation errors when splitting CGST, SGST, and IGST',
        ],
      },
      {
        heading: 'A Clean 3-Step GST Reporting Routine',
        paragraphs: [
          '1. Lock HSN/SAC codes and GST slabs once inside your Product and GST Rate Master.',
          '2. Issue Tax Invoices and Bills of Supply from one connected system and log vendor purchase bills weekly rather than at month-end.',
          '3. At period close, review your GST Sales Summary, GST Purchase Summary, HSN/SAC Summary, and CGST/SGST/IGST totals alongside your accountant before submitting returns on the official GST portal.',
        ],
      },
    ],
    practicalExample: {
      title: 'Separating Exempt & Taxable Food Supplies',
      body: 'A grocery and catering distributor selling both exempt fresh produce and 5%/18% GST-taxable packaged goods uses HisabSarthi to issue Bills of Supply and Tax Invoices cleanly—so month-end HSN and tax-slab summaries are immediately ready for CA reconciliation.',
    },
    limitationsNote:
      'Important compliance clarification: Accounting software GST summaries—including HisabSarthi GST Reports—are designed for accounting review and reconciliation. Always verify figures with a qualified tax professional before filing statutory returns; HisabSarthi does not automatically file GST returns.',
    faqs: [
      {
        question: 'What GST reports does HisabSarthi generate?',
        answer:
          'HisabSarthi generates GST sales summaries, GST purchase summaries, HSN/SAC summaries, and CGST, SGST, and IGST breakdowns for review and reconciliation.',
      },
      {
        question: 'Does HisabSarthi replace my Chartered Accountant or auto-file returns?',
        answer:
          'No. It prepares organized accounting and GST summary reports so your review and CA reconciliation process is faster and less error-prone.',
      },
    ],
    relatedFeatureSlug: 'gst-reporting',
    relatedFeatureLabel: 'Explore GST Reporting Module',
  },
  {
    slug: 'ageing-report-outstanding-payments',
    title: 'What Is an Ageing Report? How to Track & Reduce Pending Receivables',
    seoTitle: 'What Is an Ageing Report? Guide to Tracking Outstanding Payments',
    seoDescription:
      'Understand what an accounts receivable ageing report is, how ageing buckets (0–30, 31–60, 60+ days) work, and how businesses improve collections.',
    category: 'Outstanding Payments',
    publishedTime: '2026-11-18',
    readingTime: '5 min read',
    directAnswer:
      'An ageing report (also called an accounts receivable ageing report) categorizes unpaid customer invoices by how many days they have been outstanding—typically 0–30 days, 31–60 days, and 60+ days—so business owners can immediately spot overdue accounts and protect working capital.',
    sections: [
      {
        heading: 'Why Total Receivables Alone Is Not Enough',
        paragraphs: [
          'Knowing that customers owe ₹20 lakh in total does not tell you whether those invoices were raised yesterday or four months ago. An ageing report exposes cash-flow risk by separating current credit balances from genuinely overdue invoices.',
        ],
      },
      {
        heading: 'How to Act on Ageing Buckets Weekly',
        paragraphs: [
          'High-performing distributors review their ageing report on a fixed day every week using a simple follow-up rhythm:',
        ],
        bullets: [
          '0–30 Days (Current): Verify invoice delivery and confirm expected payment schedule.',
          '31–60 Days (Attention Needed): Send a clean party-wise ledger statement showing invoice numbers and partial receipts.',
          '60+ Days (Overdue Priority): Escalate follow-up directly with the buyer and review credit limits before dispatching new orders.',
        ],
      },
      {
        heading: 'Connecting Party Ledgers and Ageing in HisabSarthi',
        paragraphs: [
          'In HisabSarthi, every sales invoice, customer receipt, and credit note feeds directly into the party ledger and automated ageing report—eliminating manual Excel date-difference formulas.',
        ],
      },
    ],
    practicalExample: {
      title: 'Cutting Collection Disputes With Printable Ledgers',
      body: 'When a buyer asks for invoice-wise confirmation before releasing payment, the accounts operator selects the debtor in HisabSarthi Ledger, chooses the date range, and prints or shares a clear running-balance statement in seconds.',
    },
    limitationsNote:
      'Ageing reports are only as current as your payment entries. Logging customer receipts and debit/credit notes promptly ensures follow-up calls are always accurate.',
    faqs: [
      {
        question: 'Can ageing analysis track both receivables and payables?',
        answer:
          'Yes. Tracking customer receivables helps speed up collections, while tracking vendor payables helps maintain strong supplier relationships and avoid late surprises.',
      },
      {
        question: 'Does HisabSarthi automate ageing reports?',
        answer:
          'Yes. HisabSarthi generates automated outstanding ageing reports alongside party-wise debtor and creditor ledgers.',
      },
    ],
    relatedFeatureSlug: 'ageing-reports',
    relatedFeatureLabel: 'Explore Ageing & Ledger Features',
  },
  {
    slug: 'multiple-delivery-challans-consolidated-invoice',
    title: 'How to Convert Multiple Delivery Challans into One Consolidated Invoice',
    seoTitle: 'Convert Multiple Delivery Challans into One Consolidated Invoice',
    seoDescription:
      'Step-by-step workflow showing how distributors and multi-site suppliers convert daily delivery challans into one accurate consolidated invoice.',
    category: 'Delivery Challans & Billing',
    publishedTime: '2026-11-18',
    readingTime: '4 min read',
    directAnswer:
      'Converting multiple delivery challans into one consolidated invoice involves logging each daily dispatch against a customer and delivery site, filtering all unbilled challans for a chosen date period, merging item quantities (either grouped by product or listed by challan date), and issuing one unified Tax Invoice or Bill of Supply while marking those challans as Invoiced.',
    sections: [
      {
        heading: 'Why Multi-Challan Businesses Struggle With Manual Billing',
        paragraphs: [
          'Businesses supplying food, groceries, packaging, or industrial consumables often deliver daily to the same client site but raise a consolidated bill weekly, fortnightly, or monthly. Manually totaling paper challans or spreadsheets frequently leads to skipped deliveries or double-billed slips.',
        ],
      },
      {
        heading: 'Step-by-Step Consolidated Invoicing Workflow',
        paragraphs: [
          'Inside HisabSarthi, the consolidated billing flow keeps dispatch and invoicing tightly linked:',
        ],
        bullets: [
          'Step 1: Create and print each Delivery Challan tagged with Client, Delivery Site, Vehicle/LR details, and dispatched quantities.',
          'Step 2: Open Generate Consolidated Invoice and filter by Client, Delivery Site, and Date Range (e.g., This Month or All Unbilled).',
          'Step 3: Check the eligible pending challans and choose Group Items (combine matching products and sum total qty) or Itemized Lines (keep separate rows tagged with Challan & Date).',
          'Step 4: Review the live estimated total, add optional remarks, and generate one consolidated invoice—automatically changing those challans from Pending to Invoiced.',
        ],
      },
    ],
    practicalExample: {
      title: 'Zero Unbilled Deliveries Across Multiple Client Sites',
      body: 'A catering supply company dispatches 18 challans across two Noida sites in one month. At month-end, the Pending Dispatch Value card immediately flags unbilled challans, and the operator converts all 18 into clean site-wise consolidated invoices in under two minutes.',
    },
    limitationsNote:
      'Always confirm with your tax advisor how delivery challan timelines and invoicing dates apply to your specific goods and GST registration category.',
    faqs: [
      {
        question: 'Can HisabSarthi prevent the same delivery challan from being billed twice?',
        answer:
          'Yes. Once selected challans are converted into a consolidated invoice, their status updates from Pending to Invoiced so they are clearly separated from unbilled dispatches.',
      },
      {
        question: 'Does consolidated billing work with site-wise custom rates?',
        answer:
          'Yes. HisabSarthi supports customer-wise and delivery-site custom product pricing so consolidated bills reflect negotiated contract rates.',
      },
    ],
    relatedFeatureSlug: 'delivery-challan-management',
    relatedFeatureLabel: 'Explore Delivery Challan Module',
  },
];

export function getFeaturePageBySlug(slug: string): FeaturePageData | undefined {
  return FEATURE_PAGES.find((page) => page.slug === slug);
}

export function getSolutionPageBySlug(slug: string): SolutionPageData | undefined {
  return SOLUTION_PAGES.find((page) => page.slug === slug);
}

export function getGuideBySlug(slug: string): GuideArticleData | undefined {
  return GUIDE_ARTICLES.find((guide) => guide.slug === slug);
}
