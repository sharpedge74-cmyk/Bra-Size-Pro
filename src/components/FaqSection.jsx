import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = ({ faq }) => {
  const [openIdx, setOpenIdx] = useState(0);

  if (!faq || faq.length === 0) return null;

  return (
    <section className="mt-12 bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs" aria-labelledby="faq-title">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 id="faq-title" className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[var(--color-text-subtle)] mt-0.5">
            Anatomically verified answers by certified fit specialists
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faq.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                isOpen
                  ? 'border-[var(--color-primary-border)] bg-[var(--color-primary-light)]'
                  : 'border-[var(--color-border-subtle)] bg-white hover:border-[var(--color-border)]'
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-hidden cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base font-semibold text-[var(--color-text-main)]">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[var(--color-text-subtle)] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-primary-border)]/40 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
