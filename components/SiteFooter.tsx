import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import { WHATSAPP_CONFIG, buildCallUrl, buildWhatsAppUrl } from '@/lib/whatsapp';
import { FEATURE_PAGES, SOLUTION_PAGES, GUIDE_ARTICLES } from '@/lib/seo-pages-data';

export default function SiteFooter() {
  const talkTeamUrl = buildWhatsAppUrl('team-chat');
  const callUrl = buildCallUrl();

  return (
    <footer className="border-t border-slate-800 bg-[#0B1120] py-14 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Direct Contact */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="HisabSarthi Home"
              className="inline-flex overflow-hidden rounded-lg border border-white/10"
            >
              <Image
                src="/assets/aistudio/image_b899084e.png"
                alt="HisabSarthi — Smart Accounting"
                width={148}
                height={44}
                referrerPolicy="no-referrer"
                className="h-9 w-auto block"
              />
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Smart accounting, inventory, delivery challan, ageing, and GST summary reporting software built on Google Sheets and Google Apps Script by{' '}
              <span className="font-medium text-slate-200">Suraj Automation</span>.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-xs">
              <TrackedLink
                href={callUrl}
                eventName="phone_call_click"
                eventLocation="footer"
                eventLabel="footer_call"
                className="inline-flex items-center gap-2 font-mono-num font-medium text-slate-200 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-emerald-400" />
                <span>Call {WHATSAPP_CONFIG.displayPhone}</span>
              </TrackedLink>
              <TrackedLink
                href={talkTeamUrl}
                target="_blank"
                rel="noopener noreferrer"
                eventName="whatsapp_cta_click"
                eventLocation="footer"
                eventLabel="footer_whatsapp"
                className="inline-flex items-center gap-2 font-medium text-emerald-400 transition-colors hover:text-emerald-300"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp Support &amp; Setup Confirmation</span>
              </TrackedLink>
            </div>
          </div>

          {/* Core Features Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs font-semibold tracking-wide text-white">
              Features
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              {FEATURE_PAGES.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/features/${item.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Trust Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xs font-semibold tracking-wide text-white">
              Solutions &amp; Setup
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              {SOLUTION_PAGES.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/how-it-works"
                  className="transition-colors hover:text-white"
                >
                  How Setup Works
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="transition-colors hover:text-white"
                >
                  Data Ownership &amp; Security
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="transition-colors hover:text-white"
                >
                  Lifetime Pricing (₹4,999)
                </Link>
              </li>
            </ul>
          </div>

          {/* AEO Knowledge Guides */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-xs font-semibold tracking-wide text-white">
              Guides &amp; Resources
            </h3>
            <ul className="mt-3.5 space-y-2 text-xs">
              <li>
                <Link
                  href="/guides"
                  className="font-medium text-slate-200 transition-colors hover:text-white"
                >
                  All Accounting &amp; MIS Guides
                </Link>
              </li>
              {GUIDE_ARTICLES.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="line-clamp-1 transition-colors hover:text-white"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} HisabSarthi (HisaabSarthi) by Suraj Automation. Smart Accounting. Better Business Control.
          </p>
          <p>
            GST reports are for accounting review and reconciliation; automatic GST portal filing is not included.
          </p>
        </div>
      </div>
    </footer>
  );
}
