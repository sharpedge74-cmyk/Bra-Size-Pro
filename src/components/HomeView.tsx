import React, { useState } from 'react';
import {
  Ruler, ShieldAlert, Sparkles, Tag, Activity, Heart, Feather, User,
  Smile, Scissors, Layers, Waves, Target, ArrowRight, CheckCircle2,
  HelpCircle, BookOpen, AlertCircle, Compass, BarChart3, ChevronRight
} from 'lucide-react';
import { TOOLS_LIST, GUIDES_LIST, BRANDS_DATA } from '../data/siteData';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  // Quick hero calculator state
  const [quickUnderbust, setQuickUnderbust] = useState<number>(32);
  const [quickBust, setQuickBust] = useState<number>(36);

  const quickBand = Math.round(quickUnderbust) % 2 === 0 ? Math.round(quickUnderbust) : Math.round(quickUnderbust) + 1;
  const quickDiff = Math.max(0, quickBust - quickUnderbust);
  const cups = ['AA', 'A', 'B', 'C', 'D', 'DD', 'DDD/F', 'G', 'H', 'I'];
  const quickCup = cups[Math.min(Math.round(quickDiff), cups.length - 1)] || 'D';

  const iconMap: Record<string, React.ReactNode> = {
    Ruler: <Ruler className="w-5 h-5" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5" />,
    ArrowLeftRight: <Compass className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Tag: <Tag className="w-5 h-5" />,
    Activity: <Activity className="w-5 h-5" />,
    Heart: <Heart className="w-5 h-5" />,
    Feather: <Feather className="w-5 h-5" />,
    User: <User className="w-5 h-5" />,
    Smile: <Smile className="w-5 h-5" />,
    Scissors: <Scissors className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Waves: <Waves className="w-5 h-5" />,
    Target: <Target className="w-5 h-5" />,
  };

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-white via-[var(--color-bg-subtle)] to-[var(--color-primary-light)] p-8 sm:p-12 lg:p-16 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--color-border)] shadow-2xs text-xs font-semibold text-[var(--color-primary)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Precision Sizing Intelligence</span>
            </div>

            <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-text-main)] tracking-tight leading-[1.12]">
              Stop wearing a bra that <span className="text-[var(--color-primary)] italic">hurts.</span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
              Over 80% of individuals wear the wrong bra size due to commercial sales tricks like the +4 inches method. IMRango replaces retail guesswork with anatomical physics, direct underbust anchors, and international conversions.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('/bra-size-calculator')}
                className="px-6 py-3.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                Launch Universal Calculator <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/bra-fit-checker')}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[var(--color-bg-canvas)] border border-[var(--color-border)] text-[var(--color-text-main)] font-semibold text-sm transition-all"
              >
                Diagnose Fit Discomfort
              </button>
            </div>

            {/* Quick Trust badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[var(--color-text-subtle)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero +4 Inch Distortion
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Client-Side Privacy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                US, UK, EU, AU Standards
              </span>
            </div>
          </div>

          {/* Hero Quick Calculator Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-7 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Quick Estimate</span>
                  <h3 className="font-serif-brand text-lg font-bold text-[var(--color-text-main)]">
                    Instant Size Benchmark
                  </h3>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold">
                  2-Point Mode
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[var(--color-text-main)] mb-1">
                    <span>Snug Underbust: {quickUnderbust} in</span>
                    <span className="text-[var(--color-text-subtle)] font-normal">Ribcage anchor</span>
                  </div>
                  <input
                    type="range"
                    min={26}
                    max={46}
                    step={1}
                    value={quickUnderbust}
                    onChange={(e) => setQuickUnderbust(parseInt(e.target.value))}
                    className="w-full accent-[var(--color-primary)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[var(--color-text-main)] mb-1">
                    <span>Full Bust: {quickBust} in</span>
                    <span className="text-[var(--color-text-subtle)] font-normal">Apex circumference</span>
                  </div>
                  <input
                    type="range"
                    min={quickUnderbust}
                    max={quickUnderbust + 14}
                    step={1}
                    value={quickBust}
                    onChange={(e) => setQuickBust(parseInt(e.target.value))}
                    className="w-full accent-[var(--color-primary)] cursor-pointer"
                  />
                </div>
              </div>

              {/* Instant Output */}
              <div className="p-4 rounded-xl bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)] block">
                  Estimated US Starting Size
                </span>
                <div className="font-serif-brand text-4xl font-extrabold text-[var(--color-text-main)] my-1">
                  {quickBand}{quickCup}
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">
                  UK: {quickBand}{quickCup} &middot; EU: {Math.max(60, Math.round(quickBand * 2.54 / 5) * 5 - 10)}{quickCup}
                </span>
              </div>

              <button
                onClick={() => onNavigate('/bra-size-calculator')}
                className="w-full py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                Refine With 6-Point Measurements <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 80% Wrong Size Problem (Educational Hook) */}
      <section className="bg-white rounded-3xl border border-[var(--color-border)] p-8 sm:p-12 shadow-xs">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
            Anatomical Reality
          </span>
          <h2 className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)] mt-1 mb-3">
            Why Your Current Bra Probably Lies To You
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            Most women who wear a 36B are actually a 32DD. Most who wear a 38C are actually a 34F. Here is the mathematical truth of how weight is meant to be carried:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-rose-200 bg-rose-50/60 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              Common Retail Error (+4 Method)
            </div>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                Band is too loose (curves up into shoulder blades).
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                Shoulder straps bear 80% of weight, causing tension headaches.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&times;</span>
                Cups are too shallow, causing center gore to float off chest.
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              IMRango Precision Method
            </div>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">&check;</span>
                Band sits completely level, carrying 85% to 90% of weight.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">&check;</span>
                Shoulder straps rest comfortably with zero groove gouging.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">&check;</span>
                Wires fully encase breast tissue without underarm pinching.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Grid of All 14 Precision Tools */}
      <section aria-labelledby="all-tools-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Sizing Suite
            </span>
            <h2 id="all-tools-heading" className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)] mt-1">
              Precision Calculators (14 Tools)
            </h2>
          </div>
          <p className="text-xs text-[var(--color-text-subtle)] max-w-sm">
            All algorithms run 100% client-side with zero data tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS_LIST.map((tool) => (
            <div
              key={tool.slug}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-6 hover:shadow-md hover:border-[var(--color-primary-border)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center">
                    {iconMap[tool.icon] || <Ruler className="w-5 h-5" />}
                  </div>
                  {tool.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-primary)] text-white">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-serif-brand text-lg font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                  {tool.title}
                </h3>

                <p className="text-xs text-[var(--color-text-muted)] line-clamp-3 leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              <button
                onClick={() => onNavigate(`/${tool.slug}`)}
                className="text-xs font-bold text-[var(--color-primary)] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1.5 self-start"
              >
                Open Calculator <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Grid of All 9 Fitting Guides */}
      <section aria-labelledby="all-guides-heading" className="bg-[var(--color-bg-subtle)] rounded-3xl p-8 sm:p-12 border border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
              Educational Authority
            </span>
            <h2 id="all-guides-heading" className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)] mt-1">
              Master Fitting Guides & Charts
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/bra-measurement-chart')}
            className="text-xs font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
          >
            View Universal Charts &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {GUIDES_LIST.map((guide) => (
            <div
              key={guide.slug}
              className="bg-white rounded-2xl border border-[var(--color-border)] p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-subtle)] mb-2 block">
                  Guide &middot; {guide.lastReviewed}
                </span>
                <h3 className="font-serif-brand text-base font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors mb-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] line-clamp-3 leading-relaxed mb-6">
                  {guide.description}
                </p>
              </div>

              <button
                onClick={() => onNavigate(`/${guide.slug}`)}
                className="text-xs font-semibold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 self-start"
              >
                Read Guide <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Sizing Directory Strip */}
      <section className="bg-white rounded-3xl border border-[var(--color-border)] p-8 sm:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)]">
              Top Commercial Brands Compared
            </h2>
            <p className="text-xs text-[var(--color-text-subtle)] mt-0.5">
              How major retail brands grade their bands and wires.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/brand-size-converter')}
            className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-colors self-start sm:self-auto"
          >
            Open Brand Size Converter &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {BRANDS_DATA.map((brand) => (
            <div key={brand.id} className="p-3.5 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas)]">
              <span className="text-xs font-bold text-[var(--color-text-main)] block">{brand.name}</span>
              <span className="text-[11px] text-[var(--color-primary)] font-semibold">{brand.bandFit}</span>
              <p className="text-[10px] text-[var(--color-text-subtle)] line-clamp-2 mt-1">{brand.notes}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
