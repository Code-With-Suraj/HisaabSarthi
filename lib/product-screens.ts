export interface ProductScreen {
  id: string;
  shortLabel: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  featureId?: string;
}

export const PRODUCT_SCREENS: ProductScreen[] = [
  {
    id: 'dashboard',
    shortLabel: 'Dashboard',
    title: 'Business Overview Dashboard',
    caption:
      'Live view of Total Sales, Receivables, Payables, Purchases, Recent Invoices, Stock Valuation, and Quick Stats.',
    src: '/assets/aistudio/HisaabSarthi_96f9e8f2.PNG',
    alt: 'HisabSarthi Dashboard showing Total Sales, Receivables, Payables, Recent Invoices and Quick Stats',
    width: 1366,
    height: 641,
    featureId: 'reports-gst',
  },
  {
    id: 'delivery-challans',
    shortLabel: 'Challans',
    title: 'Delivery Challans & Dispatch Tracking',
    caption:
      'Track daily site dispatches, pending vs invoiced challans, vehicle details, and unbilled dispatch value in real time.',
    src: '/assets/aistudio/image_cad0b701.png',
    alt: 'HisabSarthi Delivery Challans management screen showing pending and invoiced dispatches',
    width: 1366,
    height: 641,
    featureId: 'delivery-challan',
  },
  {
    id: 'consolidated-invoice',
    shortLabel: 'Consolidated Bill',
    title: 'Generate Consolidated Invoice',
    caption:
      'Select client, delivery site, and date range to combine multiple delivery challans into one GST invoice with Group Items or Itemized modes.',
    src: '/assets/aistudio/image_0ae04a43.png',
    alt: 'HisabSarthi Generate Consolidated Invoice modal combining delivery challans by client and site',
    width: 1114,
    height: 605,
    featureId: 'delivery-challan',
  },
  {
    id: 'printable-invoice',
    shortLabel: 'Print Invoice',
    title: 'Ready-to-Print Tax Invoice & Bill of Supply',
    caption:
      'Clean professional invoice layout with Place of Supply, Ship-To Site, HSN/SAC, Bank & UPI details, and Authorised Signatory.',
    src: '/assets/aistudio/image_2bdff688.png',
    alt: 'HisabSarthi printable Bill of Supply and Tax Invoice format with bank details and signature',
    width: 542,
    height: 626,
    featureId: 'sales-invoice',
  },
  {
    id: 'printable-challan',
    shortLabel: 'Print Challan',
    title: 'Printable Delivery Challan Slip',
    caption:
      'Site-ready dispatch challan with Vehicle No, Transporter/LR, E-Way Bill, item quantities, and receiver sign-off box.',
    src: '/assets/aistudio/image_fd8b06ba.png',
    alt: 'HisabSarthi printable Delivery Challan slip with consignee, delivery site and receiver signature section',
    width: 644,
    height: 610,
  },
  {
    id: 'inventory-stock',
    shortLabel: 'Inventory',
    title: 'Inventory & Stock Management',
    caption:
      'Real-time stock valuation at cost, potential sales value, SKU/barcode search, movement ledger, low-stock alerts, and dead-stock analysis.',
    src: '/assets/aistudio/image_eff33f61.png',
    alt: 'HisabSarthi Inventory and Stock Management dashboard with stock valuation and low-stock alerts',
    width: 1366,
    height: 645,
    featureId: 'inventory-stock',
  },
  {
    id: 'custom-pricing',
    shortLabel: 'Custom Pricing',
    title: 'Customer & Site-Wise Custom Pricing',
    caption:
      'Assign custom rates per client and delivery site with effective start/end dates and side-by-side default price comparison.',
    src: '/assets/aistudio/image_4b3e805f.png',
    alt: 'HisabSarthi Add Custom Product Pricing screen with client, site, effective dates and custom rate overrides',
    width: 701,
    height: 588,
    featureId: 'custom-pricing',
  },
  {
    id: 'party-ledger',
    shortLabel: 'Party Ledger',
    title: 'Party-Wise Ledger Statement',
    caption:
      'Instant debtor and creditor account statements with opening/closing balances, voucher history, delivery sites, and print-ready formats.',
    src: '/assets/aistudio/image_a7dcc538.png',
    alt: 'HisabSarthi Party Ledger screen showing client opening balance, invoices, debit, credit and running balance',
    width: 1359,
    height: 640,
    featureId: 'payments-accounting',
  },
];
