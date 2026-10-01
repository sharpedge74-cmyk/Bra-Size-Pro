import React, { useState } from 'react';
import { Activity, Heart, Feather, User, Smile, Scissors, Layers, Waves, Target, CheckCircle2 } from 'lucide-react';
import { SIZES_DATA } from '../../data/siteData';

interface SpecialtyProps {
  toolSlug: string;
  onNavigate: (path: string) => void;
}

export const SpecialtyCalculatorsView: React.FC<SpecialtyProps> = ({ toolSlug, onNavigate }) => {
  // Sports Bra state
  const [sbUnderbust, setSbUnderbust] = useState<number>(32);
  const [sbBust, setSbBust] = useState<number>(37);
  const [sbImpact, setSbImpact] = useState<'high' | 'medium' | 'low'>('high');

  // Maternity state
  const [matUnderbust, setMatUnderbust] = useState<number>(34);
  const [matBust, setMatBust] = useState<number>(39);
  const [matStage, setMatStage] = useState<'t1' | 't2' | 't3' | 'postpartum'>('t2');

  // Plus Size state
  const [psSnug, setPsSnug] = useState<number>(40);
  const [psTight, setPsTight] = useState<number>(38);
  const [psStanding, setPsStanding] = useState<number>(48);
  const [psLeaning, setPsLeaning] = useState<number>(51);

  // Men's Bra state
  const [mbUnderbust, setMbUnderbust] = useState<number>(38);
  const [mbBust, setMbBust] = useState<number>(40);
  const [mbTorso, setMbTorso] = useState<'broad' | 'slender'>('broad');

  // First Bra state
  const [fbUnderbust, setFbUnderbust] = useState<number>(28);
  const [fbBust, setFbBust] = useState<number>(29.5);

  // Panty state
  const [pantyWaist, setPantyWaist] = useState<number>(28);
  const [pantyHips, setPantyHips] = useState<number>(38);

  // Matching set state
  const [setUnderbust, setSetUnderbust] = useState<number>(32);
  const [setBust, setSetBust] = useState<number>(36);
  const [setHips, setSetHips] = useState<number>(39);

  // Swimwear state
  const [swUnderbust, setSwUnderbust] = useState<number>(34);
  const [swBust, setSwBust] = useState<number>(38);
  const [swTorso, setSwTorso] = useState<number>(61);

  // Shapewear state
  const [shWaist, setShWaist] = useState<number>(29);
  const [shHips, setShHips] = useState<number>(39);
  const [shLevel, setShLevel] = useState<'light' | 'medium' | 'firm'>('medium');

  // --- RENDER SPORTS BRA ---
  if (toolSlug === 'sports-bra-calculator') {
    const band = Math.round(sbUnderbust) % 2 === 0 ? Math.round(sbUnderbust) : Math.round(sbUnderbust) + 1;
    const diff = Math.max(0, sbBust - sbUnderbust);
    const cupIdx = Math.min(Math.round(diff), SIZES_DATA.cupProgressionUS.length - 1);
    const cup = SIZES_DATA.cupProgressionUS[cupIdx] || 'C';

    let alphaSize = 'M';
    if (band <= 32) alphaSize = cupIdx > 3 ? 'S-D+' : 'S';
    else if (band <= 36) alphaSize = cupIdx > 3 ? 'M-D+' : 'M';
    else if (band <= 40) alphaSize = cupIdx > 3 ? 'L-D+' : 'L';
    else alphaSize = 'XL+';

    const style = sbImpact === 'high' || cupIdx >= 4
      ? 'Encapsulation with underwire or molded individual cups (e.g. Panache Sport, Shock Absorber D-Max)'
      : sbImpact === 'medium'
      ? 'Hybrid encapsulation-compression with racerback construction'
      : 'Compression crop or soft wireless seamless bralette';

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">
            Sports Bra Activity & Measurements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Underbust (in)</label>
              <input type="number" step="0.5" value={sbUnderbust} onChange={(e) => setSbUnderbust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Bust (in)</label>
              <input type="number" step="0.5" value={sbBust} onChange={(e) => setSbBust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Impact Level</label>
              <select value={sbImpact} onChange={(e) => setSbImpact(e.target.value as any)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm">
                <option value="high">High (Running, HIIT, Cardio)</option>
                <option value="medium">Medium (Spin, Hiking)</option>
                <option value="low">Low (Yoga, Pilates, Walking)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Sports Bra Recommendation &middot; {sbImpact.toUpperCase()} Impact
          </span>
          <div className="font-serif-brand text-4xl sm:text-5xl font-extrabold text-[var(--color-text-main)] mt-1 mb-2">
            {band}{cup}
          </div>
          <div className="text-sm font-semibold text-[var(--color-text-main)] mb-4">
            Alpha Size Equivalent: <span className="text-[var(--color-primary)] font-bold">{alphaSize}</span>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[var(--color-border)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">Recommended Structure:</span>
            <p className="text-sm text-[var(--color-text-main)] mt-1">{style}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER MATERNITY & NURSING ---
  if (toolSlug === 'maternity-nursing-bra-calculator') {
    const band = Math.round(matUnderbust) % 2 === 0 ? Math.round(matUnderbust) : Math.round(matUnderbust) + 1;
    let diff = Math.max(0, matBust - matUnderbust);
    if (matStage === 't3') diff += 1;
    const cupIdx = Math.min(Math.round(diff), SIZES_DATA.cupProgressionUS.length - 1);
    const cup = SIZES_DATA.cupProgressionUS[cupIdx] || 'DD';

    let advice = matStage === 't3'
      ? 'At late pregnancy, your ribcage is at maximum expansion. Postpartum, rib circumference contracts while breast volume surges when milk regulates.'
      : matStage === 'postpartum'
      ? 'Choose flexible drop-down clips and stretch modal cups that adapt to engorgement throughout the day.'
      : 'Ribcage expands during pregnancy; purchase bras that fit on the tightest hook so you can expand hooks later.';

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">Maternity & Nursing Measurements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Underbust (in)</label>
              <input type="number" step="0.5" value={matUnderbust} onChange={(e) => setMatUnderbust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Bust (in)</label>
              <input type="number" step="0.5" value={matBust} onChange={(e) => setMatBust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Pregnancy Stage</label>
              <select value={matStage} onChange={(e) => setMatStage(e.target.value as any)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm">
                <option value="t1">Trimester 1 (Weeks 1-13)</option>
                <option value="t2">Trimester 2 (Weeks 14-27)</option>
                <option value="t3">Trimester 3 (Weeks 28-40)</option>
                <option value="postpartum">Postpartum Nursing</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Maternity Fit Recommendation</span>
          <div className="font-serif-brand text-4xl sm:text-5xl font-extrabold text-[var(--color-text-main)] mt-1 mb-4">
            {band}{cup}
          </div>
          <div className="bg-white rounded-xl p-4 border border-[var(--color-border)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">Stage Fitting Strategy:</span>
            <p className="text-sm text-[var(--color-text-main)] mt-1 leading-relaxed">{advice}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER PLUS SIZE ---
  if (toolSlug === 'plus-size-bra-calculator') {
    let band = Math.round(psSnug);
    if (band % 2 !== 0) band -= 1; // plus fitters prefer snug band to prevent tissue slippage
    const avgBust = (psStanding + psLeaning * 2) / 3;
    const diff = Math.max(0, avgBust - psSnug);
    const cupIdx = Math.min(Math.round(diff), SIZES_DATA.cupProgressionUK.length - 1);
    const usCup = SIZES_DATA.cupProgressionUS[cupIdx] || 'I';
    const ukCup = SIZES_DATA.cupProgressionUK[cupIdx] || 'G';

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">Plus-Size Calibration</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Snug Underbust</label>
              <input type="number" step="0.5" value={psSnug} onChange={(e) => setPsSnug(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Tight (Exhaled)</label>
              <input type="number" step="0.5" value={psTight} onChange={(e) => setPsTight(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Standing Bust</label>
              <input type="number" step="0.5" value={psStanding} onChange={(e) => setPsStanding(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Leaning Bust</label>
              <input type="number" step="0.5" value={psLeaning} onChange={(e) => setPsLeaning(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Curvy & Full-Bust Support Size</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 mb-4">
            <div className="bg-white p-4 rounded-xl border border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-subtle)] font-bold uppercase">UK Sizing (Recommended)</span>
              <div className="font-serif-brand text-4xl font-bold text-[var(--color-primary)]">{band}{ukCup}</div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Elomi, Sculptresse, and Panache use this standard for superior gore tacking.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-subtle)] font-bold uppercase">US Sizing</span>
              <div className="font-serif-brand text-4xl font-bold text-[var(--color-text-main)]">{band}{usCup}</div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Standard domestic US full-figure conversion.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER MEN'S BRA ---
  if (toolSlug === 'mens-bra-calculator') {
    const band = Math.round(mbUnderbust) % 2 === 0 ? Math.round(mbUnderbust) : Math.round(mbUnderbust) + 1;
    let diff = mbBust - mbUnderbust;
    if (mbTorso === 'broad') diff = Math.max(0, diff - 0.5);
    const cupIdx = Math.min(Math.round(diff), SIZES_DATA.cupProgressionUS.length - 1);
    const cup = SIZES_DATA.cupProgressionUS[cupIdx] || 'AA';

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">Torso & Chest Dimensions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Underbust (in)</label>
              <input type="number" step="0.5" value={mbUnderbust} onChange={(e) => setMbUnderbust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Chest (in)</label>
              <input type="number" step="0.5" value={mbBust} onChange={(e) => setMbBust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Torso Frame</label>
              <select value={mbTorso} onChange={(e) => setMbTorso(e.target.value as any)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm">
                <option value="broad">Broad / Athletic Ribcage</option>
                <option value="slender">Slender Torso</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Fitted Chest Recommendation</span>
          <div className="font-serif-brand text-4xl sm:text-5xl font-extrabold text-[var(--color-text-main)] mt-1 mb-4">
            {band}{cup}
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            Male pectorals and gynecomastia tissue feature wider roots and shallow projection. Look for wire-free compression vests or shallow balcony silhouettes.
          </p>
        </div>
      </div>
    );
  }

  // --- RENDER FIRST BRA ---
  if (toolSlug === 'first-bra-calculator') {
    const diff = fbBust - fbUnderbust;
    let band = Math.round(fbUnderbust);
    if (band % 2 !== 0) band += 1;
    let sizeDesc = `${band}AA / Junior XS`;
    let style = 'Seamless starter crop top (zero underwire, pure modesty)';
    if (diff >= 1 && diff < 2) {
      sizeDesc = `${band}A`;
      style = 'Soft cotton bralette with flexible modesty lining';
    } else if (diff >= 2) {
      sizeDesc = `${band}B`;
      style = 'Contoured wire-free bra';
    }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">Beginner Sizing Inputs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Underbust (in)</label>
              <input type="number" step="0.5" value={fbUnderbust} onChange={(e) => setFbUnderbust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Fullest Bust (in)</label>
              <input type="number" step="0.5" value={fbBust} onChange={(e) => setFbBust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Recommended Starter Size</span>
          <div className="font-serif-brand text-4xl sm:text-5xl font-extrabold text-[var(--color-text-main)] mt-1 mb-2">
            {sizeDesc}
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Recommended Style: <strong>{style}</strong>
          </p>
          <div className="bg-white p-4 rounded-xl border border-[var(--color-border)] text-xs text-[var(--color-text-subtle)]">
            Gentle Tip: Never buy rigid underwires for developing tissue. Breathable stretch cotton allows healthy, comfortable development.
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER PANTY SIZE CALCULATOR ---
  if (toolSlug === 'panty-size-calculator') {
    let alpha = 'M'; let usNum = '8-10'; let ukNum = '12-14'; let euNum = '40-42';
    if (pantyHips < 36) { alpha = 'XS'; usNum = '0-2'; ukNum = '4-6'; euNum = '32-34'; }
    else if (pantyHips < 38) { alpha = 'S'; usNum = '4-6'; ukNum = '8-10'; euNum = '36-38'; }
    else if (pantyHips < 40) { alpha = 'M'; usNum = '8-10'; ukNum = '12-14'; euNum = '40-42'; }
    else if (pantyHips < 43) { alpha = 'L'; usNum = '12-14'; ukNum = '16-18'; euNum = '44-46'; }
    else if (pantyHips < 46) { alpha = 'XL'; usNum = '16-18'; ukNum = '20-22'; euNum = '48-50'; }
    else { alpha = '2XL'; usNum = '20-22'; ukNum = '24-26'; euNum = '52-54'; }

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">Waist and Hip Measurements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Natural Waist (in)</label>
              <input type="number" step="0.5" value={pantyWaist} onChange={(e) => setPantyWaist(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Fullest Hips (in)</label>
              <input type="number" step="0.5" value={pantyHips} onChange={(e) => setPantyHips(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Calculated Panty Size</span>
          <div className="font-serif-brand text-5xl font-extrabold text-[var(--color-text-main)] mt-1 mb-6">
            {alpha}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-xl border border-[var(--color-border-subtle)] text-center">
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-subtle)]">US Dress</span>
              <div className="text-base font-bold text-[var(--color-text-main)] mt-0.5">{usNum}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[var(--color-border-subtle)] text-center">
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-subtle)]">UK Dress</span>
              <div className="text-base font-bold text-[var(--color-text-main)] mt-0.5">{ukNum}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[var(--color-border-subtle)] text-center">
              <span className="text-[10px] uppercase font-bold text-[var(--color-text-subtle)]">EU Sizing</span>
              <div className="text-base font-bold text-[var(--color-text-main)] mt-0.5">{euNum}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER MATCHING SET ---
  if (toolSlug === 'matching-set-calculator') {
    const band = Math.round(setUnderbust) % 2 === 0 ? Math.round(setUnderbust) : Math.round(setUnderbust) + 1;
    const diff = Math.max(0, setBust - setUnderbust);
    const cupIdx = Math.min(Math.round(diff), SIZES_DATA.cupProgressionUS.length - 1);
    const cup = SIZES_DATA.cupProgressionUS[cupIdx] || 'C';

    let bottomAlpha = 'M';
    if (setHips < 36) bottomAlpha = 'XS';
    else if (setHips < 38) bottomAlpha = 'S';
    else if (setHips < 41) bottomAlpha = 'M';
    else if (setHips < 44) bottomAlpha = 'L';
    else bottomAlpha = 'XL';

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">Coordinated Sizing Inputs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Underbust (in)</label>
              <input type="number" step="0.5" value={setUnderbust} onChange={(e) => setSetUnderbust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Bust (in)</label>
              <input type="number" step="0.5" value={setBust} onChange={(e) => setSetBust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Hips (in)</label>
              <input type="number" step="0.5" value={setHips} onChange={(e) => setSetHips(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Coordinated Lingerie Set</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-white p-4 rounded-xl border border-[var(--color-border)]">
              <span className="text-xs uppercase font-bold text-[var(--color-text-subtle)]">Bra Top</span>
              <div className="font-serif-brand text-3xl font-bold text-[var(--color-primary)]">{band}{cup}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[var(--color-border)]">
              <span className="text-xs uppercase font-bold text-[var(--color-text-subtle)]">Bottom / Thong</span>
              <div className="font-serif-brand text-3xl font-bold text-[var(--color-text-main)]">{bottomAlpha}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER SWIMWEAR ---
  if (toolSlug === 'swimwear-size-calculator') {
    const band = Math.round(swUnderbust) % 2 === 0 ? Math.round(swUnderbust) : Math.round(swUnderbust) + 1;
    const diff = Math.max(0, swBust - swUnderbust);
    const cupIdx = Math.min(Math.round(diff), SIZES_DATA.cupProgressionUS.length - 1);
    const cup = SIZES_DATA.cupProgressionUS[cupIdx] || 'C';

    let suit = 'Size 8 (M)';
    if (band <= 32) suit = 'Size 4-6 (S)';
    else if (band <= 34) suit = 'Size 8 (M)';
    else if (band <= 36) suit = 'Size 10-12 (L)';
    else suit = 'Size 14-16 (XL)';

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">Swimwear Dimensions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Underbust (in)</label>
              <input type="number" step="0.5" value={swUnderbust} onChange={(e) => setSwUnderbust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Bust (in)</label>
              <input type="number" step="0.5" value={swBust} onChange={(e) => setSwBust(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Torso Diagonal (in)</label>
              <input type="number" step="0.5" value={swTorso} onChange={(e) => setSwTorso(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Swimwear Fit Specifications</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="bg-white p-4 rounded-xl border border-[var(--color-border)]">
              <span className="text-xs uppercase font-bold text-[var(--color-text-subtle)]">Bra-Sized Bikini / Tankini</span>
              <div className="font-serif-brand text-3xl font-bold text-[var(--color-primary)]">{band}{cup}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[var(--color-border)]">
              <span className="text-xs uppercase font-bold text-[var(--color-text-subtle)]">One-Piece Suit</span>
              <div className="font-serif-brand text-3xl font-bold text-[var(--color-text-main)]">{suit}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER SHAPEWEAR ---
  if (toolSlug === 'shapewear-size-calculator') {
    let alpha = 'M';
    if (shHips < 36) alpha = 'XS';
    else if (shHips < 38) alpha = 'S';
    else if (shHips < 41) alpha = 'M';
    else if (shHips < 44) alpha = 'L';
    else if (shHips < 47) alpha = 'XL';
    else alpha = '2XL';

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">Body Contouring Measurements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Natural Waist (in)</label>
              <input type="number" step="0.5" value={shWaist} onChange={(e) => setShWaist(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Fullest Hips (in)</label>
              <input type="number" step="0.5" value={shHips} onChange={(e) => setShHips(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--color-text-main)] mb-1">Compression Goal</label>
              <select value={shLevel} onChange={(e) => setShLevel(e.target.value as any)} className="w-full px-3 py-2 rounded-lg bg-white border border-[var(--color-border)] font-semibold text-sm">
                <option value="light">Level 1: Smooth</option>
                <option value="medium">Level 2: Moderate Shape</option>
                <option value="firm">Level 3: Maximum Sculpt</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">Sculpting Garment Size</span>
          <div className="font-serif-brand text-5xl font-extrabold text-[var(--color-text-main)] mt-1 mb-4">
            {alpha}
          </div>
          <div className="bg-white p-4 rounded-xl border border-[var(--color-border)]">
            <strong className="text-xs uppercase tracking-wider text-[var(--color-text-main)]">Fitter's Golden Rule:</strong>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Never size down to achieve extra slimming. Sizing down forces edge-bulging and rolls down immediately. The firm compression is engineered directly into your true size ({alpha}).
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div>Specialty tool configuration loaded.</div>;
};
