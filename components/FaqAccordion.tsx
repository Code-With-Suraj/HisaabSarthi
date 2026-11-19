'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '@/lib/hisab-data';

export default function FaqAccordion() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-5': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allOpen = FAQ_ITEMS.every((item) => openIds[item.id]);

  const toggleAll = () => {
    if (allOpen) {
      setOpenIds({});
    } else {
      const next: Record<string, boolean> = {};
      FAQ_ITEMS.forEach((item) => {
        next[item.id] = true;
      });
      setOpenIds(next);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={toggleAll}
          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          {allOpen ? 'Collapse All Questions' : 'Expand All Questions'}
        </button>
      </div>

      <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {FAQ_ITEMS.map((item) => {
          const isOpen = Boolean(openIds[item.id]);
          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600"
              >
                <span className="font-display text-base font-semibold text-[#0F172A]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-700' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${item.id}-panel`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="px-6 pb-5 pt-0 text-sm leading-relaxed text-slate-600"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
