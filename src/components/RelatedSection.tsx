import React from 'react';
import { ArrowRight, Wrench, BookOpen } from 'lucide-react';
import { RelatedItem } from '../data/siteData';

interface RelatedSectionProps {
  relatedTool?: RelatedItem;
  relatedGuide?: RelatedItem;
  onNavigate: (path: string) => void;
}

export const RelatedSection: React.FC<RelatedSectionProps> = ({ relatedTool, relatedGuide, onNavigate }) => {
  if (!relatedTool && !relatedGuide) return null;

  return (
    <section className="mt-12" aria-label="Related Tools & Guides">
      <h3 className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)] mb-6">
        Continue Your Fit Journey
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedTool && (
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
                <Wrench className="w-3.5 h-3.5" />
                Featured Calculator
              </div>
              <h4 className="text-lg font-bold text-[var(--color-text-main)] mb-2">
                {relatedTool.title}
              </h4>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
                {relatedTool.desc}
              </p>
            </div>
            <button
              onClick={() => onNavigate(relatedTool.url)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline self-start"
            >
              Open Tool <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {relatedGuide && (
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                In-Depth Guide
              </div>
              <h4 className="text-lg font-bold text-[var(--color-text-main)] mb-2">
                {relatedGuide.title}
              </h4>
              <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
                {relatedGuide.desc}
              </p>
            </div>
            <button
              onClick={() => onNavigate(relatedGuide.url)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline self-start"
            >
              Read Full Guide <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
