import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/SiteFooter';
import Breadcrumbs from '@/components/Breadcrumbs';
import SubpageCta from '@/components/SubpageCta';
import JsonLd from '@/components/JsonLd';
import {
  SOLUTION_PAGES,
  getSolutionPageBySlug,
  getGuideBySlug,
} from '@/lib/seo-pages-data';
import {
  buildPageMetadata,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SOLUTION_PAGES.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionPageBySlug(slug);
  if (!solution) return {};

  return buildPageMetadata({
    title: solution.seoTitle,
    description: solution.seoDescription,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionPageBySlug(slug);
  if (!solution) notFound();

  const relatedGuide = getGuideBySlug(solution.relatedGuideSlug);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/#who-uses' },
    { name: solution.title, href: `/solutions/${solution.slug}` },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <JsonLd
        data={[
          buildBreadcrumbSchema(
            breadcrumbs.map((b) => ({ name: b.name, path: b.href }))
          ),
          buildFaqSchema(solution.faqs),
        ]}
      />
      <Navbar />

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <header className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-emerald-700">
              {solution.kicker}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl [text-wrap:balance]">
              {solution.headline}
            </h1>
            <p className="mt-4 rounded-xl border border-slate-200 bg-white p-5 text-base leading-relaxed text-slate-700">
              {solution.directAnswer}
            </p>
          </header>

          {/* Industry Challenges */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
              Common Operational Bottlenecks We Solve
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
              {solution.challenges.map((ch) => (
                <div
                  key={ch.title}
                  className="rounded-xl border border-slate-200 bg-white p-6"
                >
                  <h3 className="font-display text-base font-semibold text-[#0F172A]">
                    {ch.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {ch.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How HisabSarthi Helps */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
              Connected Modules for {solution.title}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {solution.howHisabSarthiHelps.map((item) => (
                <div
                  key={item.module}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
                >
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#0F172A]">
                      {item.module}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.benefit}
                    </p>
                  </div>
                  <Link
                    href={`/features/${item.featureSlug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Explore module details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Typical End-to-End Workflow */}
          <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#0F172A]">
              Typical Daily Workflow
            </h2>
            <ul className="mt-5 space-y-3.5">
              {solution.typicalWorkflow.map((step) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            {relatedGuide && (
              <div className="mt-6 border-t border-slate-200 pt-5">
                <Link
                  href={`/guides/${relatedGuide.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Read guide: {relatedGuide.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </section>

          {/* FAQs */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
              Common Questions
            </h2>
            <div className="mt-5 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {solution.faqs.map((faq) => (
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
            <SubpageCta contextLabel={`solution_${solution.slug}`} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
