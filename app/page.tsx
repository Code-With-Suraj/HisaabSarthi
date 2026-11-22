import Link from 'next/link';
import {
  Check,
  ArrowUpRight,
  ArrowRight,
  Play,
  MessageCircle,
  ShieldCheck,
  Database,
  Lock,
  Layers,
  Phone,
  BookOpen,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroProductShowcase from '@/components/HeroProductShowcase';
import FeatureExplorer from '@/components/FeatureExplorer';
import VisualProductCatalog from '@/components/VisualProductCatalog';
import DashboardSimulator from '@/components/DashboardSimulator';
import IndianTestimonials from '@/components/IndianTestimonials';
import PricingWhatsAppBox from '@/components/PricingWhatsAppBox';
import FaqAccordion from '@/components/FaqAccordion';
import ResilientImage from '@/components/ResilientImage';
import SiteFooter from '@/components/SiteFooter';
import JsonLd from '@/components/JsonLd';
import TrackedLink from '@/components/TrackedLink';
import {
  PAIN_POINTS,
  INTRO_CAPABILITIES,
  SETUP_STEPS,
  DATA_OWNERSHIP_POINTS,
  TARGET_BUSINESSES,
  COMPARISON_ROWS,
  FAQ_ITEMS,
} from '@/lib/hisab-data';
import { SOLUTION_PAGES, GUIDE_ARTICLES } from '@/lib/seo-pages-data';
import {
  buildSoftwareApplicationSchema,
  buildFaqSchema,
} from '@/lib/seo';
import {
  LIVE_DEMO_URL,
  WHATSAPP_CONFIG,
  buildCallUrl,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';
import distributorOfficeImg from '@/src/assets/images/indian_distributor_office_1795002294469.jpg';
import teamOnboardingImg from '@/src/assets/images/team_onboarding_setup_1795002294768.jpg';

export default function HomePage() {
  const buyNowUrl = buildWhatsAppUrl('buy-setup');
  const talkTeamUrl = buildWhatsAppUrl('team-chat');
  const callUrl = buildCallUrl();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A]">
      <JsonLd
        data={[
          buildSoftwareApplicationSchema(),
          buildFaqSchema(FAQ_ITEMS),
        ]}
      />
      <Navbar />

      <main>
        {/* SECTION 1 – E-COMMERCE STYLE PRODUCT HERO */}
        <section className="border-b border-slate-200/80 bg-[#FAF9F6] py-10 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              {/* Left 7 Columns: E-Commerce Product Gallery & Actual Software Screenshot */}
              <div className="lg:col-span-7">
                <HeroProductShowcase />
              </div>

              {/* Right 5 Columns: Contiguous E-Commerce Purchase Module */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 lg:col-span-5">
                <p className="text-xs font-semibold text-emerald-700">
                  New Year Limited-Time Offer · HisabSarthi by Suraj Automation
                </p>

                <h1 className="mt-2.5 font-display text-[clamp(1.75rem,2.6vw,2.35rem)] font-bold leading-[1.16] tracking-tight text-[#0F172A] [text-wrap:balance]">
                  Smart SMB Accounting. Pay Only for Features You Actually Use.
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Built for Indian small &amp; medium businesses that don&apos;t want to pay recurring fees for bloated, unnecessary menus in heavy software like{' '}
                  <strong className="font-semibold text-[#0F172A]">
                    Tally, Busy or Vyapar
                  </strong>
                  —or struggle with scattered Excel files.
                </p>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  Meet{' '}
                  <strong className="font-semibold text-[#0F172A]">
                    HisabSarthi
                  </strong>
                  : only the practical daily tools your SMB needs—Sales Invoices, Delivery Challans, Purchases, Inventory, Custom Pricing, Party Ledgers, Multi-Bank BRS &amp; GST Reports in one clean app.
                </p>

                {/* Contiguous New Year Price & Savings Block */}
                <div className="mt-5 border-y border-slate-200 py-4">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <span className="font-mono-num text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                      ₹4,999
                    </span>
                    <span className="font-mono-num text-base text-slate-400 line-through">
                      ₹9,999
                    </span>
                    <span className="text-xs font-semibold text-emerald-700">
                      New Year Offer · 50% OFF Lifetime
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600">
                    Limited-Time One-Time Payment · Regular plans after New Year: ₹449/mo to ₹9,999 Lifetime · Free Setup
                  </p>
                </div>

                {/* Setup Highlight */}
                <div className="mt-4 rounded-xl border border-slate-200 bg-[#FAF9F6] p-3.5">
                  <p className="text-xs font-semibold text-[#0F172A]">
                    And the best part? You don&apos;t have to install or configure anything yourself.
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    <strong className="font-semibold text-emerald-700">
                      Suraj Automation Team
                    </strong>{' '}
                    will set up HisabSarthi for your business.
                  </p>
                </div>

                {/* Primary & Secondary Purchase Actions */}
                <div className="mt-5 space-y-2.5">
                  <TrackedLink
                    href={buyNowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="whatsapp_cta_click"
                    eventLocation="hero"
                    eventLabel="hero_get_hisabsarthi"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#059669] px-5 py-3.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#047857] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>GET HISABSARTHI NOW</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </TrackedLink>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <TrackedLink
                      href={LIVE_DEMO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      eventName="demo_interaction"
                      eventLocation="hero"
                      eventLabel="hero_watch_live_demo"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#0F172A] transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    >
                      <Play className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
                      <span>Open Live Demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    </TrackedLink>

                    <TrackedLink
                      href={callUrl}
                      eventName="phone_call_click"
                      eventLocation="hero"
                      eventLabel="hero_direct_call"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-[#0F172A] transition-colors duration-150 hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
                      <span className="font-mono-num">{WHATSAPP_CONFIG.displayPhone}</span>
                    </TrackedLink>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-slate-500 italic">
                  No software download. No complicated technical setup. We take care of the setup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 – PROBLEM / PAIN POINTS */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                Still Managing Your Business Like This?
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Your business deserves better than disconnected spreadsheets and manual accounting.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {PAIN_POINTS.map((pain) => (
                <div
                  key={pain.number}
                  className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-6"
                >
                  <p className="font-mono-num text-xs font-semibold text-rose-700">
                    {pain.number}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-[#0F172A]">
                    {pain.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {pain.description}
                  </p>
                </div>
              ))}

              {/* Connected System Resolution Card */}
              <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-[#0F172A] p-6 text-white">
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    Your SMB Needs Only the Features You Use—Not Software Bloat.
                  </h3>
                  <div className="mt-4 space-y-1.5 text-sm text-slate-300">
                    <p>Not scattered Excel files.</p>
                    <p>Not paying yearly in Tally, Busy or Vyapar for 100+ unused features.</p>
                    <p className="font-semibold text-emerald-400">
                      Just the exact accounting &amp; stock tools your small business needs daily.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href="#live-demo"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-emerald-300"
                  >
                    <span>Explore Live Dashboard</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 – PRODUCT INTRODUCTION */}
        <section className="border-b border-slate-200/80 bg-[#FAF9F6] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold tracking-wide text-emerald-700">
                  Built Exclusively for Practical Indian SMBs
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                  Zero Bloated Menus. Only What Your Small Business Needs.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Heavy accounting tools like Tally, Busy and Vyapar pack hundreds of complex screens designed for large enterprises and CA firms—yet most SMBs use barely 15% of them while paying recurring renewals every year.
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  HisabSarthi gives you only the focused workflows you actually use daily: billing, delivery challans, stock tracking, custom party rates, ledgers, multi-bank BRS and GST summaries.
                </p>
                <p className="mt-3 text-sm font-semibold text-[#0F172A]">
                  Simple enough for any shop staff. Powerful enough for your CA.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
                <h3 className="font-display text-base font-semibold text-[#0F172A]">
                  With HisabSarthi, you can:
                </h3>
                <ul className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {INTRO_CAPABILITIES.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                        strokeWidth={2.2}
                      />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 – FEATURES (01–09) */}
        <section id="features" className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                Complete Operational Modules
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                Everything Your Business Needs. In One Place.
              </h2>
            </div>

            <FeatureExplorer />
          </div>
        </section>

        {/* SECTION 4.5 – VISUAL PRODUCT BLUEPRINTS (12-MODULE MODERN SHOWCASE) */}
        <section
          id="visual-tour"
          className="border-b border-slate-800 bg-[#0B1528] py-16 text-white sm:py-20"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-emerald-400">
                  Visual Module Gallery · 12 Core Capabilities
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
                  See Every HisabSarthi Module Up Close.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  Explore all 12 modules—from GST Sales Invoicing, Delivery Challans and Multi-Bank BRS to Ageing Analysis, Party Ledgers, Custom Pricing and Dual Print Formats.
                </p>
              </div>
              <p className="text-xs font-medium text-slate-400 lg:text-right">
                Filter by workflow or click any blueprint for full-resolution inspection.
              </p>
            </div>

            <VisualProductCatalog />
          </div>
        </section>

        {/* SECTION 5 – INTERACTIVE DASHBOARD & LIVE DEMO SIMULATOR */}
        <section id="live-demo" className="border-b border-slate-200/80 bg-[#FAF9F6] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-emerald-700">
                  Interactive Live Demo
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                  Your Entire Business at a Glance.
                </h2>
                <p className="mt-3 text-base text-slate-600">
                  No need to open multiple Excel files to understand your business. Preview the workspace below or launch the actual running HisabSarthi web application in one click.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 lg:items-end">
                <TrackedLink
                  href={LIVE_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="demo_interaction"
                  eventLocation="live_demo_section"
                  eventLabel="launch_full_live_app"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <Play className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Launch Full Live App</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-300" />
                </TrackedLink>
                <p className="text-xs text-slate-500">
                  Opens the live HisabSarthi Google Web App in a new tab
                </p>
              </div>
            </div>

            <DashboardSimulator />
          </div>
        </section>

        {/* SECTION 6 – UNIQUE SELLING PROPOSITION (SETUP JOURNEY) */}
        <section id="setup" className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-emerald-700">
                    Managed Onboarding by Suraj Automation
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                    You Buy the Software. We Handle the Setup.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    Most software providers give you a login or download link and leave you to figure out the rest.{' '}
                    <strong className="font-semibold text-[#0F172A]">
                      We do things differently.
                    </strong>{' '}
                    When you purchase HisabSarthi, Suraj Automation Team will handle the initial technical setup.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  <ResilientImage
                    src={teamOnboardingImg}
                    alt="Suraj Automation specialists configuring HisabSarthi cloud workspace for a business owner"
                    caption="Guided Onboarding & Initial Application Setup"
                    className="aspect-video w-full"
                  />
                  <div className="rounded-xl border border-slate-200 bg-[#FAF9F6] p-5">
                    <p className="font-display text-base font-bold text-[#0F172A]">
                      No Technical Knowledge Required.
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      You focus on your business. We handle the initial setup.
                    </p>
                    <Link
                      href="/how-it-works"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>View Complete Onboarding Guide</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="mb-5 font-display text-lg font-semibold text-[#0F172A]">
                  Your Setup Journey
                </h3>
                <ol className="space-y-4">
                  {SETUP_STEPS.map((item) => (
                    <li
                      key={item.step}
                      className="flex items-start gap-4 rounded-xl border border-slate-200 bg-[#FAF9F6] p-5"
                    >
                      <span className="font-mono-num shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-700">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="font-display text-base font-semibold text-[#0F172A]">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7 – DATA OWNERSHIP & TRANSPARENCY */}
        <section className="border-b border-slate-200/80 bg-[#FAF9F6] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-5">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-700">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Google Apps Script &amp; Google Sheets Architecture</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                    Your Business Data. Your Google Drive.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    We believe business data should remain under the business owner&apos;s control. HisabSarthi is built using Google Apps Script and Google Sheets.
                  </p>
                  <p className="mt-5 font-display text-base font-bold text-[#0F172A]">
                    Your Google account. Your business database. Your control.
                  </p>
                  <Link
                    href="/security"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>Read Data Ownership &amp; Security Architecture</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-7">
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    Here&apos;s how the setup works:
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {DATA_OWNERSHIP_POINTS.map((point, index) => {
                      const icons = [Database, Layers, ShieldCheck, Check, Lock];
                      const Icon = icons[index % icons.length];
                      return (
                        <li
                          key={point}
                          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#FAF9F6] px-4 py-3 text-sm text-slate-700"
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                          <span>{point}</span>
                        </li>
                      );
                    })}
                  </ul>

                  <p className="mt-5 text-xs leading-relaxed text-slate-500 italic">
                    The application operates through Google-authorized access. HisabSarthi&apos;s code can access the connected business data to perform its functions. Please review our privacy policy and authorization permissions before activation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 – WHO SHOULD USE HISABSARTHI? */}
        <section id="who-uses" className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
              <div className="lg:col-span-5">
                <ResilientImage
                  src={distributorOfficeImg}
                  alt="Indian wholesale and trading business owner reviewing accounting and inventory on a laptop"
                  caption="Built for Wholesalers, Distributors, Caterers & Traders"
                  className="aspect-[4/3] w-full lg:h-full"
                />
              </div>

              <div className="flex flex-col justify-center lg:col-span-7">
                <p className="text-xs font-semibold tracking-wide text-emerald-700">
                  Ideal Business Profiles
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                  Made for Businesses That Want Better Control.
                </h2>
                <p className="mt-3 text-base text-slate-600">
                  HisabSarthi is suitable for:
                </p>

                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TARGET_BUSINESSES.map((biz) => (
                    <li
                      key={biz}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-[#FAF9F6] px-4 py-3 text-sm font-medium text-[#0F172A]"
                    >
                      <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{biz}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm leading-relaxed text-slate-600">
                  If your business manages sales, purchases, inventory, customers and payments, HisabSarthi can help bring those operations together.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-200 pt-4 text-xs">
                  {SOLUTION_PAGES.map((sol) => (
                    <Link
                      key={sol.slug}
                      href={`/solutions/${sol.slug}`}
                      className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-4"
                    >
                      <span>{sol.title}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8.5 – DELHI NCR & NOIDA SMALL BUSINESS TESTIMONIALS */}
        <section
          id="testimonials"
          className="border-b border-slate-200/80 bg-[#F4F2EC]/70 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                Trusted by Small Businesses Across Delhi NCR &amp; Noida
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                What Local Shop Owners, Traders &amp; Suppliers Say About HisabSarthi.
              </h2>
              <p className="mt-3 text-base text-slate-600">
                From Noida Sector 63, Sector 18 and Greater Noida West to Laxmi Nagar, Okhla and Indirapuram—small business owners who moved from messy bill books and Excel sheets to one organized system.
              </p>
            </div>

            <IndianTestimonials />
          </div>
        </section>

        {/* SECTION 9 – PRICING (NEW YEAR OFFER + POST-NEW-YEAR SCHEDULE) */}
        <section id="pricing" className="border-b border-slate-200/80 bg-[#FAF9F6] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                New Year Limited-Time Offer · Save ₹5,000 on Lifetime
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                Lock In Lifetime Access at ₹4,999 Before New Year Offer Ends.
              </h2>
              <p className="mt-3 text-base text-slate-600">
                Grab lifetime access with free professional setup for ₹4,999 one-time today. After the New Year offer closes, standard plans apply—starting from ₹449/month, ₹2,199 semi-yearly, ₹2,999/year, and ₹9,999 for Lifetime.
              </p>
            </div>

            <PricingWhatsAppBox />

            <p className="mt-6 text-xs leading-relaxed text-slate-500 italic">
              Google account and internet connection required. Google service availability and Apps Script usage quotas apply. Additional customization, migration and services outside the included initial setup may be separately chargeable.
            </p>
          </div>
        </section>

        {/* SECTION 10 – 3-WAY SMB COMPARISON */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                Honest 3-Way SMB Comparison
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl [text-wrap:balance]">
                Why Small Businesses Switch from Excel &amp; Heavy Apps Like Tally, Busy or Vyapar
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                Don&apos;t pay recurring annual fees for complex modules you never open. Compare what your SMB actually gets every day.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-[#FAF9F6] text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Feature</th>
                    <th className="px-5 py-4 font-semibold">Manual Excel</th>
                    <th className="px-5 py-4 font-semibold text-slate-700">
                      Heavy Apps (Tally, Busy, Vyapar)
                    </th>
                    <th className="bg-emerald-50/70 px-5 py-4 font-semibold text-emerald-900">
                      HisabSarthi (Built for SMBs)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4 font-semibold text-[#0F172A]">
                        {row.feature}
                      </td>
                      <td className="px-5 py-4 text-slate-500">{row.excel}</td>
                      <td className="px-5 py-4 text-slate-600">
                        {row.heavyApps}
                      </td>
                      <td className="bg-emerald-50/35 px-5 py-4 font-medium text-emerald-900">
                        <span className="inline-flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{row.hisabSarthi}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Note: Tally, Busy and Vyapar are registered trademarks of their respective owners and remain good choices for large or CA-heavy organizations needing advanced enterprise modules. HisabSarthi is purpose-built for Indian SMBs who want streamlined daily operations without paying for unused bloat.
            </p>
          </div>
        </section>

        {/* SECTION 11 – FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="border-b border-slate-200/80 bg-[#FAF9F6] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold tracking-wide text-emerald-700">
                Answers to Common Questions
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                Frequently Asked Questions
              </h2>
            </div>

            <FaqAccordion />
          </div>
        </section>

        {/* SECTION 11.5 – PRACTICAL GUIDES & AEO KNOWLEDGE HUB */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wide text-emerald-700">
                  Practical Accounting &amp; Google Sheets Guides
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                  Learn How Automated Business Reporting Works
                </h2>
              </div>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 whitespace-nowrap shrink-0"
              >
                <BookOpen className="h-4 w-4" />
                <span>View All Guides</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {GUIDE_ARTICLES.slice(0, 3).map((guide) => (
                <article
                  key={guide.slug}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-[#FAF9F6] p-6 transition-colors hover:border-slate-300"
                >
                  <div>
                    <p className="text-xs font-semibold text-emerald-700">
                      {guide.category} · {guide.readingTime}
                    </p>
                    <h3 className="mt-2 font-display text-base font-bold text-[#0F172A]">
                      <Link
                        href={`/guides/${guide.slug}`}
                        className="hover:text-emerald-800 transition-colors"
                      >
                        {guide.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                      {guide.directAnswer}
                    </p>
                  </div>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0F172A] hover:text-emerald-700"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 12 – FINAL CTA */}
        <section className="bg-[#0F172A] py-16 text-white sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
              Stop Paying for Unused Software Features. Switch to Practical SMB Accounting.
            </h2>

            <div className="mx-auto mt-5 max-w-xl space-y-2 text-base text-slate-300">
              <p>No bloated enterprise menus like Tally, Busy or Vyapar that your team never opens.</p>
              <p>No scattered Excel files or manual stock mismatches.</p>
              <p className="pt-2 text-slate-200">
                Get only the exact billing, challan, stock, ledger, BRS and GST tools your small business actually uses every day.
              </p>
            </div>

            <p className="mt-5 text-sm font-medium text-emerald-400">
              And remember, you don&apos;t have to handle the technical setup. We do it for you.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-8 sm:px-10">
              <p className="text-xs font-semibold tracking-wide text-emerald-400 uppercase">
                New Year Limited-Time Offer · Regular Lifetime ₹9,999 After New Year
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Get HisabSarthi Lifetime for Just{' '}
                <span className="font-mono-num text-emerald-400">₹4,999</span>.
              </p>
              <p className="mt-2 text-sm text-slate-300">
                One-Time Payment · Lifetime Access · Free Professional Setup Included.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <TrackedLink
                  href={buyNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_cta_click"
                  eventLocation="final_cta"
                  eventLabel="final_buy_now_4999"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#059669] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#047857] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span>BUY NOW – ₹4,999</span>
                  <ArrowUpRight className="h-4 w-4" />
                </TrackedLink>

                <TrackedLink
                  href={talkTeamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_cta_click"
                  eventLocation="final_cta"
                  eventLabel="final_talk_whatsapp"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-700 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>TALK TO OUR TEAM ON WHATSAPP</span>
                </TrackedLink>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span>Call or WhatsApp Suraj Automation:</span>
                <TrackedLink
                  href={callUrl}
                  eventName="phone_call_click"
                  eventLocation="final_cta"
                  eventLabel="final_cta_call"
                  className="inline-flex items-center gap-1.5 font-mono-num font-semibold text-white underline decoration-slate-600 underline-offset-4 transition-colors hover:text-emerald-400 hover:decoration-emerald-400"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{WHATSAPP_CONFIG.displayPhone}</span>
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
