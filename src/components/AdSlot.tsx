import React from 'react';

interface AdSlotProps {
  slot: 'top_banner' | 'sidebar' | 'in_content';
  dimensions?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, dimensions = '728x90 / Responsive' }) => {
  return (
    <aside className="my-6 w-full flex flex-col items-center" aria-label="Sponsored Content">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-1">
        Sponsored Placement
      </span>
      <div className={`w-full max-w-3xl rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 text-center ${
        slot === 'sidebar' ? 'min-h-[250px] flex flex-col items-center justify-center' : ''
      }`}>
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-xs font-semibold text-[var(--color-text-muted)]">
            IMRango Ethical Fitting Partner
          </span>
          <span className="text-[11px] font-mono text-[var(--color-text-subtle)]">
            {slot === 'sidebar' ? '300x600 Display' : dimensions}
          </span>
        </div>
      </div>
    </aside>
  );
};
