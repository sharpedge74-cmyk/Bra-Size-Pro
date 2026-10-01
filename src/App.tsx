/**
 * IMRango - Precision Intimates Fit Intelligence
 * Domain: https://iamrango.com
 * Brand: IMRango
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { JsonLdInjector } from './components/JsonLdInjector';
import { HomeView } from './components/HomeView';
import { GuideView } from './components/GuideView';
import { PageView } from './components/PageView';
import { FaqSection } from './components/FaqSection';
import { RelatedSection } from './components/RelatedSection';
import { AdSlot } from './components/AdSlot';

import { BraSizeCalculatorView } from './components/tools/BraSizeCalculatorView';
import { BraFitCheckerView } from './components/tools/BraFitCheckerView';
import { BraSizeToMeasurementsView } from './components/tools/BraSizeToMeasurementsView';
import { SisterSizeCalculatorView } from './components/tools/SisterSizeCalculatorView';
import { BrandSizeConverterView } from './components/tools/BrandSizeConverterView';
import { SpecialtyCalculatorsView } from './components/tools/SpecialtyCalculatorsView';

import { TOOLS_LIST, GUIDES_LIST } from './data/siteData';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [theme, setTheme] = useState<'pinkish' | 'emerald'>('pinkish');
  const [clearAlertMessage, setClearAlertMessage] = useState<string | null>(null);

  // Initialize router from window.location.pathname and popstate
  useEffect(() => {
    const handleLocation = () => {
      let path = window.location.pathname || '/';
      // Normalize: strip trailing slash and strip .html if entered directly
      if (path.length > 1 && path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      path = path.replace('.html', '');
      setCurrentPath(path || '/');
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('imrango_theme') as 'pinkish' | 'emerald';
    if (saved && (saved === 'pinkish' || saved === 'emerald')) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'pinkish');
    }
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'pinkish' ? 'emerald' : 'pinkish';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('imrango_theme', nextTheme);
  };

  const handleNavigate = (path: string) => {
    // Strictly slashless navigation
    let normalized = path;
    if (normalized.length > 1 && normalized.endsWith('/')) {
      normalized = normalized.slice(0, -1);
    }
    normalized = normalized.replace('.html', '');

    window.history.pushState({}, '', normalized);
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearData = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all your saved measurements and sizing records from this browser?'
    );
    if (confirmed) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('imrango_data_') || key.startsWith('imrango_calc')) {
          localStorage.removeItem(key);
        }
      });
      setClearAlertMessage('Your saved measurements and calculator data have been permanently cleared.');
      setTimeout(() => setClearAlertMessage(null), 4000);
    }
  };

  // Resolve current route data
  const slug = currentPath === '/' ? '' : currentPath.replace('/', '');
  const currentTool = TOOLS_LIST.find((t) => t.slug === slug);
  const currentGuide = GUIDES_LIST.find((g) => g.slug === slug);
  const isPage = [
    'about', 'contact', 'editorial-policy', 'disclaimer',
    'privacy-policy', 'terms-of-service', 'sitemap', '404'
  ].includes(slug);

  const getPageTitle = () => {
    if (currentPath === '/') return 'Bra Size Calculator & Fit Guides';
    if (currentTool) return currentTool.title;
    if (currentGuide) return currentGuide.title;
    if (slug === 'about') return 'About IMRango';
    if (slug === 'contact') return 'Contact IMRango';
    if (slug === 'editorial-policy') return 'Editorial & Sizing Policy';
    if (slug === 'disclaimer') return 'Medical & Sizing Disclaimer';
    if (slug === 'privacy-policy') return 'Privacy Policy';
    if (slug === 'terms-of-service') return 'Terms of Service';
    if (slug === 'sitemap') return 'HTML Sitemap';
    return 'Page Not Found (404)';
  };

  const getPageDescription = () => {
    if (currentPath === '/') {
      return 'Accurate bra size calculators, sister size conversions, fit checker, and professional sizing guides for US, UK, EU, AU and Asian sizing.';
    }
    if (currentTool) return currentTool.description;
    if (currentGuide) return currentGuide.description;
    return 'Precision intimates sizing intelligence and fit diagnosis at IMRango.';
  };

  const getPageType = (): 'home' | 'tool' | 'guide' | 'page' => {
    if (currentPath === '/') return 'home';
    if (currentTool) return 'tool';
    if (currentGuide) return 'guide';
    return 'page';
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-canvas)] text-[var(--color-text-main)] selection:bg-[var(--color-primary-light)] selection:text-[var(--color-primary)]">
      
      {/* Dynamic JSON-LD Structured Data Schema */}
      <JsonLdInjector
        type={getPageType()}
        url={currentPath}
        title={getPageTitle()}
        description={getPageDescription()}
        data={currentTool || currentGuide}
        breadcrumbLabel={currentTool?.title || currentGuide?.title || getPageTitle()}
      />

      {/* Global Header */}
      <Header
        currentPath={currentPath}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onNavigate={handleNavigate}
        onClearData={handleClearData}
      />

      {/* Clear Data Toast Notification */}
      {clearAlertMessage && (
        <div className="bg-emerald-700 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 text-center shadow-md animate-in slide-in-from-top duration-200 sticky top-16 z-30 flex items-center justify-center gap-2">
          <span>✓</span>
          <span>{clearAlertMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Breadcrumb Navigation */}
        {currentPath !== '/' && (
          <Breadcrumbs
            label={currentTool?.title || currentGuide?.title || getPageTitle()}
            onNavigate={handleNavigate}
          />
        )}

        {/* 1. Home View */}
        {currentPath === '/' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {/* 2. Tool View */}
        {currentTool && (
          <div className="space-y-8">
            <AdSlot slot="top_banner" />

            {/* Tool Header */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-2">
                <span>Precision Interactive Tool</span>
                <span className="text-[var(--color-text-subtle)]">&middot;</span>
                <span className="text-[var(--color-text-subtle)] font-normal">Reviewed {currentTool.lastReviewed}</span>
              </div>
              <h1 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-[var(--color-text-main)] mb-3">
                {currentTool.title}
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
                {currentTool.description}
              </p>
            </div>

            {/* Individual Tool Interactive Engine */}
            {currentTool.slug === 'bra-size-calculator' && (
              <BraSizeCalculatorView onNavigate={handleNavigate} />
            )}

            {currentTool.slug === 'bra-fit-checker' && (
              <BraFitCheckerView onNavigate={handleNavigate} />
            )}

            {currentTool.slug === 'bra-size-to-measurements' && (
              <BraSizeToMeasurementsView onNavigate={handleNavigate} />
            )}

            {currentTool.slug === 'sister-size-calculator' && (
              <SisterSizeCalculatorView onNavigate={handleNavigate} />
            )}

            {currentTool.slug === 'brand-size-converter' && (
              <BrandSizeConverterView onNavigate={handleNavigate} />
            )}

            {![
              'bra-size-calculator',
              'bra-fit-checker',
              'bra-size-to-measurements',
              'sister-size-calculator',
              'brand-size-converter',
            ].includes(currentTool.slug) && (
              <SpecialtyCalculatorsView toolSlug={currentTool.slug} onNavigate={handleNavigate} />
            )}

            {/* Tool FAQs */}
            <FaqSection faq={currentTool.faq} />

            {/* Scientific Sources */}
            {currentTool.sources && currentTool.sources.length > 0 && (
              <div className="p-6 rounded-2xl bg-white border border-[var(--color-border)] text-xs text-[var(--color-text-subtle)] space-y-2">
                <span className="font-bold uppercase tracking-wider text-[var(--color-text-main)] block">
                  Scientific & Manufacturing Standards:
                </span>
                <ul className="list-disc pl-4 space-y-1">
                  {currentTool.sources.map((src, i) => (
                    <li key={i}>{src}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Tools & Guides */}
            <RelatedSection
              relatedTool={currentTool.relatedTool}
              relatedGuide={currentTool.relatedGuide}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* 3. Guide View */}
        {currentGuide && (
          <GuideView guide={currentGuide} onNavigate={handleNavigate} />
        )}

        {/* 4. Page View (Legal & Static) */}
        {isPage && (
          <PageView slug={slug} onNavigate={handleNavigate} />
        )}

        {/* 5. Unmatched 404 Fallback */}
        {currentPath !== '/' && !currentTool && !currentGuide && !isPage && (
          <PageView slug="404" onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onClearData={handleClearData} />
    </div>
  );
}
