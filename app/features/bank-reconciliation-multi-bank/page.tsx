import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Landmark,
  Zap,
  FileCheck2,
  Check,
  ArrowUpRight,
  ArrowRight,
  Play,
  MessageCircle,
  Phone,
  ShieldCheck,
  Upload,
  PlusCircle,
  Scale,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubpageCta from '@/components/SubpageCta';
import BrsWorkspaceDemo from '@/components/BrsWorkspaceDemo';
import { PosterSpotlightCard } from '@/components/FeatureVisualViewer';
import JsonLd from '@/components/JsonLd';
import TrackedLink from '@/components/TrackedLink';
import {
  LIVE_DEMO_URL,
  WHATSAPP_CONFIG,
  buildCallUrl,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';
import { FEATURE_POSTERS } from '@/lib/feature-posters';
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from '@/lib/seo';

const BRS_POSTER = FEATURE_POSTERS.find((p) => p.id === 'modern-brs-multibank')!;

export const metadata: Metadata = buildPageMetadata({
  title: 'Multi-Bank & Smart Bank Reconciliation (BRS) Software | HisabSarthi',
  description:
    'Manage multiple bank accounts, auto-match NetBanking CSV statements, track uncleared cheques, and generate CA-standard BRS reports with ₹0.00 variance.',
  path: '/features/bank-reconciliation-multi-bank',
  image: BRS_POSTER.src,
  imageAlt: BRS_POSTER.alt,
});

const BRS_PILLARS = [
  {
    icon: Landmark,
    title: 'Multi-Bank Master',
    description:
      'Manage unlimited Current, Savings, and OD/CC accounts with live balance tracking.',
  },
  {
    icon: Zap,
    title: '1-Click Smart Matching',
    description:
      'Upload NetBanking CSV to auto-match amounts, dates, and references in seconds.',
  },
  {
    icon: FileCheck2,
    title: 'Audit-Ready Reports',
    description:
      'Generate professional CA-standard BRS statements with Annexures in 1 click.',
  },
];

const BRS_FEATURES = [
  {
    number: '01.',
    icon: Landmark,
    title: 'Multi-Bank Account Management',
    subtitle: 'Every Bank. One Unified Dashboard.',
    description:
      'Seamlessly configure all your business bank accounts—HDFC, SBI, ICICI, Axis, Kotak, and more. Track opening balances, IFSC codes, UPI VPAs, and designate your default bank for automatic invoice and payment tracking.',
  },
  {
    number: '02.',
    icon: Scale,
    title: 'Live 4-Card Reconciliation Workspace',
    subtitle: 'Real-time visibility into every single Rupee.',
    description:
      'Get instant, clear visibility into your Balance as per Company Books, (+) Cheques Issued but Not Yet Presented, (-) Cheques Deposited but Not Yet Cleared, and (=) Reconciled Passbook Balance.',
  },
  {
    number: '03.',
    icon: CheckCircle2,
    title: 'Instant Zero-Difference Status Banner',
    subtitle: 'Confidence at a glance.',
    description:
      'Type in your bank passbook balance, and HisabSarthi instantly checks the variance. When the numbers match, confirm accuracy immediately with a clear "Statement Fully Reconciled (₹0.00 Difference)" status.',
  },
  {
    number: '04.',
    icon: Upload,
    title: 'Smart Bank Statement CSV Auto-Matcher',
    subtitle: 'Say goodbye to manual line-by-line ticking.',
    description:
      'Download your statement CSV from NetBanking, drop it into HisabSarthi, and let our smart matching algorithm automatically match transactions by amount, date proximity, and UTR/Cheque references with confidence scores.',
  },
  {
    number: '05.',
    icon: Zap,
    title: '1-Click Clearance & Bulk Reconciliation',
    subtitle: 'Reconcile 100+ transactions in seconds.',
    description:
      'Use the "Clear Today" button for instant clearance, or multi-select transactions to apply bank value dates in bulk. Filter easily by Uncleared Only, Inflows, or Outflows.',
  },
  {
    number: '06.',
    icon: PlusCircle,
    title: '+ Quick Bank Adjustments',
    subtitle: 'Never miss a bank charge or interest credit.',
    description:
      'Notice bank fees, processing charges, or interest credited on your statement? Record them on the fly directly inside the BRS screen without switching pages.',
  },
];

const BRS_STEPS = [
  {
    step: 'Step 1',
    title: 'Pick Your Bank & Cut-Off Date',
    description:
      'Select your bank account and cut-off date (Today, Month-End, or Custom Period). Enter your statement balance.',
  },
  {
    step: 'Step 2',
    title: 'Clear & Match Transactions',
    description:
      'Click "Clear Today", batch update clearance dates, or upload your bank CSV for automated matching.',
  },
  {
    step: 'Step 3',
    title: 'Export Audit-Ready BRS',
    description:
      'Verify your ₹0.00 variance, then print or download a professional PDF/CSV statement complete with Annexures of uncleared cheques.',
  },
];

const BRS_COMPARISON = [
  {
    feature: 'Multiple Bank Accounts',
    excel: 'Messy separate sheets',
    hisabSarthi: 'Unified dropdown switcher',
  },
  {
    feature: 'Uncleared Cheques Tracking',
    excel: 'Manual color highlights',
    hisabSarthi: 'Automatic Annexure schedules',
  },
  {
    feature: 'Bank Statement Matching',
    excel: 'Tedious row-by-row ticking',
    hisabSarthi: 'Automated CSV matching in seconds',
  },
  {
    feature: 'Missing Bank Charges',
    excel: 'Forgot to book in ledger',
    hisabSarthi: '1-Click Quick Bank Entry',
  },
  {
    feature: 'Audit-Ready Reports',
    excel: 'Hours of formatting',
    hisabSarthi: '1-Click professional print/PDF',
  },
  {
    feature: 'Human Error Risk',
    excel: 'High',
    hisabSarthi: 'Automated reconciliation math',
  },
];

const BRS_FAQS = [
  {
    question: 'Can I manage Current, Savings, and OD/CC bank accounts together?',
    answer:
      'Yes. HisabSarthi Multi-Bank Master supports multiple Current, Savings, and OD/CC accounts across HDFC, SBI, ICICI, Axis, Kotak, and other banks with opening balances, IFSC codes, and UPI VPAs.',
  },
  {
    question: 'Do I need to connect my NetBanking password to use CSV Auto-Matching?',
    answer:
      'No. You simply download your bank statement CSV directly from your NetBanking portal and upload it into HisabSarthi BRS to auto-match transactions by amount, date proximity, and UTR/cheque reference.',
  },
  {
    question: 'Is Multi-Bank & BRS included in the ₹4,999 lifetime plan?',
    answer:
      'Yes. Multi-Bank Master and Smart Bank Reconciliation (BRS) are part of the ₹4,999 one-time lifetime HisabSarthi package configured by the Suraj Automation Team.',
  },
];

export default function BankReconciliationFeaturePage() {
  const buyNowUrl = buildWhatsAppUrl('buy-setup');
  const callUrl = buildCallUrl();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    {
      name: 'Multi-Bank & Smart BRS',
      href: '/features/bank-reconciliation-multi-bank',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(
            breadcrumbs.map((b) => ({ name: b.name, path: b.href }))
          ),
          buildFaqSchema(BRS_FAQS),
        ]}
      />
      <Navbar />

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* 1. HERO SECTION */}
          <header className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-wide text-emerald-700">
                  New Feature · Intelligent Banking &amp; Reconciliation
                </p>

                <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-5xl [text-wrap:balance]">
                  Effortless Bank Reconciliation with Multi-Bank Power.
                </h1>

                <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                  No more spreadsheet headaches or balancing mismatches. Manage multiple bank accounts, auto-match bank statements in seconds, track uncleared cheques, and achieve a{' '}
                  <strong className="font-mono-num font-semibold text-[#0F172A]">
                    ₹0.00
                  </strong>{' '}
                  variance with audit-ready BRS reports in HisabSarthi.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <TrackedLink
                    href={buyNowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="whatsapp_cta_click"
                    eventLocation="brs_hero"
                    eventLabel="brs_start_reconciling"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#047857] whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Start Reconciling Today</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </TrackedLink>

                  <TrackedLink
                    href={LIVE_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="demo_interaction"
                    eventLocation="brs_hero"
                    eventLabel="brs_open_live_demo"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-[#0F172A] transition-colors hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap"
                  >
                    <Play className="h-4 w-4 text-emerald-700" />
                    <span>Open Live Demo</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400" />
                  </TrackedLink>

                  <TrackedLink
                    href={callUrl}
                    eventName="phone_call_click"
                    eventLocation="brs_hero"
                    eventLabel="brs_call"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-[#FAF9F6] px-4 py-3.5 text-xs font-semibold text-[#0F172A] transition-colors hover:bg-slate-100 whitespace-nowrap"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-700" />
                    <span className="font-mono-num">{WHATSAPP_CONFIG.displayPhone}</span>
                  </TrackedLink>
                </div>

                <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1.5 text-slate-700">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                    Multi-Bank Ready
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>CA &amp; Auditor Standard Format</span>
                  <span aria-hidden="true">·</span>
                  <span>Stored in Your Authorized Google Drive</span>
                </p>
              </div>

              <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
                <PosterSpotlightCard poster={BRS_POSTER} />
              </div>
            </div>
          </header>

          {/* 2. CORE VALUE HIGHLIGHTS (3-Pillar Banner) */}
          <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {BRS_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-slate-200 bg-white p-6"
                >
                  <Icon className="h-5 w-5 text-emerald-700" strokeWidth={2} />
                  <h2 className="mt-3 font-display text-lg font-bold text-[#0F172A]">
                    {pillar.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </section>

          {/* INTERACTIVE LIVE BRS DEMO */}
          <section id="brs-live-demo" className="mt-14">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-emerald-700">
                  Interactive BRS Workspace
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                  Test Multi-Bank Switching &amp; CSV Auto-Matching Live
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Switch bank accounts, click <strong className="text-[#0F172A]">Auto-Match Bank CSV</strong>, clear transactions in one click, or log a quick bank charge to see your BRS reach ₹0.00 variance.
                </p>
              </div>
              <TrackedLink
                href={LIVE_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                eventName="demo_interaction"
                eventLocation="brs_demo_section"
                eventLabel="brs_launch_full_app"
                className="inline-flex items-center gap-1.5 self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#0F172A] transition-colors hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap shrink-0 sm:self-end"
              >
                <Play className="h-3.5 w-3.5 text-emerald-700" />
                <span>Launch Full Live App</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
              </TrackedLink>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
              <BrsWorkspaceDemo />
            </div>
          </section>

          {/* 3. FEATURE SHOWCASE (6 Product Cards) */}
          <section className="mt-14">
            <div className="mb-8 max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                Built for Clean Banking Control
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                Six Practical Tools Inside One Reconciliation Screen
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {BRS_FEATURES.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono-num text-xs font-semibold text-emerald-700">
                        {item.number}
                      </span>
                      <Icon className="h-4 w-4 text-slate-500" />
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#0F172A]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-emerald-700">
                      {item.subtitle}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* 4. HOW IT WORKS (3 Simple Steps) */}
          <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-7 sm:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                3-Step Reconciliation Workflow
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                How Smart BRS Works in HisabSarthi
              </h2>
            </div>

            <ol className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {BRS_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-6"
                >
                  <span className="font-mono-num inline-block rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-emerald-700">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* 5. COMPARISON: SPREADSHEETS VS HISABSARTHI BRS */}
          <section className="mt-14">
            <div className="mb-6 max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                Side-by-Side Comparison
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                Manual Spreadsheets vs. HisabSarthi Smart BRS
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-[#FAF9F6] text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Feature</th>
                    <th className="px-6 py-4 font-semibold">
                      Old Way (Excel / Manual)
                    </th>
                    <th className="px-6 py-4 font-semibold text-emerald-800">
                      HisabSarthi Smart BRS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {BRS_COMPARISON.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/70">
                      <td className="px-6 py-4 font-semibold text-[#0F172A]">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{row.excel}</td>
                      <td className="px-6 py-4 font-medium text-emerald-800">
                        <span className="inline-flex items-center gap-2">
                          <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{row.hisabSarthi}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* BRS FAQs & Related Modules */}
          <section className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                Frequently Asked Questions
              </h2>
              <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                {BRS_FAQS.map((faq) => (
                  <div key={faq.question} className="p-6">
                    <h3 className="font-display text-base font-semibold text-[#0F172A]">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-4 lg:self-start">
              <h2 className="font-display text-base font-bold text-[#0F172A]">
                Connected Accounting Modules
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  {
                    label: 'Ageing Reports & Party Ledgers',
                    href: '/features/ageing-reports',
                  },
                  {
                    label: 'Business Dashboard & MIS',
                    href: '/features/business-dashboard',
                  },
                  {
                    label: 'GST Summary & HSN Reporting',
                    href: '/features/gst-reporting',
                  },
                  {
                    label: 'Data Ownership & Google Drive Security',
                    href: '/security',
                  },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-4"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="mt-14">
            <SubpageCta
              contextLabel="feature_brs_multibank"
              heading="Get Multi-Bank & Smart BRS Inside HisabSarthi — ₹4,999 Lifetime"
              subcopy="Includes Multi-Bank Master, Smart CSV Auto-Matcher, CA-standard BRS reports, plus all 8 core accounting & inventory modules with free initial setup."
            />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
