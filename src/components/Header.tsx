import React, { useState } from 'react';
import { Sparkles, Trash2, Code2, Menu, X, Search, ChevronRight, Compass } from 'lucide-react';
import { TOOLS_LIST, GUIDES_LIST } from '../data/siteData';

interface HeaderProps {
  currentPath: string;
  theme: 'pinkish' | 'emerald';
  onThemeToggle: () => void;
  onNavigate: (path: string) => void;
  onClearData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  theme,
  onThemeToggle,
  onNavigate,
  onClearData,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Calculator', path: '/bra-size-calculator' },
    { label: 'Fit Checker', path: '/bra-fit-checker' },
    { label: 'Sister Sizes', path: '/sister-size-calculator' },
    { label: 'Brands', path: '/brand-size-converter' },
    { label: 'Charts', path: '/bra-measurement-chart' },
    { label: 'How to Measure', path: '/how-to-measure-bra-size-at-home' },
  ];

  const searchResults = searchQuery.trim() === '' ? [] : [
    ...TOOLS_LIST.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())).map(t => ({ title: t.title, desc: t.description, path: `/${t.slug}`, type: 'Tool' })),
    ...GUIDES_LIST.filter(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase())).map(g => ({ title: g.title, desc: g.description, path: `/${g.slug}`, type: 'Guide' })),
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('/')}
              className="group flex items-center gap-2.5 text-left focus:outline-hidden"
              aria-label="IMRango Home"
            >
              <span className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
                ◆
              </span>
              <div>
                <span className="font-serif-brand font-bold text-xl tracking-tight text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">
                  IMRango
                </span>
                <span className="hidden md:inline-block ml-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)]">
                  Fit Intelligence
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => onNavigate(link.path)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)] font-semibold'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-subtle)]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-subtle)] rounded-lg transition-colors"
              title="Search tools and guides"
              aria-label="Search tools and guides"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] text-xs font-semibold text-[var(--color-text-main)] hover:bg-[var(--color-primary-light)] hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary)] transition-all"
              title={`Switch Theme: currently ${theme === 'pinkish' ? 'Pinkish Rose' : 'Emerald Forest'}`}
              aria-label="Switch Theme Palette"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span className="hidden sm:inline">
                {theme === 'pinkish' ? 'Rose Theme' : 'Emerald Theme'}
              </span>
            </button>

            {/* Clear My Data */}
            <button
              onClick={onClearData}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-dashed border-[var(--color-border)] text-xs font-medium text-[var(--color-text-subtle)] hover:text-[var(--color-error)] hover:border-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors"
              title="Clear all stored measurements from this browser"
              aria-label="Clear saved measurement data"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Clear my data</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-subtle)]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-subtle)] px-3 py-1">
            Navigation
          </div>
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                onNavigate(link.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPath === link.path
                  ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)] font-semibold'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-main)]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-end px-3">
            <span className="text-xs text-[var(--color-text-subtle)]">https://iamrango.com</span>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-[var(--color-border)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-3">
              <Search className="w-5 h-5 text-[var(--color-text-subtle)]" />
              <input
                type="text"
                autoFocus
                placeholder="Search calculators (e.g. sister size, plus size, sports, measurement)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-base focus:outline-hidden text-[var(--color-text-main)] placeholder:text-[var(--color-text-subtle)]"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-md text-[var(--color-text-subtle)] hover:bg-[var(--color-bg-subtle)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {searchQuery.trim() === '' ? (
                <div className="p-4 text-center text-xs text-[var(--color-text-subtle)]">
                  Type a keyword to discover tools, guides, or size charts.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-sm text-[var(--color-text-muted)]">
                  No tools or guides found matching "{searchQuery}".
                </div>
              ) : (
                searchResults.map((res) => (
                  <button
                    key={res.path}
                    onClick={() => {
                      onNavigate(res.path);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-[var(--color-primary-light)] transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                          {res.type}
                        </span>
                        <span className="text-sm font-semibold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)]">
                          {res.title}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-1 mt-0.5">
                        {res.desc}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[var(--color-text-subtle)] group-hover:text-[var(--color-primary)]" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
