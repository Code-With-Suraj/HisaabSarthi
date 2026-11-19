import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubpageCta from '@/components/SubpageCta';
import JsonLd from '@/components/JsonLd';
import { GUIDE_ARTICLES, FEATURE_PAGES } from '@/lib/seo-pages-data';
import { buildPageMetadata, buildBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Business Accounting, MIS & Google Sheets Guides | HisabSarthi',
  description:
    'Practical guides on automated MIS reporting in Google Sheets, GST summary reconciliation, delivery challan consolidation, and ageing reports.',
  path: '/guides',
});

export default function GuidesIndexPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Guides & Resources', href: '/guides' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <JsonLd
        data={buildBreadcrumbSchema(
          breadcrumbs.map((b) => ({ name: b.name, path: b.href }))
        )}
      />
      <Navbar />

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <header className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-emerald-700">
              HisabSarthi Knowledge Hub · Practical Guides
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl [text-wrap:balance]">
              Practical Guides on Business Accounting, MIS Reporting &amp; Google Sheets Automation
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Clear, factual explanations covering how growing Indian businesses automate daily MIS dashboards, delivery challan consolidation, GST summaries, and receivable ageing using Google Sheets and Apps Script.
            </p>
          </header>

          {/* Guide Cards */}
          <section className="mt-10 space-y-5">
            {GUIDE_ARTICLES.map((guide) => (
              <article
                key={guide.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 transition-colors hover:border-slate-300"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-700">
                    {guide.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{guide.readingTime}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={guide.publishedTime}>
                    Updated {guide.publishedTime}
                  </time>
                </div>

                <h2 className="mt-2.5 font-display text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="hover:text-emerald-800 transition-colors"
                  >
                    {guide.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {guide.directAnswer}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Read Complete Guide</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/features/${guide.relatedFeatureSlug}`}
                    className="text-xs font-medium text-slate-500 hover:text-[#0F172A]"
                  >
                    {guide.relatedFeatureLabel}
                  </Link>
                </div>
              </article>
            ))}
          </section>

          {/* Quick Feature Links */}
          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-[#0F172A]">
              Explore Product Modules
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {FEATURE_PAGES.map((feature) => (
                <Link
                  key={feature.slug}
                  href={`/features/${feature.slug}`}
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-[#FAF9F6] px-4 py-3 text-xs font-semibold text-[#0F172A] transition-colors hover:border-slate-300 hover:bg-white"
                >
                  <span>{feature.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-700" />
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-12">
            <SubpageCta contextLabel="guides_index" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
