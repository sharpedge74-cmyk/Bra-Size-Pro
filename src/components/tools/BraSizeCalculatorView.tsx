import React, { useState, useEffect } from 'react';
import { Ruler, Sparkles, Info, CheckCircle2, ChevronRight, Sliders } from 'lucide-react';
import { SIZES_DATA } from '../../data/siteData';

interface Props {
  onNavigate: (path: string) => void;
}

export const BraSizeCalculatorView: React.FC<Props> = ({ onNavigate }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [mode, setMode] = useState<'quick' | 'detailed'>('detailed');
  const [system, setSystem] = useState<'us' | 'uk' | 'eu' | 'au'>('us');

  // Measurements in inches internally
  const [snugUnder, setSnugUnder] = useState<number>(32);
  const [tightUnder, setTightUnder] = useState<number>(30.5);
  const [looseUnder, setLooseUnder] = useState<number>(32.5);

  const [standingBust, setStandingBust] = useState<number>(36);
  const [leaningBust, setLeaningBust] = useState<number>(37.5);
  const [lyingBust, setLyingBust] = useState<number>(36);

  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('imrango_data_calc_inputs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.snugUnder) setSnugUnder(parsed.snugUnder);
        if (parsed.standingBust) setStandingBust(parsed.standingBust);
      }
    } catch (e) {}
  }, []);

  const handleSaveToStorage = (data: object) => {
    try {
      localStorage.setItem('imrango_data_calc_inputs', JSON.stringify(data));
    } catch (e) {}
  };

  // Sizing Calculation Logic
  const calculateResult = () => {
    let effectiveUnder = snugUnder;
    let effectiveBust = standingBust;

    if (mode === 'detailed') {
      // If tight is significantly smaller, torso has squish factor
      effectiveUnder = snugUnder;
      // Leaning bust captures projection, especially if soft or uneven
      if (leaningBust && lyingBust) {
        effectiveBust = (standingBust + leaningBust * 1.5 + lyingBust) / 3.5;
      }
    }

    // Band size: modern direct snug underbust rounded to closest even number
    let band = Math.round(effectiveUnder);
    if (band % 2 !== 0) {
      // Check tight: if tight is far lower, go down to smaller even band
      if (effectiveUnder - tightUnder > 1.75) {
        band -= 1;
      } else {
        band += 1;
      }
    }
    band = Math.max(28, Math.min(52, band));

    // Cup difference
    const diff = Math.max(0, effectiveBust - effectiveUnder);
    const cupIdx = Math.min(Math.round(diff), SIZES_DATA.cupProgressionUK.length - 1);

    const usCup = SIZES_DATA.cupProgressionUS[cupIdx] || 'D';
    const ukCup = SIZES_DATA.cupProgressionUK[cupIdx] || 'D';
    const euCup = SIZES_DATA.cupProgressionEU[cupIdx] || 'D';

    const euBand = Math.round(band * 2.54 / 5) * 5 - 10;
    const auBand = Math.max(6, band - 22);

    let displaySize = `${band}${usCup}`;
    if (system === 'uk') displaySize = `${band}${ukCup}`;
    if (system === 'eu') displaySize = `${Math.max(60, euBand)}${euCup}`;
    if (system === 'au') displaySize = `${auBand}${ukCup}`;

    // Sister sizes
    const tighterSister = band > 28 && cupIdx < SIZES_DATA.cupProgressionUS.length - 1
      ? `${band - 2}${SIZES_DATA.cupProgressionUS[cupIdx + 1]}`
      : null;
    const looserSister = band < 50 && cupIdx > 0
      ? `${band + 2}${SIZES_DATA.cupProgressionUS[cupIdx - 1]}`
      : null;

    return {
      band,
      diff: diff.toFixed(1),
      displaySize,
      usSize: `${band}${usCup}`,
      ukSize: `${band}${ukCup}`,
      euSize: `${Math.max(60, euBand)}${euCup}`,
      auSize: `${auBand}${ukCup}`,
      tighterSister,
      looserSister,
    };
  };

  const result = calculateResult();

  const toDisplayVal = (valInches: number) => {
    if (unit === 'cm') return (valInches * 2.54).toFixed(1);
    return valInches.toFixed(1);
  };

  const fromDisplayVal = (displayVal: number) => {
    if (unit === 'cm') return displayVal / 2.54;
    return displayVal;
  };

  const handleCalculateClick = () => {
    setHasCalculated(true);
    handleSaveToStorage({ snugUnder, standingBust, leaningBust });
  };

  return (
    <div className="space-y-8">
      {/* Configuration Bar */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Unit Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-subtle)] uppercase tracking-wider">Unit:</span>
          <div className="inline-flex p-1 bg-[var(--color-bg-subtle)] rounded-xl">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                unit === 'inches'
                  ? 'bg-white text-[var(--color-primary)] shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                unit === 'cm'
                  ? 'bg-white text-[var(--color-primary)] shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-subtle)] uppercase tracking-wider">Method:</span>
          <div className="inline-flex p-1 bg-[var(--color-bg-subtle)] rounded-xl">
            <button
              onClick={() => setMode('quick')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mode === 'quick'
                  ? 'bg-white text-[var(--color-primary)] shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              Quick (2 Points)
            </button>
            <button
              onClick={() => setMode('detailed')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mode === 'detailed'
                  ? 'bg-white text-[var(--color-primary)] shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
              }`}
            >
              Precision (6 Points)
            </button>
          </div>
        </div>

        {/* System Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--color-text-subtle)] uppercase tracking-wider">System:</span>
          <select
            value={system}
            onChange={(e) => setSystem(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-white text-xs font-semibold text-[var(--color-text-main)] focus:outline-hidden focus:border-[var(--color-primary)]"
          >
            <option value="us">US / Canada</option>
            <option value="uk">United Kingdom (UK)</option>
            <option value="eu">European Union (EU)</option>
            <option value="au">Australia / NZ (AU)</option>
          </select>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
        <div className="space-y-6">
          
          {/* Section 1: Underbust */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-brand text-lg font-bold text-[var(--color-text-main)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs flex items-center justify-center font-bold">1</span>
                Underbust Ribcage Measurements
              </h3>
              <span className="text-xs text-[var(--color-text-subtle)]">
                Tape held level beneath inframammary fold
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Snug */}
              <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                <div className="flex justify-between items-baseline mb-1">
                  <label className="text-xs font-bold text-[var(--color-text-main)]">
                    Snug Underbust
                  </label>
                  <span className="text-[11px] text-[var(--color-text-subtle)]">Primary anchor</span>
                </div>
                <div className="relative mt-2">
                  <input
                    type="number"
                    step={unit === 'cm' ? '0.5' : '0.25'}
                    value={toDisplayVal(snugUnder)}
                    onChange={(e) => setSnugUnder(fromDisplayVal(parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[var(--color-text-subtle)]">{unit}</span>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-2">
                  How tight you want your band to feel comfortably on its loosest clasp hook.
                </p>
              </div>

              {/* Tight */}
              {mode === 'detailed' && (
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="text-xs font-bold text-[var(--color-text-main)]">
                      Tight Underbust
                    </label>
                    <span className="text-[11px] text-[var(--color-text-subtle)]">Fully exhaled</span>
                  </div>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      step={unit === 'cm' ? '0.5' : '0.25'}
                      value={toDisplayVal(tightUnder)}
                      onChange={(e) => setTightUnder(fromDisplayVal(parseFloat(e.target.value) || 0))}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-[var(--color-text-subtle)]">{unit}</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-2">
                    Pulled as tight as humanly possible to gauge ribcage compression.
                  </p>
                </div>
              )}

              {/* Loose */}
              {mode === 'detailed' && (
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="text-xs font-bold text-[var(--color-text-main)]">
                      Loose Underbust
                    </label>
                    <span className="text-[11px] text-[var(--color-text-subtle)]">Resting skin</span>
                  </div>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      step={unit === 'cm' ? '0.5' : '0.25'}
                      value={toDisplayVal(looseUnder)}
                      onChange={(e) => setLooseUnder(fromDisplayVal(parseFloat(e.target.value) || 0))}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-[var(--color-text-subtle)]">{unit}</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-2">
                    Snug without indenting or squeezing skin tissue at all.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Bust */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-brand text-lg font-bold text-[var(--color-text-main)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs flex items-center justify-center font-bold">2</span>
                Bust Circumference
              </h3>
              <span className="text-xs text-[var(--color-text-subtle)]">
                Measured braless or in an unlined, unpadded bra
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Standing */}
              <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                <div className="flex justify-between items-baseline mb-1">
                  <label className="text-xs font-bold text-[var(--color-text-main)]">
                    Standing Bust
                  </label>
                  <span className="text-[11px] text-[var(--color-text-subtle)]">Fullest point</span>
                </div>
                <div className="relative mt-2">
                  <input
                    type="number"
                    step={unit === 'cm' ? '0.5' : '0.25'}
                    value={toDisplayVal(standingBust)}
                    onChange={(e) => setStandingBust(fromDisplayVal(parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[var(--color-text-subtle)]">{unit}</span>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] mt-2">
                  Standing upright, tape horizontal across the fullest apex of breasts.
                </p>
              </div>

              {/* Leaning 90 deg */}
              {mode === 'detailed' && (
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="text-xs font-bold text-[var(--color-text-main)]">
                      Leaning Bust (90&deg;)
                    </label>
                    <span className="text-[11px] text-[var(--color-text-subtle)]">Captures projection</span>
                  </div>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      step={unit === 'cm' ? '0.5' : '0.25'}
                      value={toDisplayVal(leaningBust)}
                      onChange={(e) => setLeaningBust(fromDisplayVal(parseFloat(e.target.value) || 0))}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-[var(--color-text-subtle)]">{unit}</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-2">
                    Bent 90 degrees at hips; vital for soft tissue and true cup depth.
                  </p>
                </div>
              )}

              {/* Lying */}
              {mode === 'detailed' && (
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <div className="flex justify-between items-baseline mb-1">
                    <label className="text-xs font-bold text-[var(--color-text-main)]">
                      Lying Bust
                    </label>
                    <span className="text-[11px] text-[var(--color-text-subtle)]">Flat on back</span>
                  </div>
                  <div className="relative mt-2">
                    <input
                      type="number"
                      step={unit === 'cm' ? '0.5' : '0.25'}
                      value={toDisplayVal(lyingBust)}
                      onChange={(e) => setLyingBust(fromDisplayVal(parseFloat(e.target.value) || 0))}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm focus:outline-hidden focus:border-[var(--color-primary)]"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-[var(--color-text-subtle)]">{unit}</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-2">
                    Lying flat; measures how breast tissue naturally settles outward.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleCalculateClick}
              className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Recalculate Size & Save
            </button>
            <span className="text-xs text-[var(--color-text-subtle)] hidden sm:inline">
              Data stays private in your browser
            </span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      {hasCalculated && (
        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--color-primary-border)]/60">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Recommended Starting Size ({system.toUpperCase()})
              </span>
              <div className="font-serif-brand text-4xl sm:text-5xl font-extrabold text-[var(--color-text-main)] mt-1 tracking-tight">
                {result.displaySize}
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-xl">
                Calculated with direct snug underbust measurement ({snugUnder}" band anchor) and a {result.diff}" bust volume differential.
              </p>
            </div>

            {/* Visual physics pill */}
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 max-w-xs shrink-0 text-xs text-[var(--color-text-muted)] space-y-2">
              <div className="flex items-center justify-between font-bold text-[var(--color-text-main)]">
                <span>Support Load Distribution</span>
                <span className="text-[var(--color-primary)]">85% / 15%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden flex">
                <div className="bg-[var(--color-primary)] h-full w-[85%]" title="85% Band Anchor"></div>
                <div className="bg-slate-400 h-full w-[15%]" title="15% Shoulder Straps"></div>
              </div>
              <p className="text-[11px] leading-tight text-[var(--color-text-subtle)]">
                Your band carries 85% of breast weight. Your shoulders are completely protected from pain.
              </p>
            </div>
          </div>

          {/* Regional Equivalents */}
          <div className="pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] mb-3">
              International Size Equivalents
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[10px] font-bold text-[var(--color-text-subtle)] uppercase">US / Canada</span>
                <div className="text-lg font-bold text-[var(--color-text-main)]">{result.usSize}</div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[10px] font-bold text-[var(--color-text-subtle)] uppercase">UK Standard</span>
                <div className="text-lg font-bold text-[var(--color-text-main)]">{result.ukSize}</div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[10px] font-bold text-[var(--color-text-subtle)] uppercase">European (EU)</span>
                <div className="text-lg font-bold text-[var(--color-text-main)]">{result.euSize}</div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-[var(--color-border-subtle)]">
                <span className="text-[10px] font-bold text-[var(--color-text-subtle)] uppercase">Australia (AU)</span>
                <div className="text-lg font-bold text-[var(--color-text-main)]">{result.auSize}</div>
              </div>
            </div>
          </div>

          {/* Sister sizes callout */}
          <div className="mt-6 pt-6 border-t border-[var(--color-primary-border)]/60">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)]">
                Sister Sizing Matrix (Identical Cup Volume)
              </h4>
              <button
                onClick={() => onNavigate('/sister-size-calculator')}
                className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1"
              >
                Explore full matrix <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.tighterSister && (
                <div className="bg-white rounded-xl p-3.5 border border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">Snugger Band Alternative</span>
                    <div className="text-base font-bold text-[var(--color-primary)]">{result.tighterSister}</div>
                    <span className="text-[11px] text-[var(--color-text-muted)]">Ideal if bra band feels stretchy or rides up.</span>
                  </div>
                </div>
              )}
              {result.looserSister && (
                <div className="bg-white rounded-xl p-3.5 border border-[var(--color-border-subtle)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">Looser Band Alternative</span>
                    <div className="text-base font-bold text-[var(--color-primary)]">{result.looserSister}</div>
                    <span className="text-[11px] text-[var(--color-text-muted)]">Ideal if band pinches sensitive ribs.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
