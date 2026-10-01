import React, { useState } from 'react';
import { ArrowLeftRight, Ruler } from 'lucide-react';
import { SIZES_DATA } from '../../data/siteData';

interface Props {
  onNavigate: (path: string) => void;
}

export const BraSizeToMeasurementsView: React.FC<Props> = ({ onNavigate }) => {
  const [band, setBand] = useState<number>(34);
  const [cup, setCup] = useState<string>('D');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  const cupIdx = SIZES_DATA.cupProgressionUS.indexOf(cup);
  const diffInches = cupIdx >= 0 ? cupIdx : 4;

  let minUnder = band - 1;
  let maxUnder = band + 1;
  let minBust = band + diffInches - 0.5;
  let maxBust = band + diffInches + 0.5;

  if (unit === 'cm') {
    minUnder = Math.round(minUnder * 2.54);
    maxUnder = Math.round(maxUnder * 2.54);
    minBust = Math.round(minBust * 2.54);
    maxBust = Math.round(maxBust * 2.54);
  }

  const unitLabel = unit === 'cm' ? 'cm' : 'in';

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">
          Enter Any Bra Size
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
              Band Size
            </label>
            <input
              type="number"
              min={28}
              max={52}
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
              {SIZES_DATA.cupProgressionUS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">
              Measurement Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
            >
              <option value="inches">Inches (in)</option>
              <option value="cm">Centimeters (cm)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
          Target Anatomical Dimensions for {band}{cup}
        </span>
        <div className="font-serif-brand text-4xl font-bold text-[var(--color-text-main)] mt-1 mb-6">
          Size {band}{cup} Specifications
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-[var(--color-border-subtle)]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
              Snug Ribcage Underbust
            </span>
            <div className="text-2xl font-bold text-[var(--color-text-main)] mt-1">
              {minUnder} - {maxUnder} {unitLabel}
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Direct ribcage circumference where band rests.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[var(--color-border-subtle)]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
              Full Bust Circumference
            </span>
            <div className="text-2xl font-bold text-[var(--color-text-main)] mt-1">
              {minBust} - {maxBust} {unitLabel}
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Total circumference across the apex of the breasts.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[var(--color-border-subtle)]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
              Cup Volume Difference
            </span>
            <div className="text-2xl font-bold text-[var(--color-primary)] mt-1">
              {unit === 'cm' ? Math.round(diffInches * 2.54) + ' cm' : diffInches + ' in'}
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
              Difference between bust and underbust.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
