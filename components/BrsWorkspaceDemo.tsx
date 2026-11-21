'use client';

import { useMemo, useState } from 'react';
import {
  Landmark,
  Zap,
  FileSpreadsheet,
  Plus,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Check,
  Upload,
} from 'lucide-react';
import {
  DEMO_BANK_ACCOUNTS,
  INITIAL_BRS_TRANSACTIONS,
  type DemoBrsTransaction,
} from '@/lib/hisab-data';
import { trackEvent } from '@/lib/analytics';

type BrsFilter = 'All' | 'Uncleared Only' | 'Inflows' | 'Outflows';

function formatINR(amount: number): string {
  const absFormatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
  return `${amount < 0 ? '-' : ''}₹${absFormatted}`;
}

export default function BrsWorkspaceDemo() {
  const [selectedBankId, setSelectedBankId] = useState<string>(
    DEMO_BANK_ACCOUNTS[0].id
  );
  const [transactions, setTransactions] = useState<DemoBrsTransaction[]>(
    INITIAL_BRS_TRANSACTIONS
  );
  const [statementBalances, setStatementBalances] = useState<
    Record<string, number>
  >(() =>
    Object.fromEntries(
      DEMO_BANK_ACCOUNTS.map((b) => [b.id, b.statementBalance])
    )
  );
  const [filter, setFilter] = useState<BrsFilter>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [csvFeedback, setCsvFeedback] = useState<string | null>(null);

  // Quick Bank Adjustment inline state
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [adjType, setAdjType] = useState<'Outflow' | 'Inflow'>('Outflow');
  const [adjLabel, setAdjLabel] = useState('NEFT / SMS Bank Charges');
  const [adjAmount, setAdjAmount] = useState('590');

  const activeBank =
    DEMO_BANK_ACCOUNTS.find((b) => b.id === selectedBankId) ??
    DEMO_BANK_ACCOUNTS[0];

  const bankTxns = useMemo(
    () => transactions.filter((t) => t.bankId === activeBank.id),
    [transactions, activeBank.id]
  );

  const visibleTxns = useMemo(() => {
    return bankTxns.filter((t) => {
      if (filter === 'Uncleared Only') return !t.clearedDate;
      if (filter === 'Inflows') return t.type === 'Inflow';
      if (filter === 'Outflows') return t.type === 'Outflow';
      return true;
    });
  }, [bankTxns, filter]);

  const metrics = useMemo(() => {
    let bookBalance = activeBank.openingBalance;
    let issuedNotPresented = 0;
    let depositedNotCleared = 0;

    bankTxns.forEach((t) => {
      if (t.type === 'Inflow') {
        bookBalance += t.amount;
        if (!t.clearedDate) depositedNotCleared += t.amount;
      } else {
        bookBalance -= t.amount;
        if (!t.clearedDate) issuedNotPresented += t.amount;
      }
    });

    const reconciledPassbook =
      bookBalance + issuedNotPresented - depositedNotCleared;
    const enteredStatement = statementBalances[activeBank.id] ?? 0;
    const variance = enteredStatement - reconciledPassbook;

    return {
      bookBalance,
      issuedNotPresented,
      depositedNotCleared,
      reconciledPassbook,
      enteredStatement,
      variance,
      isReconciled: Math.abs(variance) < 0.01,
    };
  }, [activeBank, bankTxns, statementBalances]);

  const toggleClearRow = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, clearedDate: t.clearedDate ? null : '21 Nov 2026' }
          : t
      )
    );
    setCsvFeedback(null);
    trackEvent('demo_interaction', {
      location: 'brs_workspace',
      label: 'toggle_clear_row',
    });
  };

  const handleCsvAutoMatch = () => {
    let matchedCount = 0;
    setTransactions((prev) =>
      prev.map((t) => {
        if (
          t.bankId === activeBank.id &&
          !t.clearedDate &&
          (t.csvMatchScore ?? 0) >= 98
        ) {
          matchedCount += 1;
          return {
            ...t,
            clearedDate: '18 Nov 2026',
            csvMatched: true,
          };
        }
        return t;
      })
    );

    if (matchedCount > 0) {
      setCsvFeedback(
        `Auto-matched ${matchedCount} NetBanking CSV transaction(s) by amount, date & UTR reference (98%–99% match confidence). Uncleared cheques preserved in Annexures.`
      );
    } else {
      setCsvFeedback(
        'All high-confidence CSV transactions for this bank are already matched. Remaining items are uncleared cheques.'
      );
    }
    trackEvent('demo_interaction', {
      location: 'brs_workspace',
      label: 'csv_auto_match',
    });
  };

  const handleBulkClearSelected = () => {
    if (selectedIds.length === 0) return;
    setTransactions((prev) =>
      prev.map((t) =>
        selectedIds.includes(t.id) ? { ...t, clearedDate: '21 Nov 2026' } : t
      )
    );
    setSelectedIds([]);
    setCsvFeedback(null);
  };

  const handleAddQuickAdjustment = () => {
    const num = Number.parseFloat(adjAmount);
    if (!Number.isFinite(num) || num <= 0 || !adjLabel.trim()) return;

    const newTxn: DemoBrsTransaction = {
      id: `BRS-ADJ-${Date.now().toString().slice(-4)}`,
      bankId: activeBank.id,
      voucherDate: '21 Nov 2026',
      party: `${adjLabel.trim()} (Quick Bank Entry)`,
      reference: adjType === 'Outflow' ? 'BANK-CHG' : 'BANK-INT',
      type: adjType,
      amount: num,
      clearedDate: '21 Nov 2026',
      csvMatched: true,
      csvMatchScore: 100,
    };

    setTransactions((prev) => [newTxn, ...prev]);
    setStatementBalances((prev) => ({
      ...prev,
      [activeBank.id]:
        (prev[activeBank.id] ?? 0) + (adjType === 'Inflow' ? num : -num),
    }));
    setShowAdjustment(false);
    setCsvFeedback(
      `Recorded quick ${adjType === 'Outflow' ? 'bank charge' : 'interest credit'} of ${formatINR(num)} directly in ledger & BRS.`
    );
    trackEvent('demo_interaction', {
      location: 'brs_workspace',
      label: 'quick_bank_adjustment',
    });
  };

  const handleReset = () => {
    setTransactions(INITIAL_BRS_TRANSACTIONS);
    setStatementBalances(
      Object.fromEntries(
        DEMO_BANK_ACCOUNTS.map((b) => [b.id, b.statementBalance])
      )
    );
    setSelectedIds([]);
    setFilter('All');
    setCsvFeedback(null);
    setShowAdjustment(false);
  };

  return (
    <div className="space-y-5">
      {/* Top Bank Switcher & Statement Balance Bar */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-[#FAF9F6] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
            <Landmark className="h-4 w-4 text-emerald-700" />
            <label htmlFor="brs-bank-select">Bank Account:</label>
          </div>
          <select
            id="brs-bank-select"
            value={selectedBankId}
            onChange={(e) => {
              setSelectedBankId(e.target.value);
              setSelectedIds([]);
              setCsvFeedback(null);
            }}
            className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-[#0F172A] focus:border-emerald-600 focus:outline-none"
          >
            {DEMO_BANK_ACCOUNTS.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.bankName} · {bank.accountType} ({bank.accountMask})
                {bank.isDefault ? ' — Default' : ''}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-slate-500 font-mono-num">
            IFSC {activeBank.ifsc} · UPI {activeBank.upiVpa}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <label
            htmlFor="brs-statement-balance"
            className="text-xs font-medium text-slate-600"
          >
            Bank Statement Balance (₹):
          </label>
          <input
            id="brs-statement-balance"
            type="number"
            value={statementBalances[activeBank.id] ?? 0}
            onChange={(e) => {
              const val = Number.parseFloat(e.target.value);
              setStatementBalances((prev) => ({
                ...prev,
                [activeBank.id]: Number.isFinite(val) ? val : 0,
              }));
            }}
            className="h-9 w-36 rounded-lg border border-slate-300 bg-white px-3 text-right font-mono-num text-xs font-bold text-[#0F172A] focus:border-emerald-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Live 4-Card Reconciliation Workspace */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">
            Balance as per Company Books
          </p>
          <p className="mt-1.5 font-mono-num text-lg font-bold text-[#0F172A]">
            {formatINR(metrics.bookBalance)}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Opening + Recorded Vouchers
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">
            (+) Cheques Issued Not Presented
          </p>
          <p className="mt-1.5 font-mono-num text-lg font-bold text-emerald-700">
            +{formatINR(metrics.issuedNotPresented)}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Annexure A · Uncleared Outflows
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">
            (-) Cheques Deposited Not Cleared
          </p>
          <p className="mt-1.5 font-mono-num text-lg font-bold text-amber-700">
            -{formatINR(metrics.depositedNotCleared)}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Annexure B · Uncleared Inflows
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-[#0F172A] p-4 text-white">
          <p className="text-xs font-medium text-slate-300">
            (=) Reconciled Passbook Balance
          </p>
          <p className="mt-1.5 font-mono-num text-lg font-bold text-white">
            {formatINR(metrics.reconciledPassbook)}
          </p>
          <p className="mt-1 text-[11px] text-emerald-400">
            Matches Statement: {formatINR(metrics.enteredStatement)}
          </p>
        </div>
      </div>

      {/* Instant Zero-Difference Status Banner */}
      <div
        className={`flex flex-col gap-3 rounded-xl border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between ${
          metrics.isReconciled
            ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
            : 'border-amber-200 bg-amber-50 text-amber-950'
        }`}
      >
        <div className="flex items-start gap-2.5">
          {metrics.isReconciled ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          )}
          <div>
            <p className="text-sm font-bold">
              {metrics.isReconciled
                ? 'Statement Fully Reconciled (₹0.00 Difference)'
                : `Unreconciled Variance: ${formatINR(metrics.variance)}`}
            </p>
            <p className="text-xs opacity-85">
              {metrics.isReconciled
                ? 'Company books + uncleared cheque annexures match your bank statement to the exact Rupee. Ready to print CA-standard BRS.'
                : 'Click "Auto-Match Bank CSV" or clear pending NEFT/IMPS entries below to reconcile to ₹0.00 difference.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCsvAutoMatch}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#059669] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#047857] whitespace-nowrap"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Auto-Match Bank CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAdjustment((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-[#0F172A] transition-colors hover:bg-slate-50 whitespace-nowrap"
          >
            <Plus className="h-3.5 w-3.5 text-emerald-700" />
            <span>Quick Bank Adjustment</span>
          </button>
        </div>
      </div>

      {/* Inline + Quick Bank Adjustment Panel */}
      {showAdjustment && (
        <div className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-4">
          <p className="text-xs font-bold text-[#0F172A]">
            Record Bank Charge or Interest Credit Directly Inside BRS
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-12">
            <select
              aria-label="Adjustment type"
              value={adjType}
              onChange={(e) => {
                const nextType = e.target.value as 'Outflow' | 'Inflow';
                setAdjType(nextType);
                setAdjLabel(
                  nextType === 'Outflow'
                    ? 'NEFT / SMS Bank Charges'
                    : 'Quarterly Bank Interest Credit'
                );
              }}
              className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-medium text-[#0F172A] sm:col-span-3"
            >
              <option value="Outflow">Bank Fee / Charge (Outflow)</option>
              <option value="Inflow">Interest Credit (Inflow)</option>
            </select>
            <input
              type="text"
              value={adjLabel}
              onChange={(e) => setAdjLabel(e.target.value)}
              placeholder="Particulars"
              aria-label="Adjustment description"
              className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs text-[#0F172A] sm:col-span-4"
            />
            <input
              type="number"
              value={adjAmount}
              onChange={(e) => setAdjAmount(e.target.value)}
              placeholder="Amount ₹"
              aria-label="Adjustment amount"
              className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-right font-mono-num text-xs font-semibold text-[#0F172A] sm:col-span-2"
            />
            <button
              type="button"
              onClick={handleAddQuickAdjustment}
              className="h-9 rounded-lg bg-[#0F172A] px-3 text-xs font-semibold text-white hover:bg-slate-800 sm:col-span-3"
            >
              Save &amp; Reconcile
            </button>
          </div>
        </div>
      )}

      {csvFeedback && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3.5 py-2.5 text-xs text-emerald-900">
          <FileSpreadsheet className="h-4 w-4 shrink-0 text-emerald-700" />
          <span>{csvFeedback}</span>
        </div>
      )}

      {/* Filter & Bulk Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-[#FAF9F6] p-1">
          {(['All', 'Uncleared Only', 'Inflows', 'Outflows'] as BrsFilter[]).map(
            (tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  filter === tab
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {selectedIds.length > 0 && (
          <button
            type="button"
            onClick={handleBulkClearSelected}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0F172A] px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
            <span>Bulk Clear {selectedIds.length} Selected</span>
          </button>
        )}
      </div>

      {/* Reconciliation Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-[#FAF9F6] text-slate-500">
            <tr>
              <th className="w-9 px-3 py-3">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-3 py-3 font-semibold">Date &amp; Ref</th>
              <th className="px-3 py-3 font-semibold">Party / Particulars</th>
              <th className="px-3 py-3 font-semibold">Type</th>
              <th className="px-3 py-3 font-semibold text-right">Amount</th>
              <th className="px-3 py-3 font-semibold">Bank Value Date</th>
              <th className="px-3 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {visibleTxns.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  No transactions match this filter for {activeBank.bankName}.
                </td>
              </tr>
            ) : (
              visibleTxns.map((txn) => {
                const isSelected = selectedIds.includes(txn.id);
                return (
                  <tr key={txn.id} className="hover:bg-slate-50/70">
                    <td className="px-3 py-3">
                      {!txn.clearedDate && (
                        <button
                          type="button"
                          aria-label={`Select ${txn.party}`}
                          onClick={() =>
                            setSelectedIds((prev) =>
                              prev.includes(txn.id)
                                ? prev.filter((id) => id !== txn.id)
                                : [...prev, txn.id]
                            )
                          }
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-mono-num font-semibold text-[#0F172A]">
                        {txn.reference}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {txn.voucherDate}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-[#0F172A]">{txn.party}</div>
                      {txn.csvMatched && (
                        <div className="text-[11px] font-medium text-emerald-700">
                          CSV Auto-Matched · {txn.csvMatchScore}% confidence
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`font-semibold ${
                          txn.type === 'Inflow'
                            ? 'text-emerald-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right font-mono-num font-semibold text-[#0F172A]">
                      {formatINR(txn.amount)}
                    </td>
                    <td className="px-3 py-3">
                      {txn.clearedDate ? (
                        <span className="font-mono-num font-medium text-emerald-700">
                          Cleared · {txn.clearedDate}
                        </span>
                      ) : (
                        <span className="font-medium text-amber-700">
                          Uncleared
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => toggleClearRow(txn.id)}
                        className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap ${
                          txn.clearedDate
                            ? 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                            : 'bg-[#0F172A] text-white hover:bg-slate-800'
                        }`}
                      >
                        {!txn.clearedDate && (
                          <Zap className="h-3 w-3 text-emerald-400" />
                        )}
                        <span>{txn.clearedDate ? 'Unclear' : 'Clear Today'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
