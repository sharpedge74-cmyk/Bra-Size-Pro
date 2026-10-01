import React, { useState } from 'react';
import { Sparkles, Info, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { SIZES_DATA } from '../../data/siteData';

interface Props {
  onNavigate: (path: string) => void;
}

export const SisterSizeCalculatorView: React.FC<Props> = ({ onNavigate }) => {
  const [band, setBand] = useState<number>(34);
  const [cup, setCup] = useState<string>('D');
  const [system, setSystem] = useState<'us' | 'uk' | 'eu'>('us');

  const cupList = system === 'uk' ? SIZES_DATA.cupProgressionUK : (system === 'eu' ? SIZES_DATA.cupProgressionEU : SIZES_DATA.cupProgressionUS);
  const cupIdx = cupList.indexOf(cup);

  const sisterMatrix = [];
  if (cupIdx !== -1) {
    if (band >= 32 && cupIdx + 2 < cupList.length) {
      sisterMatrix.push({ band: band - 4, cup: cupList[cupIdx + 2], label: 'Firmest Band (-2 bands, +2 cups)', notes: 'Very tight anchor for heavy breasts, athletic use, or stretchy fabrics.' });
    }
    if (band >= 30 && cupIdx + 1 < cupList.length) {
      sisterMatrix.push({ band: band - 2, cup: cupList[cupIdx + 1], label: 'Snugger Band (-1 band, +1 cup)', notes: 'RECOMMENDED if your band rides up your back or straps dig in.' });
    }
    sisterMatrix.push({ band: band, cup: cupList[cupIdx], label: 'Current Starting Size', notes: 'Your reference fit baseline.', isCurrent: true });
    if (band <= 48 && cupIdx - 1 >= 0) {
      sisterMatrix.push({ band: band + 2, cup: cupList[cupIdx - 1], label: 'Looser Band (+1 band, -1 cup)', notes: 'RECOMMENDED if band pinches ribs, or for stiff non-stretch brands.' });
    }
    if (band <= 46 && cupIdx - 2 >= 0) {
      sisterMatrix.push({ band: band + 4, cup: cupList[cupIdx - 2], label: 'Relaxed Band (+2 bands, -2 cups)', notes: 'Very relaxed lounge fit; least load-bearing capability.' });
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">
          Select Your Reference Bra Size
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
              Band Size
            </label>
            <input
              type="number"
              min={28}
              max={50}
              step={2}
              value={band}
              onChange={(e) => setBand(parseInt(e.target.value) || 34)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
              Cup Letter
            </label>
            <select
              value={cup}
              onChange={(e) => setCup(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
            >
              {cupList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
              System
            </label>
            <select
              value={system}
              onChange={(e) => setSystem(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
            >
              <option value="us">US / Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="eu">European Union</option>
            </select>
          </div>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)]">
              Sister Sizes for {band}{cup}
            </h4>
            <p className="text-xs text-[var(--color-text-subtle)] mt-1">
              Every single size in this list holds the exact same cubic volume of breast tissue.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
            <Sparkles className="w-3.5 h-3.5" /> Volumetric Equivalence
          </span>
        </div>

        <div className="space-y-3 mt-6">
          {sisterMatrix.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                item.isCurrent
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] ring-2 ring-[var(--color-primary)]/20'
                  : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas)] hover:border-[var(--color-border)]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)] w-20">
                  {item.band}{item.cup}
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)]">
                    {item.label}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {item.notes}
                  </div>
                </div>
              </div>

              {item.isCurrent && (
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-primary)] text-white self-start sm:self-center">
                  Current
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
