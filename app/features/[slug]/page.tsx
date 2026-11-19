import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight, Info, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubpageCta from '@/components/SubpageCta';
import JsonLd from '@/components/JsonLd';
import {
  FEATURE_PAGES,
  getFeaturePageBySlug,
  getGuideBySlug,
} from '@/lib/seo-pages-data';
import { PRODUCT_SCREENS } from '@/lib/product-screens';
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FEATURE_PAGES.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeaturePageBySlug(slug);
  if (!feature) return {};
  const screen = PRODUCT_SCREENS.find((s) => s.id === feature.screenId);

  return buildPageMetadata({
    title: feature.seoTitle,
    description: feature.seoDescription,
    path: `/features/${feature.slug}`,
    image: screen?.src,
    imageAlt: screen?.alt,
  });
}

export default async function FeatureDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const feature = getFeaturePageBySlug(slug);
  if (!feature) notFound();

  const screen = PRODUCT_SCREENS.find((s) => s.id === feature.screenId);
  const relatedFeatures = feature.relatedSlugs
    .map((s) => getFeaturePageBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const relatedGuide = getGuideBySlug(feature.relatedGuideSlug);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: feature.title, href: `/features/${feature.slug}` },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(
            breadcrumbs.map((b) => ({ name: b.name, path: b.href }))
          ),
          buildFaqSchema(feature.faqs),
        ]}
      />
      <Navbar />

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          {/* Header & Direct AEO Answer */}
          <header className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-emerald-700">
              {feature.kicker}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl [text-wrap:balance]">
              {feature.headline}
            </h1>
            <p className="mt-4 rounded-xl border border-slate-200 bg-white p-5 text-base leading-relaxed text-slate-700">
              {feature.directAnswer}
            </p>
          </header>

          {/* Actual Software Screenshot */}
          {screen && (
            <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
              <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-[#F4F2EC] p-3">
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  priority
                  referrerPolicy="no-referrer"
                  className="max-h-[480px] h-auto w-auto max-w-full rounded-lg border border-slate-200 bg-white object-contain"
                />
              </div>
              <figcaption className="mt-3 px-1 text-xs text-slate-500">
                Actual HisabSarthi workspace screen: {screen.caption}
              </figcaption>
            </figure>
          )}

          {/* Capabilities Grid */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
              Key Capabilities Included
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {feature.keyCapabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="font-display text-base font-semibold text-[#0F172A]">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {cap.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow & Practical Example */}
          <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
              <h2 className="font-display text-xl font-bold text-[#0F172A]">
                How It Works Day to Day
              </h2>
              <ol className="mt-5 space-y-4">
                {feature.workflowSteps.map((ws, i) => (
                  <li key={ws.step} className="flex items-start gap-3.5">
                    <span className="font-mono-num shrink-0 rounded-lg border border-slate-200 bg-[#FAF9F6] px-2.5 py-1 text-xs font-bold text-emerald-700">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#0F172A]">
                        {ws.step}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {ws.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-5">
              <div>
                <h2 className="font-display text-xl font-bold text-[#0F172A]">
                  Who Benefits Most
                </h2>
                <ul className="mt-4 space-y-3">
                  {feature.whoNeedsIt.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-[#FAF9F6] p-4">
                <p className="text-xs font-semibold text-emerald-700">
                  Practical Business Example
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  <strong className="text-[#0F172A]">Before:</strong>{' '}
                  {feature.practicalExample.scenario}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  <strong className="text-[#0F172A]">With HisabSarthi:</strong>{' '}
                  {feature.practicalExample.outcome}
                </p>
              </div>
            </div>
          </section>

          {/* Transparent Limitations */}
          <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-2 font-display text-base font-semibold text-[#0F172A]">
              <Info className="h-4 w-4 text-slate-500" />
              <span>Important Scope &amp; Limitations</span>
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {feature.limitations.map((lim) => (
                <li key={lim} className="leading-relaxed">
                  · {lim}
                </li>
              ))}
            </ul>
          </section>

          {/* Feature FAQs */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {feature.faqs.map((faq) => (
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

          {/* Related Internal Links */}
          <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-display text-base font-semibold text-[#0F172A]">
                Related Modules in HisabSarthi
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {relatedFeatures.map((rf) => (
                  <li key={rf.slug}>
                    <Link
                      href={`/features/${rf.slug}`}
                      className="inline-flex items-center gap-1.5 font-medium text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-4"
                    >
                      <span>{rf.title}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {relatedGuide && (
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Related Practical Guide</span>
                </p>
                <h2 className="mt-2 font-display text-base font-semibold text-[#0F172A]">
                  {relatedGuide.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
                  {relatedGuide.directAnswer}
                </p>
                <Link
                  href={`/guides/${relatedGuide.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] hover:text-emerald-700"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </section>

          {/* Conversion CTA */}
          <div className="mt-12">
            <SubpageCta contextLabel={`feature_${feature.slug}`} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
