import React from 'react';
import { TOOLS_LIST } from '../data/siteData.js';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-[var(--color-border)] mt-auto pt-14 pb-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                ◆
              </span>
              <span className="font-serif-brand font-bold text-2xl text-[var(--color-text-main)]">
                IMRango
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed pr-6">
              IMRango (<a href="https://iamrango.com" className="text-[var(--color-primary)] hover:underline font-medium">iamrango.com</a>) is an independent intimates fit authority dedicated to liberating consumers from outdated sizing myths like the +4 method through anatomical measurement physics.
            </p>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] mb-4">
              Precision Tools
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {TOOLS_LIST.slice(0, 7).map((tool) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => onNavigate(`/${tool.slug}`)}
                    className="hover:text-[var(--color-primary)] transition-colors text-left"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialty Sizing */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] mb-4">
              Specialty & Apparel
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {TOOLS_LIST.slice(7).map((tool) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => onNavigate(`/${tool.slug}`)}
                    className="hover:text-[var(--color-primary)] transition-colors text-left"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-main)] mb-4">
              Guides & Legal
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>
                <button onClick={() => onNavigate('/how-to-measure-bra-size-at-home')} className="hover:text-[var(--color-primary)]">
                  How to Measure at Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/sister-sizing-explained')} className="hover:text-[var(--color-primary)]">
                  Sister Sizing Explained
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/bra-measurement-chart')} className="hover:text-[var(--color-primary)]">
                  Measurement Charts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[var(--color-primary)]">
                  About IMRango
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/editorial-policy')} className="hover:text-[var(--color-primary)]">
                  Editorial Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer')} className="hover:text-[var(--color-primary)]">
                  Medical & Sizing Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-[var(--color-primary)]">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms-of-service')} className="hover:text-[var(--color-primary)]">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/sitemap')} className="hover:text-[var(--color-primary)]">
                  HTML Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-subtle)]">
          <p>
            &copy; {new Date().getFullYear()} IMRango (<a href="https://iamrango.com" className="hover:underline">iamrango.com</a>). All rights reserved. Sizing calculations adhere to modern ISO/BS standards.
          </p>
        </div>
      </div>
    </footer>
  );
};
