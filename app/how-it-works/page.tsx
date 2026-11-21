import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubpageCta from '@/components/SubpageCta';
import { PosterSpotlightCard } from '@/components/FeatureVisualViewer';
import JsonLd from '@/components/JsonLd';
import { SETUP_STEPS, PRICING_INCLUDED } from '@/lib/hisab-data';
import { FEATURE_POSTERS } from '@/lib/feature-posters';
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from '@/lib/seo';

const SETTINGS_POSTER = FEATURE_POSTERS.find(
  (p) => p.id === 'business-settings-migration'
)!;

export const metadata: Metadata = buildPageMetadata({
  title: 'How HisabSarthi Setup Works — 5-Step Guided Onboarding',
  description:
    'Learn how Suraj Automation Team sets up HisabSarthi in your own Google Drive in 5 guided steps—no downloads, no password sharing, ₹4,999 one-time.',
  path: '/how-it-works',
});

const SETUP_FAQS = [
  {
    question: 'Do I need to install desktop software or configure Apps Script myself?',
    answer:
      'No. HisabSarthi is browser-based and the Suraj Automation Team handles the initial technical configuration and database initialization for your business.',
  },
  {
    question: 'Do I ever share my Gmail password during onboarding?',
    answer:
      'Never. You authorize required permissions yourself through Google’s official authorization screen.',
  },
  {
    question: 'What is included vs. separately chargeable?',
    answer:
      'The ₹4,999 one-time plan includes lifetime software access, initial setup by Suraj Automation Team, dedicated Google Sheets database setup, your application link, and initial guided onboarding. Custom modifications or data migration outside the standard initial setup may be separately chargeable.',
  },
];

export default function HowItWorksPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'How Setup Works', href: '/how-it-works' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(
            breadcrumbs.map((b) => ({ name: b.name, path: b.href }))
          ),
          buildFaqSchema(SETUP_FAQS),
        ]}
      />
      <Navbar />

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <header className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-emerald-700">
              Guided Implementation · Suraj Automation Team
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl [text-wrap:balance]">
              How HisabSarthi Setup Works — From Purchase to Ready-to-Use Application
            </h1>
            <p className="mt-4 rounded-xl border border-slate-200 bg-white p-5 text-base leading-relaxed text-slate-700">
              When you purchase HisabSarthi for ₹4,999 (one-time payment), you do not have to install software or configure Google Sheets yourself. The Suraj Automation Team configures your business application, initializes your dedicated spreadsheet database in your authorized Google Drive, and guides your initial onboarding in five clear steps.
            </p>
          </header>

          {/* 5-Step Journey + Business Settings & Migration Visual */}
          <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                Your 5-Step Onboarding Journey
              </h2>
              <ol className="mt-6 space-y-4">
                {SETUP_STEPS.map((item) => (
                  <li
                    key={item.step}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-start sm:gap-4"
                  >
                    <span className="font-mono-num shrink-0 self-start rounded-lg border border-slate-200 bg-[#FAF9F6] px-3 py-1.5 text-xs font-bold text-emerald-700">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24 lg:col-span-5 lg:max-w-none">
              <PosterSpotlightCard poster={SETTINGS_POSTER} />
              <p className="mt-2.5 text-xs text-slate-500">
                Configure company profile, bank details, Print A &amp; Print B invoice formats, and import existing masters &amp; transactions.
              </p>
            </div>
          </section>

          {/* Included Deliverables */}
          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#0F172A]">
              Everything Included in Your ₹4,999 One-Time Setup
            </h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRICING_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-slate-200 pt-5 text-sm">
              <Link
                href="/security"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Read how Google Drive data ownership &amp; permissions work</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Setup FAQs */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
              Onboarding Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {SETUP_FAQS.map((faq) => (
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
          </section>

          <div className="mt-12">
            <SubpageCta contextLabel="how_it_works" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
