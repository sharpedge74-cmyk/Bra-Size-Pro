import React, { useState } from 'react';
import { Tag, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { BRANDS_DATA } from '../../data/siteData';

interface Props {
  onNavigate: (path: string) => void;
}

export const BrandSizeConverterView: React.FC<Props> = ({ onNavigate }) => {
  const [baseBand, setBaseBand] = useState<number>(34);
  const [baseCup, setBaseCup] = useState<string>('D');
  const [selectedBrandId, setSelectedBrandId] = useState<string>('panache');

  const selectedBrand = BRANDS_DATA.find((b) => b.id === selectedBrandId) || BRANDS_DATA[0];

  let recommendedBand = baseBand;
  let recommendedCup = baseCup;
  let specificAdvice = selectedBrand.notes;

  if (selectedBrand.id === 'wacoal') {
    specificAdvice = 'Wacoal bands run firm with low elasticity. If you are sensitive to snugness, take your sister size with a band 2 inches larger.';
  } else if (selectedBrand.id === 'skims') {
    specificAdvice = 'Skims uses compressive sculpting fabrics that fit tightly. We suggest sizing up 1 band size for regular daily wear.';
    recommendedBand = baseBand + 2;
  } else if (selectedBrand.id === 'victorias-secret') {
    specificAdvice = 'Victoria\'s Secret bands are very stretchy. Clasp on the loosest hook when new so you can tighten it as it stretches.';
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">
          Select Your Baseline Size & Brand
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mb-6">
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
              Baseline Band
            </label>
            <input
              type="number"
              min={28}
              max={50}
              step={2}
              value={baseBand}
              onChange={(e) => setBaseBand(parseInt(e.target.value) || 34)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
              Baseline Cup
            </label>
            <select
              value={baseCup}
              onChange={(e) => setBaseCup(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
            >
              {['B', 'C', 'D', 'DD', 'DDD/F', 'G', 'H', 'I', 'J'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
              Target Brand
            </label>
            <select
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
            >
              {BRANDS_DATA.map((b) => (
                <option key={b.id} value={b.id}>{b.name} ({b.system})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Brand Profile Quick Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {BRANDS_DATA.map((brand) => {
            const isSelected = brand.id === selectedBrandId;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrandId(brand.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] font-bold shadow-xs'
                    : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas)] hover:border-[var(--color-border)] text-[var(--color-text-muted)]'
                }`}
              >
                <div className="text-xs text-[var(--color-text-main)]">{brand.name}</div>
                <div className="text-[10px] text-[var(--color-text-subtle)] font-normal">{brand.origin} &middot; {brand.system}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Translation Result */}
      <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
          Recommended Size for {selectedBrand.name}
        </span>
        <div className="font-serif-brand text-4xl sm:text-5xl font-extrabold text-[var(--color-text-main)] mt-1 mb-4">
          {recommendedBand}{recommendedCup}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white p-3 rounded-xl border border-[var(--color-border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--color-text-subtle)] uppercase">Band Elasticity</span>
            <div className="text-sm font-bold text-[var(--color-text-main)] mt-0.5">{selectedBrand.bandFit}</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[var(--color-border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--color-text-subtle)] uppercase">Cup Projection</span>
            <div className="text-sm font-bold text-[var(--color-text-main)] mt-0.5">{selectedBrand.cupDepth}</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[var(--color-border-subtle)]">
            <span className="text-[10px] font-bold text-[var(--color-text-subtle)] uppercase">Sizing Standard</span>
            <div className="text-sm font-bold text-[var(--color-text-main)] mt-0.5">{selectedBrand.system} Sizing</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-[var(--color-border)]">
          <strong className="text-xs uppercase tracking-wider text-[var(--color-text-main)]">
            Fitter's Technical Sizing Advice:
          </strong>
          <p className="text-sm text-[var(--color-text-muted)] mt-1 leading-relaxed">
            {specificAdvice}
          </p>
        </div>
      </div>
    </div>
  );
};
