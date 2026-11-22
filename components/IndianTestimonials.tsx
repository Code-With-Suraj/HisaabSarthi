'use client';

import { useState } from 'react';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

type BusinessSegment = 'all' | 'noida' | 'delhi-ncr' | 'catering';

interface IndianTestimonial {
  id: string;
  name: string;
  initials: string;
  businessName: string;
  city: string;
  businessType: string;
  segments: Exclude<BusinessSegment, 'all'>[];
  outcome: string;
  quote: string;
  moduleUsed: string;
  accentTone: string;
}

const INDIAN_TESTIMONIALS: IndianTestimonial[] = [
  {
    id: 'deepak-gupta-noida-63',
    name: 'Deepak Gupta',
    initials: 'DG',
    businessName: 'Gupta Kirana & Office Provisions',
    city: 'Noida Sector 63, UP',
    businessType: 'Small Pantry & Wholesale Supplier',
    segments: ['noida', 'catering'],
    outcome: '18 daily Noida challans billed in 10 mins at month-end',
    quote:
      'We supply tea, sugar, oil and daily groceries to small offices around Sector 62 and 63 in Noida. Earlier I sat every Sunday matching paper challans in Excel and still missed quantities. Now HisabSarthi merges a full month of challans into one GST invoice in two clicks.',
    moduleUsed: 'Delivery Challans & Consolidated Invoicing',
    accentTone: 'bg-[#0F172A] text-white',
  },
  {
    id: 'sandeep-verma-greater-noida',
    name: 'Sandeep Verma',
    initials: 'SV',
    businessName: 'Verma Electricals & Hardware Store',
    city: 'Greater Noida West, UP',
    businessType: 'Local Hardware & Electrical Shop',
    segments: ['noida'],
    outcome: 'Recovered ₹2.4L pending contractor dues cleanly',
    quote:
      'We are a small 3-person electrical shop supplying local contractors in Greater Noida. Earlier we never knew which party payment was 60 days overdue until cash got tight. The 30/60/90-day Ageing Report and instant party ledger helped us follow up and recover ₹2.4 lakh quickly.',
    moduleUsed: 'Ageing Reports & Party Ledgers',
    accentTone: 'bg-emerald-800 text-white',
  },
  {
    id: 'rakesh-bansal-laxmi-nagar',
    name: 'Rakesh Bansal',
    initials: 'RB',
    businessName: 'Bansal Packaging & Tape House',
    city: 'Laxmi Nagar, East Delhi',
    businessType: 'Small B2B Packaging Trader',
    segments: ['delhi-ncr'],
    outcome: 'Zero annual renewal fees — full data in our Google Drive',
    quote:
      'Other accounting apps kept asking for yearly renewal charges even though our small shop only needed clean GST bills, stock count and party hisab. Taking HisabSarthi on a one-time lifetime setup on our own Google Drive removed renewal tension completely.',
    moduleUsed: 'GST Billing, Inventory & Google Drive Control',
    accentTone: 'bg-slate-800 text-white',
  },
  {
    id: 'anjali-chauhan-noida-18',
    name: 'Anjali Chauhan',
    initials: 'AC',
    businessName: 'Maa Annapurna Corporate Tiffins & Supply',
    city: 'Noida Sector 18, UP',
    businessType: 'Small Catering & Kitchen Supplier',
    segments: ['noida', 'catering'],
    outcome: 'Zero rate disputes across 9 Noida client sites',
    quote:
      'Every small office canteen negotiates slightly different rates for paneer, spices and vegetables. Earlier my billing helper made rate mistakes almost every week and clients held back payments. Custom client-wise and site-wise pricing in HisabSarthi picks the agreed rate automatically.',
    moduleUsed: 'Custom Client & Site Pricing',
    accentTone: 'bg-emerald-900 text-white',
  },
  {
    id: 'manoj-yadav-indirapuram',
    name: 'Manoj Kumar Yadav',
    initials: 'MY',
    businessName: 'Yadav Sanitary & Plumbing Traders',
    city: 'Indirapuram, Ghaziabad (NCR)',
    businessType: 'Small Sanitary & Pipe Shop',
    segments: ['delhi-ncr'],
    outcome: 'HDFC & SBI bank reconciliation finished before CA visit',
    quote:
      'Matching daily UPI, NEFT and party cheques across our HDFC Current and SBI accounts used to waste half a day every month before our CA visit. Uploading the bank CSV in HisabSarthi BRS auto-matches entries in seconds and lists uncleared cheques neatly.',
    moduleUsed: 'Multi-Bank Master & Smart BRS',
    accentTone: 'bg-[#0F172A] text-white',
  },
  {
    id: 'naveen-singhal-okhla',
    name: 'Naveen Singhal',
    initials: 'NS',
    businessName: 'Singhal Stationery & Office Mart',
    city: 'Okhla Phase II, South Delhi',
    businessType: 'Small Office Supply Shop',
    segments: ['delhi-ncr'],
    outcome: 'Live without any IT staff — full setup done on WhatsApp',
    quote:
      'I am not technical at all, so we ran on paper bill books and messy Excel sheets for six years. The Suraj Automation team set up our GST profile, Print A and Print B bill formats, and stock list—and guided my billing boy step by step on call and WhatsApp.',
    moduleUsed: 'Managed Setup, Dual Print & Low-Stock Alerts',
    accentTone: 'bg-slate-900 text-white',
  },
];

