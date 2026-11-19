'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { WHATSAPP_CONFIG, buildCallUrl, buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Live Demo', href: '/#live-demo' },
  { label: 'Setup', href: '/how-it-works' },
  { label: 'Guides', href: '/guides' },
  { label: 'Pricing', href: '/#pricing' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const whatsappHref = buildWhatsAppUrl('header-get');

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#FAF9F6]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element Brand Lockup */}
        <Link
          href="/"
          aria-label="HisabSarthi Home"
          className="inline-flex items-center shrink-0 rounded-lg overflow-hidden ring-1 ring-slate-900/10 shadow-xs transition-opacity duration-150 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <Image
            src="/assets/aistudio/image_b899084e.png"
            alt="HisabSarthi — Smart Accounting"
            width={148}
            height={44}
            priority
            referrerPolicy="no-referrer"
            className="h-9 w-auto sm:h-10 block"
          />
        </Link>

        {/* Zone 2: 5 concise single-line nav links working across all routes */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#0F172A] hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('whatsapp_cta_click', {
                location: 'navbar',
                label: 'header_get_hisabsarthi',
              })
            }
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#059669] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#047857] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <span>Get HisabSarthi</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0F172A]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/security"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0F172A]"
            >
              Data Ownership &amp; Security
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_cta_click', {
                  location: 'mobile_nav',
                  label: 'mobile_get_hisabsarthi',
                });
                setMobileOpen(false);
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#059669] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#047857]"
            >
              <span>Get HisabSarthi Now</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={buildCallUrl()}
              onClick={() => {
                trackEvent('phone_call_click', {
                  location: 'mobile_nav',
                  label: 'mobile_call',
                });
                setMobileOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-slate-100"
            >
              <Phone className="h-4 w-4 text-emerald-700" />
              <span className="font-mono-num">Call {WHATSAPP_CONFIG.displayPhone}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
