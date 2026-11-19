import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubpageCta from '@/components/SubpageCta';
import JsonLd from '@/components/JsonLd';
import { GUIDE_ARTICLES, getGuideBySlug } from '@/lib/seo-pages-data';
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildArticleSchema,
  buildFaqSchema,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDE_ARTICLES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return buildPageMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
    type: 'article',
    publishedTime: guide.publishedTime,
  });
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const otherGuides = GUIDE_ARTICLES.filter((g) => g.slug !== guide.slug).slice(
    0,
    3
  );

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Guides', href: '/guides' },
    { name: guide.category, href: `/guides/${guide.slug}` },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(
            breadcrumbs.map((b) => ({ name: b.name, path: b.href }))
          ),
          buildArticleSchema({
            title: guide.title,
            description: guide.seoDescription,
            path: `/guides/${guide.slug}`,
            publishedTime: guide.publishedTime,
          }),
          buildFaqSchema(guide.faqs),
        ]}
      />
      <Navbar />

      <main className="py-12 sm:py-16">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <header>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-emerald-700">
                {guide.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>By Suraj Automation Team</span>
              <span aria-hidden="true">·</span>
              <span>{guide.readingTime}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={guide.publishedTime}>
                Published {guide.publishedTime}
              </time>
            </div>

            <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[#0F172A] sm:text-4xl [text-wrap:balance]">
              {guide.title}
            </h1>

            {/* Direct Opening Answer Block (AEO-optimized) */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                Direct Summary
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-700">
                {guide.directAnswer}
              </p>
            </div>
          </header>

          {/* Main Sections */}
          <div className="mt-10 space-y-10">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-slate-700">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 space-y-2.5 rounded-xl border border-slate-200 bg-white p-5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Practical Example */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                Practical Business Scenario
              </p>
              <h2 className="mt-1.5 font-display text-xl font-bold text-[#0F172A]">
                {guide.practicalExample.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {guide.practicalExample.body}
              </p>
              <div className="mt-4">
                <Link
                  href={`/features/${guide.relatedFeatureSlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <span>{guide.relatedFeatureLabel}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Transparent Limitations */}
            <aside className="rounded-xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-600">
              <div className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                <p>{guide.limitationsNote}</p>
              </div>
            </aside>

            {/* Article FAQs */}
            <section>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                Key Questions Answered
              </h2>
              <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
                {guide.faqs.map((faq) => (
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

            {/* Related Guides */}
            <section className="border-t border-slate-200 pt-8">
              <h2 className="font-display text-lg font-bold text-[#0F172A]">
                More Guides from HisabSarthi
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {otherGuides.map((og) => (
                  <Link
                    key={og.slug}
                    href={`/guides/${og.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300"
                  >
                    <p className="text-[11px] font-semibold text-emerald-700">
                      {og.category}
                    </p>
                    <p className="mt-1.5 font-display text-sm font-semibold text-[#0F172A] line-clamp-2">
                      {og.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-12">
            <SubpageCta contextLabel={`guide_${guide.slug}`} />
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