const SEGMENT_FILTERS: { id: BusinessSegment; label: string }[] = [
  { id: 'all', label: 'All Delhi NCR & Noida (6)' },
  { id: 'noida', label: 'Noida & Greater Noida' },
  { id: 'delhi-ncr', label: 'Delhi & Ghaziabad NCR' },
  { id: 'catering', label: 'Pantry & Catering Supply' },
];

export default function IndianTestimonials() {
  const [activeSegment, setActiveSegment] = useState<BusinessSegment>('all');

  const visibleItems =
    activeSegment === 'all'
      ? INDIAN_TESTIMONIALS
      : INDIAN_TESTIMONIALS.filter((item) =>
          item.segments.includes(activeSegment)
        );

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/90 pb-5">
        <div
          role="tablist"
          aria-label="Filter small business reviews by Delhi NCR region"
          className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5"
        >
          {SEGMENT_FILTERS.map((tab) => {
            const isActive = activeSegment === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSegment(tab.id)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                  isActive
                    ? 'bg-[#0F172A] text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <p className="text-xs font-medium text-slate-600">
          Small shops, local traders &amp; suppliers across Noida, Delhi &amp; NCR
        </p>
      </div>

      {/* 3-Column Editorial Testimonial Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <motion.article
            key={item.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-150 hover:border-slate-300"
          >
            <div>
              {/* Rating & Quote Icon Row */}
              <div className="flex items-center justify-between gap-3">
                <div
                  className="flex items-center gap-0.5 text-amber-500"
                  aria-label="5 out of 5 rating"
                >
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-500"
                    />
                  ))}
                </div>
                <Quote className="h-4 w-4 text-slate-300" aria-hidden="true" />
              </div>

              {/* Concrete Business Outcome Line */}
              <div className="mt-4 flex items-start gap-2 border-l-2 border-emerald-600 pl-3">
                <p className="text-xs font-bold leading-snug text-[#0F172A]">
                  {item.outcome}
                </p>
              </div>

              {/* Authentic Quote */}
              <blockquote className="mt-3.5 text-sm leading-relaxed text-slate-600">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            {/* Person & Business Footer */}
            <div className="mt-6 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold tracking-wide ${item.accentTone}`}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate font-display text-sm font-bold text-[#0F172A]">
                      {item.name}
                    </p>
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0 text-emerald-600"
                      aria-label="Verified small business user"
                    />
                  </div>
                  <p className="truncate text-xs font-medium text-slate-700">
                    {item.businessName}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-slate-500">
                    <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                    <span>
                      {item.city} · {item.businessType}
                    </span>
                  </p>
                </div>
              </div>

              <p className="mt-3 border-t border-slate-100 pt-2.5 text-[11px] font-medium text-emerald-700">
                Key workflow: {item.moduleUsed}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
