import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { SYMPTOMS_DATA } from '../../data/siteData';

interface Props {
  onNavigate: (path: string) => void;
}

export const BraFitCheckerView: React.FC<Props> = ({ onNavigate }) => {
  const [band, setBand] = useState<number>(36);
  const [cup, setCup] = useState<string>('C');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('band_rides_up');

  const selectedSymptom = SYMPTOMS_DATA.find((s) => s.id === selectedSymptomId) || SYMPTOMS_DATA[0];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
        <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-2">
          1. Your Current Bra Size
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mb-6">
          Enter the size you are currently wearing that causes discomfort.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
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
              {['A', 'B', 'C', 'D', 'DD', 'DDD/F', 'G', 'H', 'I', 'J'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mt-8 mb-4">
          2. What Fit Discomfort Are You Experiencing?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SYMPTOMS_DATA.map((sym) => {
            const isSelected = sym.id === selectedSymptomId;
            return (
              <button
                key={sym.id}
                onClick={() => setSelectedSymptomId(sym.id)}
                className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] shadow-xs'
                    : 'border-[var(--color-border-subtle)] bg-[var(--color-bg-canvas)] hover:border-[var(--color-border)]'
                }`}
              >
                <div className={`mt-0.5 p-1 rounded-full shrink-0 ${
                  isSelected ? 'bg-[var(--color-primary)] text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--color-text-main)] leading-snug">
                    {sym.title}
                  </div>
                  <span className="text-[11px] font-semibold text-[var(--color-primary)] mt-1 inline-block">
                    {sym.shift}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagnosis Card */}
      <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
          <AlertCircle className="w-4 h-4" />
          Fit Diagnosis for {band}{cup}
        </div>
        
        <h4 className="font-serif-brand text-2xl font-bold text-[var(--color-text-main)] mb-4">
          {selectedSymptom.title}
        </h4>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-[var(--color-border)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
              Root Anatomical Cause
            </span>
            <p className="text-sm text-[var(--color-text-main)] mt-1 leading-relaxed">
              {selectedSymptom.cause}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[var(--color-border)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)]">
              Fitter's Actionable Fix
            </span>
            <p className="text-sm text-[var(--color-text-main)] mt-1 leading-relaxed">
              {selectedSymptom.fix}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[var(--color-primary-border)] flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-[var(--color-text-subtle)] uppercase">Target Recommendation:</span>
              <div className="text-base font-bold text-[var(--color-primary)] mt-0.5">
                {selectedSymptom.shift} (from {band}{cup})
              </div>
            </div>
            <button
              onClick={() => onNavigate('/bra-size-calculator')}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-colors inline-flex items-center gap-1.5"
            >
              Verify Complete Measurements <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
