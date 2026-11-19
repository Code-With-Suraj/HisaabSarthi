import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Database, Lock, Layers, Check, Info, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubpageCta from '@/components/SubpageCta';
import JsonLd from '@/components/JsonLd';
import { DATA_OWNERSHIP_POINTS } from '@/lib/hisab-data';
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Data Ownership, Google Drive Architecture & Security | HisabSarthi',
  description:
    'Understand how HisabSarthi stores your business records in your own Google Sheets and Google Drive, how Google authorization works, and transparent operational scope.',
  path: '/security',
});

const SECURITY_FAQS = [
  {
    question: 'Does Suraj Automation ask for my Gmail password?',
    answer:
      'No. You never share your Google password with the Suraj Automation Team. You grant required permissions directly through Google’s official authorization screen.',
  },
  {
    question: 'Where is my business accounting database stored?',
    answer:
      'A dedicated Google Spreadsheet is created inside your authorized Google Drive account, and your transactions are stored inside that spreadsheet.',
  },
  {
    question: 'What happens if I revoke Google authorization?',
    answer:
      'Because HisabSarthi operates through Google-authorized access, revoking authorization or losing Google account access will pause some or all application functions until authorization is restored. Your spreadsheet file remains in your Google Drive.',
  },
];

export default function SecurityPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Data Ownership & Security', href: '/security' },
  ];

  const icons = [Database, Layers, ShieldCheck, Check, Lock];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(
            breadcrumbs.map((b) => ({ name: b.name, path: b.href }))
          ),
          buildFaqSchema(SECURITY_FAQS),
        ]}
      />
      <Navbar />

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <header className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-emerald-700">
              Transparency &amp; Architecture · Google Sheets + Google Apps Script
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl [text-wrap:balance]">
              How HisabSarthi Manages Customer Data in Your Own Google Drive
            </h1>
            <p className="mt-4 rounded-xl border border-slate-200 bg-white p-5 text-base leading-relaxed text-slate-700">
              HisabSarthi is built on Google Apps Script and Google Sheets so your business records reside in a dedicated Google Spreadsheet inside your own authorized Google account—subject to your Google account security settings, deployment configuration, and granted permissions.
            </p>
          </header>

          {/* Architecture Principles */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
              How Data Ownership &amp; Access Works
            </h2>
            <ul className="mt-6 space-y-3.5">
              {DATA_OWNERSHIP_POINTS.map((point, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <li
                    key={point}
                    className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                    <span>{point}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Responsible Disclosure & Operational Scope */}
          <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-display text-lg font-bold text-[#0F172A]">
                Best Practices for Business Owners
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Enable 2-Step Verification (2FA) on the Google account hosting your business database.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Review Google Drive sharing settings periodically so only authorized staff can view or edit files.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Download periodic spreadsheet/CSV backups of invoices, inventory, and ledgers for your own archive.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-[#0F172A]">
                <Info className="h-4 w-4 text-slate-500" />
                <span>Transparent Platform Boundaries</span>
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
                <li>
                  · HisabSarthi’s authorized code accesses your connected business spreadsheet strictly to execute billing, inventory, ledger, and reporting actions.
                </li>
                <li>
                  · No software system can promise absolute zero risk; overall security depends on your Google account protection, device hygiene, and access controls.
                </li>
                <li>
                  · Application availability relies on internet connectivity, Google Cloud/Drive uptime, and standard Google Apps Script usage quotas.
                </li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
              Data &amp; Authorization FAQs
            </h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {SECURITY_FAQS.map((faq) => (
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
            <div className="mt-5">
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>See the 5-step onboarding &amp; Google authorization journey</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <div className="mt-12">
            <SubpageCta contextLabel="security_page" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
