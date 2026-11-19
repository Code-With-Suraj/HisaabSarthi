'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Search,
  FileText,
  Truck,
  Package,
  BarChart3,
  Check,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  DEMO_RECENT_INVOICES,
  INITIAL_DEMO_CHALLANS,
  DEMO_INVENTORY_ITEMS,
  DEMO_AGEING_ROWS,
  DEMO_GST_HSN_ROWS,
  type DemoChallan,
  type DemoInvoice,
} from '@/lib/hisab-data';

type SimulatorTab = 'overview' | 'challans' | 'inventory' | 'reports';
type InvoiceStatusFilter = 'All' | 'Paid' | 'Pending' | 'Overdue';
type StockFilter = 'All' | 'Low Stock' | 'Out of Stock';
type PricingProfile = 'default' | 'ganesh-andheri' | 'annapurna-bkc';
type ReportView = 'ageing' | 'gst';

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardSimulator() {
  const [activeTab, setActiveTab] = useState<SimulatorTab>('overview');

  // Overview & Invoice state
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatusFilter>('All');
  const [invoices, setInvoices] = useState<DemoInvoice[]>(DEMO_RECENT_INVOICES);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(
    DEMO_RECENT_INVOICES[0].id
  );

  // Challan -> Consolidated Invoice state
  const [challans, setChallans] = useState<DemoChallan[]>(INITIAL_DEMO_CHALLANS);
  const [selectedChallanIds, setSelectedChallanIds] = useState<string[]>([
    'DC-1101',
    'DC-1104',
  ]);
  const [generatedInvoice, setGeneratedInvoice] = useState<{
    invoiceNo: string;
    customerName: string;
    siteName: string;
    gstin: string;
    challanIds: string[];
    items: {
      name: string;
      hsn: string;
      qty: number;
      unit: string;
      rate: number;
      defaultRate: number;
      gstRate: number;
    }[];
    taxableTotal: number;
    cgst: number;
    sgst: number;
    grandTotal: number;
    savings: number;
  } | null>(null);
  const [challanWarning, setChallanWarning] = useState<string | null>(null);

  // Inventory & Custom Pricing state
  const [skuSearch, setSkuSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<StockFilter>('All');
  const [pricingProfile, setPricingProfile] =
    useState<PricingProfile>('ganesh-andheri');

  // Reports state
  const [reportView, setReportView] = useState<ReportView>('ageing');

  // Derived filtered invoices
  const filteredInvoices = useMemo(() => {
    const q = invoiceSearch.trim().toLowerCase();
    return invoices.filter((inv) => {
      const matchesStatus =
        invoiceStatus === 'All' || inv.status === invoiceStatus;
      const matchesQuery =
        !q ||
        inv.id.toLowerCase().includes(q) ||
        inv.customer.toLowerCase().includes(q) ||
        inv.site.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [invoices, invoiceSearch, invoiceStatus]);

  const activeInvoice =
    invoices.find((inv) => inv.id === selectedInvoiceId) ?? invoices[0];

  // Derived Challan calculation preview
  const selectedChallans = useMemo(
    () =>
      challans.filter(
        (c) => selectedChallanIds.includes(c.id) && c.status === 'Pending'
      ),
    [challans, selectedChallanIds]
  );

  const challanPreviewStats = useMemo(() => {
    let taxable = 0;
    let defaultSubtotal = 0;
    let totalGst = 0;
    selectedChallans.forEach((ch) => {
      ch.items.forEach((item) => {
        const lineTaxable = item.qty * item.customRate;
        const lineDefault = item.qty * item.defaultRate;
        taxable += lineTaxable;
        defaultSubtotal += lineDefault;
        totalGst += (lineTaxable * item.gstRate) / 100;
      });
    });
    return {
      taxable,
      cgst: totalGst / 2,
      sgst: totalGst / 2,
      grandTotal: taxable + totalGst,
      savings: Math.max(0, defaultSubtotal - taxable),
    };
  }, [selectedChallans]);

  const toggleChallan = (challan: DemoChallan) => {
    if (challan.status === 'Invoiced') return;
    setChallanWarning(null);

    setSelectedChallanIds((prev) => {
      if (prev.includes(challan.id)) {
        return prev.filter((id) => id !== challan.id);
      }
      // Enforce same customer for consolidated invoice
      const existingPending = challans.filter(
        (c) => prev.includes(c.id) && c.status === 'Pending'
      );
      if (
        existingPending.length > 0 &&
        existingPending[0].customerId !== challan.customerId
      ) {
        setChallanWarning(
          `Switched selection to ${challan.customerName} (${challan.siteName}). Consolidated invoices combine challans for one customer.`
        );
        return [challan.id];
      }
      return [...prev, challan.id];
    });
  };

  const handleGenerateConsolidatedInvoice = () => {
    if (selectedChallans.length === 0) return;

    const mergedMap = new Map<
      string,
      {
        name: string;
        hsn: string;
        qty: number;
        unit: string;
        rate: number;
        defaultRate: number;
        gstRate: number;
      }
    >();

    selectedChallans.forEach((ch) => {
      ch.items.forEach((item) => {
        const existing = mergedMap.get(item.sku);
        if (existing) {
          existing.qty += item.qty;
        } else {
          mergedMap.set(item.sku, {
            name: item.name,
            hsn: item.hsn,
            qty: item.qty,
            unit: item.unit,
            rate: item.customRate,
            defaultRate: item.defaultRate,
            gstRate: item.gstRate,
          });
        }
      });
    });

    const mergedItems = Array.from(mergedMap.values());
    const primary = selectedChallans[0];
    const newInvoiceNo = `INV-2026-04${19 + (invoices.length - DEMO_RECENT_INVOICES.length)}`;

    setGeneratedInvoice({
      invoiceNo: newInvoiceNo,
      customerName: primary.customerName,
      siteName: primary.siteName,
      gstin: primary.gstin,
      challanIds: selectedChallans.map((c) => c.id),
      items: mergedItems,
      taxableTotal: challanPreviewStats.taxable,
      cgst: challanPreviewStats.cgst,
      sgst: challanPreviewStats.sgst,
      grandTotal: challanPreviewStats.grandTotal,
      savings: challanPreviewStats.savings,
    });

    // Mark selected challans as Invoiced and prepend to Recent Invoices
    const invoicedIds = selectedChallans.map((c) => c.id);
    setChallans((prev) =>
      prev.map((c) =>
        invoicedIds.includes(c.id) ? { ...c, status: 'Invoiced' } : c
      )
    );
    setSelectedChallanIds([]);

    const newDemoInvoice: DemoInvoice = {
      id: newInvoiceNo,
      date: '18 Nov 2026',
      customer: primary.customerName,
      site: primary.siteName,
      type: 'Tax Invoice',
      taxableAmount: challanPreviewStats.taxable,
      gstAmount: challanPreviewStats.cgst + challanPreviewStats.sgst,
      totalAmount: challanPreviewStats.grandTotal,
      status: 'Pending',
      items: mergedItems.map((i) => ({
        name: i.name,
        hsn: i.hsn,
        qty: i.qty,
        unit: i.unit,
        rate: i.rate,
        gstRate: i.gstRate,
      })),
    };
    setInvoices((prev) => [newDemoInvoice, ...prev]);
    setSelectedInvoiceId(newInvoiceNo);
  };

  const handleResetChallans = () => {
    setChallans(INITIAL_DEMO_CHALLANS);
    setSelectedChallanIds(['DC-1101', 'DC-1104']);
    setGeneratedInvoice(null);
    setChallanWarning(null);
    setInvoices(DEMO_RECENT_INVOICES);
    setSelectedInvoiceId(DEMO_RECENT_INVOICES[0].id);
  };

  // Filtered Inventory
  const filteredInventory = useMemo(() => {
    const q = skuSearch.trim().toLowerCase();
    return DEMO_INVENTORY_ITEMS.filter((item) => {
      const isOut = item.stockQty === 0;
      const isLow = item.stockQty > 0 && item.stockQty <= item.reorderLevel;
      const matchesFilter =
        stockFilter === 'All' ||
        (stockFilter === 'Out of Stock' && isOut) ||
        (stockFilter === 'Low Stock' && isLow);
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.hsn.includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [skuSearch, stockFilter]);

  const lowOrOutCount = DEMO_INVENTORY_ITEMS.filter(
    (item) => item.stockQty <= item.reorderLevel
  ).length;

  const totalSalesAmount = useMemo(() => {
    const baseSales = 1248500;
    const extra = invoices
      .slice(0, invoices.length - DEMO_RECENT_INVOICES.length)
      .reduce((sum, inv) => sum + inv.totalAmount, 0);
    return baseSales + extra;
  }, [invoices]);

  const tabs: { id: SimulatorTab; label: string; icon: typeof BarChart3 }[] = [
    { id: 'overview', label: 'Business Overview', icon: BarChart3 },
    { id: 'challans', label: 'Challan → Consolidated Invoice', icon: Truck },
    { id: 'inventory', label: 'Inventory & Custom Pricing', icon: Package },
    { id: 'reports', label: 'GST & Ageing Reports', icon: FileText },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      {/* Simulator Top Chrome */}
      <div className="flex flex-col gap-4 border-b border-slate-200 bg-[#F4F2EC]/70 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-900/10">
            <Image
              src="/assets/aistudio/image_b899084e.png"
              alt="HisabSarthi"
              width={148}
              height={44}
              referrerPolicy="no-referrer"
              className="h-8 w-auto block"
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wide text-emerald-700">
              Interactive Product Demo · Sample Trading Business Data
            </p>
            <p className="mt-0.5 font-display text-sm font-semibold text-[#0F172A]">
              Workspace Simulator
            </p>
          </div>
        </div>

        {/* Workspace Tab Bar */}
        <div
          role="tablist"
          aria-label="HisabSarthi workspace simulator tabs"
          className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isActive
                    ? 'bg-[#0F172A] text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: BUSINESS OVERVIEW (All 10 Dashboard Metrics + Recent Invoices Inspector) */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
      {activeTab === 'overview' && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Top 5 Financial KPIs */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <div className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-4">
              <p className="text-xs font-medium text-slate-500">Total Sales</p>
              <p className="mt-1.5 font-mono-num text-xl font-bold text-[#0F172A]">
                {formatINR(totalSalesAmount)}
              </p>
              <p className="mt-1 text-xs text-emerald-700">Current FY · Tax & Supply</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-4">
              <p className="text-xs font-medium text-slate-500">Receivables</p>
              <p className="mt-1.5 font-mono-num text-xl font-bold text-[#0F172A]">
                {formatINR(213918)}
              </p>
              <p className="mt-1 text-xs text-amber-700">19 Total Debtors</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-4">
              <p className="text-xs font-medium text-slate-500">Payables</p>
              <p className="mt-1.5 font-mono-num text-xl font-bold text-[#0F172A]">
                {formatINR(126000)}
              </p>
              <p className="mt-1 text-xs text-slate-500">11 Total Creditors</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-4">
              <p className="text-xs font-medium text-slate-500">Total Purchases</p>
              <p className="mt-1.5 font-mono-num text-xl font-bold text-[#0F172A]">
                {formatINR(894200)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Vendor Bills Recorded</p>
            </div>

            <div className="col-span-2 rounded-xl border border-slate-200 bg-[#FAF9F6] p-4 sm:col-span-1">
              <p className="text-xs font-medium text-slate-500">Stock Valuation</p>
              <p className="mt-1.5 font-mono-num text-xl font-bold text-[#0F172A]">
                {formatINR(642850)}
              </p>
              <p className="mt-1 text-xs text-rose-700">
                48 Products · {lowOrOutCount} Low / Out of Stock
              </p>
            </div>
          </div>

          {/* Secondary Summary Strip covering remaining requested Dashboard stats */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <span>
                Total Products: <strong className="font-mono-num text-[#0F172A]">48</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Total Debtors: <strong className="font-mono-num text-[#0F172A]">19</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Total Creditors: <strong className="font-mono-num text-[#0F172A]">11</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Low / Out of Stock Items:{' '}
                <strong className="font-mono-num text-rose-700">{lowOrOutCount}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('challans')}
              className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800"
            >
              <span>Try Challan → Consolidated Invoice</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Recent Invoices + Interactive Invoice Inspector */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-display text-base font-semibold text-[#0F172A]">
                  Recent Invoices
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={invoiceSearch}
                      onChange={(e) => setInvoiceSearch(e.target.value)}
                      placeholder="Search invoice or party..."
                      aria-label="Search recent invoices"
                      className="h-9 rounded-lg border border-slate-200 bg-[#FAF9F6] pl-8 pr-3 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-[#FAF9F6] p-0.5">
                    {(['All', 'Paid', 'Pending', 'Overdue'] as InvoiceStatusFilter[]).map(
                      (status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setInvoiceStatus(status)}
                          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                            invoiceStatus === status
                              ? 'bg-white text-[#0F172A] shadow-xs'
                              : 'text-slate-600 hover:text-[#0F172A]'
                          }`}
                        >
                          {status}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-[#FAF9F6] text-slate-500">
                    <tr>
                      <th className="px-3.5 py-2.5 font-semibold">Invoice No</th>
                      <th className="px-3.5 py-2.5 font-semibold">Customer & Site</th>
                      <th className="px-3.5 py-2.5 font-semibold text-right">Amount</th>
                      <th className="px-3.5 py-2.5 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInvoices.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-8 text-center text-xs text-slate-500"
                        >
                          No invoices match your search filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map((inv) => {
                        const isSelected = activeInvoice?.id === inv.id;
                        return (
                          <tr
                            key={inv.id}
                            onClick={() => setSelectedInvoiceId(inv.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? 'bg-emerald-50/70' : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="px-3.5 py-3 align-top">
                              <span className="font-mono-num font-semibold text-[#0F172A]">
                                {inv.id}
                              </span>
                              <div className="text-[11px] text-slate-500">{inv.date}</div>
                            </td>
                            <td className="px-3.5 py-3 align-top">
                              <div className="font-medium text-[#0F172A]">
                                {inv.customer}
                              </div>
                              <div className="text-[11px] text-slate-500">{inv.site}</div>
                            </td>
                            <td className="px-3.5 py-3 text-right align-top font-mono-num font-semibold text-[#0F172A]">
                              {formatINR(inv.totalAmount)}
                            </td>
                            <td className="px-3.5 py-3 align-top">
                              <span
                                className={`text-xs font-semibold ${
                                  inv.status === 'Paid'
                                    ? 'text-emerald-700'
                                    : inv.status === 'Pending'
                                      ? 'text-amber-700'
                                      : 'text-rose-700'
                                }`}
                              >
                                {inv.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Click any invoice row to inspect itemized GST and delivery site details.
              </p>
            </div>

            {/* Right 5 Cols: Selected Invoice Inspector */}
            <div className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-5 lg:col-span-5">
              {activeInvoice && (
                <div>
                  <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        {activeInvoice.type}
                      </p>
                      <h4 className="font-mono-num text-base font-bold text-[#0F172A]">
                        {activeInvoice.id}
                      </h4>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        activeInvoice.status === 'Paid'
                          ? 'text-emerald-700'
                          : activeInvoice.status === 'Pending'
                            ? 'text-amber-700'
                            : 'text-rose-700'
                      }`}
                    >
                      {activeInvoice.status}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-600">
                    <p className="font-semibold text-[#0F172A]">
                      {activeInvoice.customer}
                    </p>
                    <p>
                      Delivery Site: {activeInvoice.site} · {activeInvoice.date}
                    </p>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">
                    {activeInvoice.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start justify-between gap-2 text-xs"
                      >
                        <div>
                          <p className="font-medium text-[#0F172A]">{item.name}</p>
                          <p className="font-mono-num text-[11px] text-slate-500">
                            HSN {item.hsn} · {item.qty} {item.unit} × {formatINR(item.rate)} · GST {item.gstRate}%
                          </p>
                        </div>
                        <span className="font-mono-num font-semibold text-[#0F172A]">
                          {formatINR(item.qty * item.rate)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-1.5 border-t border-slate-200 pt-3 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Taxable Value</span>
                      <span className="font-mono-num">
                        {formatINR(activeInvoice.taxableAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GST (CGST + SGST)</span>
                      <span className="font-mono-num">
                        {formatINR(activeInvoice.gstAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-[#0F172A]">
                      <span>Invoice Total</span>
                      <span className="font-mono-num">
                        {formatINR(activeInvoice.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHALLAN -> CONSOLIDATED INVOICE SIMULATOR */}
      {activeTab === 'challans' && (
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-[#0F172A]">
                Convert Multiple Delivery Challans into One Consolidated Tax Invoice
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Select pending challans for a customer below and click{' '}
                <strong className="font-semibold text-[#0F172A]">
                  Generate Consolidated Invoice
                </strong>{' '}
                to see automatic item merging, custom site pricing, and GST calculation.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetChallans}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Demo</span>
            </button>
          </div>

          {challanWarning && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-900">
              <Info className="h-4 w-4 shrink-0 text-amber-700" />
              <span>{challanWarning}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left 6 Columns: Pending Challan List */}
            <div className="space-y-3 lg:col-span-6">
              {challans.map((challan) => {
                const isChecked = selectedChallanIds.includes(challan.id);
                const isInvoiced = challan.status === 'Invoiced';
                const challanSubtotal = challan.items.reduce(
                  (sum, it) => sum + it.qty * it.customRate,
                  0
                );

                return (
                  <button
                    key={challan.id}
                    type="button"
                    disabled={isInvoiced}
                    onClick={() => toggleChallan(challan)}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      isInvoiced
                        ? 'cursor-not-allowed border-slate-200 bg-slate-50 opacity-75'
                        : isChecked
                          ? 'border-emerald-600 bg-emerald-50/50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-white ${
                            isInvoiced
                              ? 'border-slate-300 bg-slate-200 text-slate-500'
                              : isChecked
                                ? 'border-emerald-600 bg-emerald-600'
                                : 'border-slate-300 bg-white'
                          }`}
                        >
                          {(isChecked || isInvoiced) && (
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          )}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono-num text-sm font-bold text-[#0F172A]">
                              {challan.id}
                            </span>
                            <span className="text-xs text-slate-400">·</span>
                            <span className="text-xs text-slate-600">{challan.date}</span>
                            <span className="text-xs text-slate-400">·</span>
                            <span
                              className={`text-xs font-semibold ${
                                isInvoiced ? 'text-emerald-700' : 'text-amber-700'
                              }`}
                            >
                              {challan.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                            {challan.customerName}
                          </p>
                          <p className="text-xs text-slate-500">
                            Site: {challan.siteName}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono-num text-sm font-bold text-[#0F172A]">
                        {formatINR(challanSubtotal)}
                      </span>
                    </div>

                    <div className="mt-3 border-t border-slate-200/80 pt-2.5 text-xs text-slate-600">
                      {challan.items.map((it) => (
                        <div key={it.sku} className="flex justify-between py-0.5">
                          <span>
                            {it.name} ({it.qty} {it.unit})
                          </span>
                          <span className="font-mono-num">
                            @{formatINR(it.customRate)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right 6 Columns: Live Consolidated Preview or Generated Tax Invoice */}
            <div className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-5 sm:p-6 lg:col-span-6">
              {generatedInvoice ? (
                <div>
                  <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <p className="text-xs font-semibold text-emerald-700">
                        Consolidated Tax Invoice Generated
                      </p>
                      <h4 className="mt-1 font-mono-num text-xl font-bold text-[#0F172A]">
                        {generatedInvoice.invoiceNo}
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Merged Challans: {generatedInvoice.challanIds.join(', ')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGeneratedInvoice(null)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Select More
                    </button>
                  </div>

                  <div className="mt-4 text-xs text-slate-600">
                    <p className="font-semibold text-[#0F172A]">
                      {generatedInvoice.customerName}
                    </p>
                    <p>
                      Delivery Site: {generatedInvoice.siteName} · GSTIN:{' '}
                      <span className="font-mono-num">{generatedInvoice.gstin}</span>
                    </p>
                  </div>

                  <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-3 py-2 font-semibold">Item & HSN</th>
                          <th className="px-3 py-2 font-semibold text-right">Qty</th>
                          <th className="px-3 py-2 font-semibold text-right">Site Rate</th>
                          <th className="px-3 py-2 font-semibold text-right">Taxable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {generatedInvoice.items.map((item) => (
                          <tr key={item.name}>
                            <td className="px-3 py-2">
                              <div className="font-medium text-[#0F172A]">{item.name}</div>
                              <div className="font-mono-num text-[11px] text-slate-500">
                                HSN {item.hsn} · GST {item.gstRate}%
                              </div>
                            </td>
                            <td className="px-3 py-2 text-right font-mono-num">
                              {item.qty} {item.unit}
                            </td>
                            <td className="px-3 py-2 text-right font-mono-num">
                              {formatINR(item.rate)}
                            </td>
                            <td className="px-3 py-2 text-right font-mono-num font-semibold text-[#0F172A]">
                              {formatINR(item.qty * item.rate)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Taxable Subtotal (Custom Site Pricing Applied)</span>
                      <span className="font-mono-num">
                        {formatINR(generatedInvoice.taxableTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>CGST</span>
                      <span className="font-mono-num">
                        {formatINR(generatedInvoice.cgst)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>SGST</span>
                      <span className="font-mono-num">
                        {formatINR(generatedInvoice.sgst)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-[#0F172A]">
                      <span>Consolidated Invoice Total</span>
                      <span className="font-mono-num">
                        {formatINR(generatedInvoice.grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h4 className="font-display text-base font-semibold text-[#0F172A]">
                      Consolidation Summary
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedChallans.length === 0
                        ? 'Check one or more pending challans on the left to preview your consolidated invoice.'
                        : `${selectedChallans.length} pending challan(s) selected for ${selectedChallans[0].customerName}.`}
                    </p>

                    {selectedChallans.length > 0 && (
                      <div className="mt-5 space-y-2.5 rounded-xl border border-slate-200 bg-white p-4 text-xs">
                        <div className="flex justify-between text-slate-600">
                          <span>Selected Challans</span>
                          <span className="font-mono-num font-semibold text-[#0F172A]">
                            {selectedChallans.map((c) => c.id).join(', ')}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Taxable Value (Site Rate)</span>
                          <span className="font-mono-num">
                            {formatINR(challanPreviewStats.taxable)}
                          </span>
                        </div>
                        <div className="flex justify-between text-emerald-700">
                          <span>Custom Rate Adjustment vs Default</span>
                          <span className="font-mono-num font-semibold">
                            -{formatINR(challanPreviewStats.savings)}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Estimated CGST + SGST</span>
                          <span className="font-mono-num">
                            {formatINR(
                              challanPreviewStats.cgst + challanPreviewStats.sgst
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-2.5 text-sm font-bold text-[#0F172A]">
                          <span>Net Invoice Amount</span>
                          <span className="font-mono-num">
                            {formatINR(challanPreviewStats.grandTotal)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={selectedChallans.length === 0}
                    onClick={handleGenerateConsolidatedInvoice}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#059669] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#047857] disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Generate Consolidated Invoice</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INVENTORY & CUSTOM PRODUCT PRICING */}
      {activeTab === 'inventory' && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={skuSearch}
                  onChange={(e) => setSkuSearch(e.target.value)}
                  placeholder="Search SKU, product or HSN..."
                  aria-label="Search inventory products"
                  className="h-9 rounded-lg border border-slate-200 bg-[#FAF9F6] pl-8 pr-3 text-xs text-[#0F172A] placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-[#FAF9F6] p-0.5">
                {(['All', 'Low Stock', 'Out of Stock'] as StockFilter[]).map(
                  (filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setStockFilter(filter)}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                        stockFilter === filter
                          ? 'bg-white text-[#0F172A] shadow-xs'
                          : 'text-slate-600 hover:text-[#0F172A]'
                      }`}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Customer / Site Pricing Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500">
                Active Price List:
              </span>
              <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-[#FAF9F6] p-0.5">
                {[
                  { id: 'default' as PricingProfile, label: 'Default Rate' },
                  {
                    id: 'ganesh-andheri' as PricingProfile,
                    label: 'Shree Ganesh (Andheri)',
                  },
                  {
                    id: 'annapurna-bkc' as PricingProfile,
                    label: 'Annapurna (BKC)',
                  },
                ].map((profile) => (
                  <button
                    key={profile.id}
                    type="button"
                    onClick={() => setPricingProfile(profile.id)}
                    className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      pricingProfile === profile.id
                        ? 'bg-[#0F172A] text-white'
                        : 'text-slate-600 hover:text-[#0F172A]'
                    }`}
                  >
                    {profile.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-[#FAF9F6] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">SKU & Product</th>
                  <th className="px-4 py-3 font-semibold text-right">Stock Qty</th>
                  <th className="px-4 py-3 font-semibold">Stock Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Default Rate</th>
                  <th className="px-4 py-3 font-semibold text-right">Active Rate</th>
                  <th className="px-4 py-3 font-semibold">Movement / Reorder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                      No products match your search or stock filter.
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((item) => {
                    const isOut = item.stockQty === 0;
                    const isLow =
                      item.stockQty > 0 && item.stockQty <= item.reorderLevel;
                    const customInfo =
                      pricingProfile === 'default'
                        ? null
                        : item.customRates[pricingProfile];
                    const activeRate = customInfo
                      ? customInfo.rate
                      : item.defaultRate;

                    return (
                      <tr key={item.sku} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-[#0F172A]">
                            {item.name}
                          </div>
                          <div className="font-mono-num text-[11px] text-slate-500">
                            {item.sku} · HSN {item.hsn} · {item.category}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono-num font-semibold text-[#0F172A]">
                          {item.stockQty} {item.unit}
                        </td>
                        <td className="px-4 py-3">
                          {isOut ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-rose-700">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Out of Stock
                            </span>
                          ) : isLow ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Low Stock
                            </span>
                          ) : (
                            <span className="font-semibold text-emerald-700">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right font-mono-num text-slate-500">
                          {formatINR(item.defaultRate)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-mono-num font-bold text-[#0F172A]">
                            {formatINR(activeRate)}
                          </span>
                          {customInfo && (
                            <div className="text-[11px] text-emerald-700">
                              Custom · w.e.f {customInfo.effectiveFrom}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.movementNote}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: GST & AGEING REPORTS */}
      {activeTab === 'reports' && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#FAF9F6] p-1">
              <button
                type="button"
                onClick={() => setReportView('ageing')}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                  reportView === 'ageing'
                    ? 'bg-[#0F172A] text-white'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                Outstanding Ageing Analysis
              </button>
              <button
                type="button"
                onClick={() => setReportView('gst')}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                  reportView === 'gst'
                    ? 'bg-[#0F172A] text-white'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                GST & HSN Summary
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Organized directly from your Google Sheets business ledger
            </p>
          </div>

          {reportView === 'ageing' ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-[#FAF9F6] text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Party Name</th>
                    <th className="px-4 py-3 font-semibold">Ledger Type</th>
                    <th className="px-4 py-3 font-semibold text-right">0–30 Days</th>
                    <th className="px-4 py-3 font-semibold text-right">31–60 Days</th>
                    <th className="px-4 py-3 font-semibold text-right">60+ Days</th>
                    <th className="px-4 py-3 font-semibold text-right">Total Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DEMO_AGEING_ROWS.map((row) => (
                    <tr key={row.party} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-semibold text-[#0F172A]">
                        {row.party}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{row.type}</td>
                      <td className="px-4 py-3 text-right font-mono-num">
                        {formatINR(row.current0to30)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono-num text-amber-700">
                        {formatINR(row.days31to60)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono-num font-semibold text-rose-700">
                        {formatINR(row.days60Plus)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono-num font-bold text-[#0F172A]">
                        {formatINR(row.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-[#FAF9F6] text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">HSN / Description</th>
                      <th className="px-4 py-3 font-semibold text-right">Taxable Value</th>
                      <th className="px-4 py-3 font-semibold text-right">CGST</th>
                      <th className="px-4 py-3 font-semibold text-right">SGST</th>
                      <th className="px-4 py-3 font-semibold text-right">IGST</th>
                      <th className="px-4 py-3 font-semibold text-right">Total Tax</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DEMO_GST_HSN_ROWS.map((row) => (
                      <tr key={row.hsn} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3">
                          <span className="font-mono-num font-semibold text-[#0F172A]">
                            {row.hsn}
                          </span>{' '}
                          <span className="text-slate-600">· {row.description}</span>
                        </td>
                        <td className="px-4 py-3 text-right font-mono-num">
                          {formatINR(row.taxableValue)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono-num">
                          {formatINR(row.cgst)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono-num">
                          {formatINR(row.sgst)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono-num">
                          {formatINR(row.igst)}
                        </td>
                        <td className="px-4 py-3 text-right font-mono-num font-bold text-[#0F172A]">
                          {formatINR(row.totalTax)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs italic text-slate-500">
                GST reports are intended for accounting review and reconciliation. They do not automatically file GST returns.
              </p>
            </div>
          )}
        </div>
      )}
      </motion.div>
    </div>
  );
}
