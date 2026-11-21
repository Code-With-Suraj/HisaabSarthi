import { ArrowUpRight, MessageCircle, Phone, Play } from 'lucide-react';
import TrackedLink from '@/components/TrackedLink';
import {
  LIVE_DEMO_URL,
  WHATSAPP_CONFIG,
  buildCallUrl,
  buildWhatsAppUrl,
} from '@/lib/whatsapp';

interface SubpageCtaProps {
  contextLabel: string;
  heading?: string;
  subcopy?: string;
}

export default function SubpageCta({
  contextLabel,
  heading = 'Get HisabSarthi for ₹4,999 — Lifetime Access & Free Setup',
  subcopy = 'One-time payment. No monthly subscription. Suraj Automation Team sets up your dedicated Google Sheets database and guides your onboarding.',
}: SubpageCtaProps) {
  const buyNowUrl = buildWhatsAppUrl('buy-setup');
  const callUrl = buildCallUrl();

  return (
    <section className="rounded-2xl border border-slate-200 bg-[#0F172A] p-7 text-white sm:p-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold tracking-wide text-emerald-400">
            HisabSarthi by Suraj Automation · ₹4,999 One-Time Payment
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
            {heading}
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
            {subcopy}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 lg:col-span-5">
          <TrackedLink
            href={buyNowUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventName="whatsapp_cta_click"
            eventLocation={contextLabel}
            eventLabel="subpage_buy_whatsapp"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#059669] px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#047857] whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span>Confirm Setup on WhatsApp</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </TrackedLink>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <TrackedLink
              href={callUrl}
              eventName="phone_call_click"
              eventLocation={contextLabel}
              eventLabel="subpage_call"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-slate-500 hover:bg-slate-700 whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-400" />
              <span className="font-mono-num">{WHATSAPP_CONFIG.displayPhone}</span>
            </TrackedLink>

            <TrackedLink
              href={LIVE_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              eventName="demo_interaction"
              eventLocation={contextLabel}
              eventLabel="subpage_open_live_demo"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-white whitespace-nowrap"
            >
              <Play className="h-3.5 w-3.5 text-emerald-400" />
              <span>Open Live Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
