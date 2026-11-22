'use client';

import { useState } from 'react';
import {
  Check,
  MessageCircle,
  Copy,
  CheckCheck,
  ArrowUpRight,
  Phone,
  Clock,
  Gift,
  Calendar,
  CalendarRange,
  Star,
  Rocket,
} from 'lucide-react';
import { PRICING_INCLUDED } from '@/lib/hisab-data';
import {
  WHATSAPP_CONFIG,
  buildCallUrl,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';

const POST_NEW_YEAR_PLANS = [
  {
    name: 'Free Trial',
    price: '₹0',
    sublabel: '14 Days',
    note: 'Try core workflows before subscribing',
    icon: Gift,
    accent: 'text-slate-600',
    highlight: false,
  },
  {
    name: 'Monthly',
    price: '₹449',
    sublabel: 'per month',
    note: 'Standard monthly billing',
    icon: Calendar,
    accent: 'text-emerald-700',
    highlight: false,
  },
  {
    name: 'Semi-Yearly',
    price: '₹2,199',
    sublabel: '₹367 / mo',
    note: 'Billed every 6 months',
    icon: CalendarRange,
    accent: 'text-indigo-700',
    highlight: false,
  },
  {
    name: 'Yearly',
    price: '₹2,999',
    sublabel: '₹249.92 / mo',
    note: 'Annual subscription plan',
    icon: Star,
    accent: 'text-amber-600',
    highlight: false,
  },
  {
    name: 'Lifetime',
    price: '₹9,999',
    sublabel: 'One-time',
    note: '₹4,999 right now in New Year Offer',
    icon: Rocket,
    accent: 'text-emerald-700',
    highlight: true,
  },
];

export default function PricingWhatsAppBox() {
  const [contactName, setContactName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [city, setCity] = useState('');
  const [copied, setCopied] = useState(false);

  const customDetails = { contactName, businessName, city };
  const whatsappUrl = buildWhatsAppUrl('buy-setup', customDetails);
  const previewMessage = buildWhatsAppMessage('buy-setup', customDetails);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(previewMessage);
      trackEvent('pricing_message_copy', {
        location: 'pricing_box',
        label: 'copy_whatsapp_text',
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Main New Year Offer Card + Instant WhatsApp Confirmation */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
        {/* Left 7 Columns: ₹4,999 New Year Limited-Time Offer & Deliverables */}
        <div className="flex flex-col justify-between rounded-2xl border-2 border-emerald-600/30 bg-white p-8 sm:p-10 lg:col-span-7">
          <div>
            {/* Clean New Year Offer Strip */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-emerald-700 uppercase">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span>New Year Offer · Limited-Time Lifetime Deal</span>
              </p>
              <span className="font-mono-num text-xs font-semibold text-rose-700">
                Save ₹5,000 before regular pricing starts
              </span>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  New Year Special · Lifetime Software Access
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-3">
                  <span className="font-mono-num text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
                    ₹4,999
                  </span>
                  <span className="font-mono-num text-lg text-slate-400 line-through">
                    ₹9,999
                  </span>
                  <span className="text-xs font-bold text-emerald-700">
                    50% OFF Regular Lifetime
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm font-semibold text-emerald-700">
                  ONE-TIME PAYMENT
                </p>
                <p className="text-xs text-slate-500">
                  No Monthly Fee · Free Professional Setup
                </p>
              </div>
            </div>

            <h3 className="mt-6 font-display text-base font-semibold text-[#0F172A]">
              Everything Included in the ₹4,999 New Year Lifetime Offer:
            </h3>

            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRICING_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    strokeWidth={2.2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="font-display text-lg font-bold text-[#0F172A]">
              Pay ₹4,999 Once During New Year Offer. Skip All Future Renewals.
            </p>
            <p className="mt-1 text-sm font-medium text-emerald-700">
              After the New Year offer ends, Lifetime moves to ₹9,999 and recurring plans start at ₹449/mo.
            </p>
          </div>
        </div>

        {/* Right 5 Columns: Automatic WhatsApp Setup Confirmation Box */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#0F172A] p-8 text-white sm:p-10 lg:col-span-5">
          <div>
            <p className="text-xs font-medium tracking-wide text-emerald-400">
              Lock In New Year Offer · Instant WhatsApp Setup
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
              Claim ₹4,999 Lifetime Setup on WhatsApp
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Clicking below opens WhatsApp with a pre-filled New Year Offer confirmation for Suraj Automation Team. Optionally add your details first:
            </p>

            <div className="mt-5 space-y-3.5">
              <div>
                <label
                  htmlFor="wa-contact-name"
                  className="mb-1 block text-xs font-medium text-slate-300"
                >
                  Your Name (Optional)
                </label>
                <input
                  id="wa-contact-name"
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g., Deepak Gupta"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="wa-business-name"
                  className="mb-1 block text-xs font-medium text-slate-300"
                >
                  Business Name (Optional)
                </label>
                <input
                  id="wa-business-name"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Verma Electricals & Hardware"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label
                  htmlFor="wa-city"
                  className="mb-1 block text-xs font-medium text-slate-300"
                >
                  City / Area (Optional)
                </label>
                <input
                  id="wa-city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Noida / Delhi NCR"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('whatsapp_cta_click', {
                  location: 'pricing_box',
                  label: 'pricing_new_year_offer_4999',
                  value: 4999,
                })
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#059669] px-5 py-3.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#047857] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span>CLAIM NEW YEAR OFFER – ₹4,999</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" />
            </a>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <a
                href={buildCallUrl()}
                onClick={() =>
                  trackEvent('phone_call_click', {
                    location: 'pricing_box',
                    label: 'pricing_call',
                  })
                }
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-emerald-500/60 hover:bg-slate-800 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span className="font-mono-num">
                  Call {WHATSAPP_CONFIG.displayPhone}
                </span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                {copied ? (
                  <>
                    <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Message copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy WhatsApp text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post-New-Year Standard Pricing Schedule */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Upcoming Standard Pricing Schedule
            </p>
            <h3 className="mt-1 font-display text-lg font-bold text-[#0F172A] sm:text-xl">
              Limited-Time Offer — Standard Plans Applicable After New Year
            </h3>
          </div>
          <p className="text-xs font-semibold text-emerald-700">
            Today&apos;s New Year Lifetime price (₹4,999) saves ₹5,000 vs standard Lifetime
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {POST_NEW_YEAR_PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`flex flex-col justify-between rounded-xl border p-4 ${
                  plan.highlight
                    ? 'border-emerald-600/40 bg-emerald-50/40'
                    : 'border-slate-200 bg-[#FAF9F6]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-[#0F172A]">
                      {plan.name}
                    </span>
                    <Icon className={`h-4 w-4 shrink-0 ${plan.accent}`} />
                  </div>

                  <div className="mt-3 flex items-baseline gap-1.5">
                    <span
                      className={`font-mono-num text-2xl font-bold tracking-tight ${
                        plan.highlight
                          ? 'text-slate-400 line-through'
                          : 'text-[#0F172A]'
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="font-mono-num text-xs font-medium text-slate-500">
                      {plan.sublabel}
                    </span>
                  </div>

                  {plan.highlight && (
                    <p className="mt-1 font-mono-num text-base font-bold text-emerald-700">
                      ₹4,999{' '}
                      <span className="font-sans text-[11px] font-semibold">
                        New Year Offer
                      </span>
                    </p>
                  )}
                </div>

                <p className="mt-3 border-t border-slate-200/80 pt-2.5 text-[11px] leading-relaxed text-slate-600">
                  {plan.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
