import React from 'react';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { FaqSection } from './FaqSection.jsx';
import { RelatedSection } from './RelatedSection.jsx';
import { AdSlot } from './AdSlot.jsx';

export const GuideView = ({ guide, onNavigate }) => {
  return (
    <article className="space-y-8">
      <AdSlot slot="top_banner" />

      {/* Guide Header */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Fitting Intelligence Guide</span>
          <span className="text-[var(--color-text-subtle)]">&middot;</span>
          <span className="text-[var(--color-text-subtle)] font-normal">Updated {guide.lastReviewed}</span>
        </div>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-[var(--color-text-main)] mb-4">
          {guide.title}
        </h1>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
          {guide.description}
        </p>
      </div>

      {/* Guide Body Content */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs prose max-w-none text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
          
          {guide.slug === 'how-to-measure-bra-size-at-home' && (
            <div className="space-y-6">
              <h2 className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)]">
                Why Traditional Measuring (+4 Rule) Has Failed You
              </h2>
              <p>
                Most department stores and mall bra chains continue to use the archaic "+4 method"—adding four inches to your measured underbust before calculating cup letters. This formula was invented in the 1930s when bra fabrics were rigid cottons with zero spandex or elastane. In modern bras with elasticized wings, adding four inches places you in a band that is far too loose to carry weight, shifting 90% of the burden onto your delicate shoulder straps.
              </p>

              <div className="bg-[var(--color-primary-light)] p-5 rounded-xl border border-[var(--color-primary-border)] space-y-2">
                <div className="font-bold text-[var(--color-text-main)] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[var(--color-primary)]" />
                  Essential Equipment Before You Begin
                </div>
                <ul className="text-xs sm:text-sm space-y-1 pl-4 list-disc text-[var(--color-text-muted)]">
                  <li>A flexible sewing tape measure (fiberglass, not metal carpenter's tape).</li>
                  <li>A full-length mirror to check that the tape remains parallel to the floor.</li>
                  <li>No bra, or an unlined, unpadded bralette with zero compression.</li>
                </ul>
              </div>

              <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] pt-2">
                The 6-Point Measuring Protocol
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">1. Loose Underbust</span>
                  Hold tape comfortably beneath your breasts where the underwire rests. Do not let the tape dig into flesh.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">2. Snug Underbust</span>
                  At the exact same position, pull with moderate tension—the exact firmness you want your bra band to feel on its loosest clasp hook.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">3. Tight Underbust</span>
                  Exhale all air and pull the tape as tight as you possibly can. This measures how much rib tissue compresses under load.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">4. Standing Bust</span>
                  Measure standing upright across the fullest point of your breasts, keeping tape level across your back.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">5. Leaning Bust (90&deg;)</span>
                  Bend forward at the waist 90 degrees so breasts hang freely with gravity. This step captures true projection and tissue volume.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">6. Lying Bust</span>
                  Lie flat on your back on a firm surface and measure across the fullest area.
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/bra-size-calculator')}
                  className="px-6 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  Open Universal Bra Calculator <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {guide.slug === 'sister-sizing-explained' && (
            <div className="space-y-6">
              <h2 className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)]">
                The Geometry of Bra Cup Grading
              </h2>
              <p>
                A common misconception is that a "D cup" represents a fixed bowl size. In garment manufacturing, <strong>cup volume scales directly with band size</strong>. As band length increases, pattern makers widen the wire circumference to keep proportions balanced with a wider torso.
              </p>

              <div className="bg-[var(--color-primary-light)] p-5 rounded-xl border border-[var(--color-primary-border)]">
                <div className="font-bold text-[var(--color-text-main)] mb-2">
                  Golden Rule of Sister Sizing:
                </div>
                <p className="text-sm">
                  <strong>Band Down &rarr; Cup Up:</strong> e.g., 36C &rarr; 34D (Same cup volume, firmer band).<br />
                  <strong>Band Up &rarr; Cup Down:</strong> e.g., 32D &rarr; 34C (Same cup volume, looser band).
                </p>
              </div>

              <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] pt-2">
                Volumetric Equivalents Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                      <th className="p-2 font-bold">Approx Cup Volume</th>
                      <th className="p-2 font-bold">Sister Size Chain</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-subtle)]">
                    <tr><td className="p-2 font-mono font-bold text-[var(--color-primary)]">~480 cc</td><td className="p-2">30D = 32C = 34B = 36A</td></tr>
                    <tr><td className="p-2 font-mono font-bold text-[var(--color-primary)]">~590 cc</td><td className="p-2">30DD = 32D = 34C = 36B = 38A</td></tr>
                    <tr><td className="p-2 font-mono font-bold text-[var(--color-primary)]">~710 cc</td><td className="p-2">30E = 32DD = 34D = 36C = 38B</td></tr>
                    <tr><td className="p-2 font-mono font-bold text-[var(--color-primary)]">~850 cc</td><td className="p-2">30F = 32E = 34DD = 36D = 38C</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/sister-size-calculator')}
                  className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  Generate Your Sister Sizes <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {guide.slug === 'signs-your-bra-doesnt-fit' && (
            <div className="space-y-6">
              <h2 className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)]">
                The 9 Telltale Signs of an Incorrect Fit
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">1. The Back Band Curves Up</span>
                  Your band should be level to the floor. An arching band means your band size is 1 to 2 sizes too large.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">2. Quad-Boobing / Cup Spillage</span>
                  Breast tissue popping over the neckline or armpit means the cups are at least 1-2 letters too small.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">3. Center Gore Floats Off Sternum</span>
                  The wire bridge between your cups must tack flat against your breastbone. If it perches in mid-air, you need deeper cups.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">4. Shoulder Straps Dig Painfully</span>
                  Red grooves in your shoulders prove your band is too loose to anchor weight, dumping 100% of the load onto your neck.
                </div>
                <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
                  <span className="font-bold text-[var(--color-text-main)] block mb-1">5. Straps Constantly Fall Down</span>
                  Loose bands allow the rear strap anchor points to shift outward off the slope of your shoulders.
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/bra-fit-checker')}
                  className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  Run Interactive Fit Checker <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {!['how-to-measure-bra-size-at-home', 'sister-sizing-explained', 'signs-your-bra-doesnt-fit'].includes(guide.slug) && (
            <div className="space-y-6">
              <h2 className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)]">
                Anatomical Principles & Fit Standard
              </h2>
              <p>
                Proper intimate apparel fitting relies on biomechanical balance: anchoring 85% of breast weight through the ribcage circumference and enclosing all glandular breast tissue behind the wire line without constriction.
              </p>

              <div className="bg-[var(--color-primary-light)] p-5 rounded-xl border border-[var(--color-primary-border)]">
                <div className="font-bold text-[var(--color-text-main)] mb-1">
                  Key Technical Insight
                </div>
                <p className="text-sm">
                  {guide.description}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/bra-size-calculator')}
                  className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  Calculate Your Accurate Size <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* FAQs */}
        <FaqSection faq={guide.faq} />

        {/* Sources */}
        {guide.sources && guide.sources.length > 0 && (
          <div className="p-6 rounded-2xl bg-white border border-[var(--color-border)] text-xs text-[var(--color-text-subtle)] space-y-2">
            <span className="font-bold uppercase tracking-wider text-[var(--color-text-main)] block">
              Evidence-Based References & Standards:
            </span>
            <ul className="list-disc pl-4 space-y-1">
              {guide.sources.map((src, i) => (
                <li key={i}>{src}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Tools & Guides */}
        <RelatedSection
          relatedTool={guide.relatedTool}
          relatedGuide={guide.relatedGuide}
          onNavigate={onNavigate}
        />
      </div>
    </article>
  );
};
