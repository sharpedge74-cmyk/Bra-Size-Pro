import React from 'react';
import { ShieldCheck, HelpCircle, FileText, ArrowRight, MapPin } from 'lucide-react';
import { TOOLS_LIST, GUIDES_LIST } from '../data/siteData';

interface PageViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const PageView: React.FC<PageViewProps> = ({ slug, onNavigate }) => {
  if (slug === 'sitemap') {
    return (
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <h1 className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)] mb-2">
            HTML Sitemap & Directory
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Explore all precision calculators, fit troubleshooting tools, and international size charts on IMRango (<a href="https://iamrango.com" className="text-[var(--color-primary)]">iamrango.com</a>).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div>
            <h2 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">
              Precision Calculators (14 Tools)
            </h2>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {TOOLS_LIST.map((tool) => (
                <li key={tool.slug}>
                  <button
                    onClick={() => onNavigate(`/${tool.slug}`)}
                    className="hover:text-[var(--color-primary)] text-left"
                  >
                    &rarr; {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-4">
              Fitting Guides & Tables (9 Guides)
            </h2>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {GUIDES_LIST.map((guide) => (
                <li key={guide.slug}>
                  <button
                    onClick={() => onNavigate(`/${guide.slug}`)}
                    className="hover:text-[var(--color-primary)] text-left"
                  >
                    &rarr; {guide.title}
                  </button>
                </li>
              ))}
            </ul>

            <h2 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mt-8 mb-4">
              Policies & Legal
            </h2>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><button onClick={() => onNavigate('/about')} className="hover:text-[var(--color-primary)]">&rarr; About IMRango</button></li>
              <li><button onClick={() => onNavigate('/contact')} className="hover:text-[var(--color-primary)]">&rarr; Contact & Support</button></li>
              <li><button onClick={() => onNavigate('/editorial-policy')} className="hover:text-[var(--color-primary)]">&rarr; Editorial Policy</button></li>
              <li><button onClick={() => onNavigate('/disclaimer')} className="hover:text-[var(--color-primary)]">&rarr; Sizing & Medical Disclaimer</button></li>
              <li><button onClick={() => onNavigate('/privacy-policy')} className="hover:text-[var(--color-primary)]">&rarr; Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('/terms-of-service')} className="hover:text-[var(--color-primary)]">&rarr; Terms of Service</button></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'about') {
    return (
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-10 shadow-xs space-y-6 prose max-w-none text-[var(--color-text-muted)] leading-relaxed">
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-extrabold text-[var(--color-text-main)]">
          About IMRango
        </h1>
        <p className="text-base sm:text-lg text-[var(--color-text-main)] font-medium">
          Over 80% of bra wearers are wearing the wrong size—suffering from digging straps, riding bands, and rib pain. We exist to fix that.
        </p>
        <p>
          <strong>IMRango</strong> (<a href="https://iamrango.com" className="text-[var(--color-primary)]">iamrango.com</a>) was founded to liberate consumers from outdated commercial myths (such as adding +4 inches to underbust measurements) with anatomical accuracy, physics-based load distribution, and open sizing education.
        </p>
        <div className="bg-[var(--color-bg-canvas)] p-6 rounded-xl border border-[var(--color-border)] my-6">
          <h3 className="font-serif-brand text-xl font-bold text-[var(--color-text-main)] mb-2">Our Mission</h3>
          <p className="text-sm">
            To provide unbiased, commercially independent intimates sizing calculators that evaluate real breast projection, tissue density, and ribcage compressibility across international standards (US, UK, EU, AU, FR, IT, and JP).
          </p>
        </div>
      </div>
    );
  }

  if (slug === 'contact') {
    return (
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-10 shadow-xs space-y-6">
        <h1 className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)]">
          Contact IMRango
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Have an algorithm recommendation, a brand fit question, or feedback on our sizing calculators? We would love to hear from you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
            <span className="text-xs uppercase font-bold text-[var(--color-text-subtle)]">Customer & Sizing Support</span>
            <div className="text-base font-bold text-[var(--color-primary)] mt-1">support@iamrango.com</div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">For questions regarding sizing formulas and tool results.</p>
          </div>
          <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-canvas)]">
            <span className="text-xs uppercase font-bold text-[var(--color-text-subtle)]">Editorial & Research Board</span>
            <div className="text-base font-bold text-[var(--color-primary)] mt-1">editorial@iamrango.com</div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">For clinical ergonomics studies and brand submissions.</p>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'editorial-policy') {
    return (
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-10 shadow-xs space-y-6 prose max-w-none text-[var(--color-text-muted)] leading-relaxed">
        <h1 className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)]">
          Editorial & Sizing Policy
        </h1>
        <p>
          At IMRango, every tool, chart, and guide is built upon empirical biomechanical principles, ISO anthropometric standards, and verified apparel engineering methods.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>Zero Vanity Sizing:</strong> We never artificially skew numbers to push you into limited retail matrixes.</li>
          <li><strong>Direct Underbust Measurement:</strong> We reject the +4 rule and advocate for true snug underbust ribcage measurements that ensure band-anchored support.</li>
          <li><strong>Source Transparency:</strong> All sizing tables and clinical claims cite peer-reviewed ergonomics literature or ISO/ASTM apparel manufacturing standards.</li>
        </ul>
      </div>
    );
  }

  if (slug === 'disclaimer') {
    return (
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-10 shadow-xs space-y-6 prose max-w-none text-[var(--color-text-muted)] leading-relaxed">
        <h1 className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)]">
          Medical & Sizing Disclaimer
        </h1>
        <p>
          All content, calculators, sizing converters, diagnostic guides, and tools provided on <strong>IMRango</strong> (<a href="https://iamrango.com">iamrango.com</a>) are designed strictly for educational, informational, and general consumer fitting purposes.
        </p>
        <p>
          The information provided does not constitute medical advice and should not replace consultation with a qualified physician or physical therapist. If you experience severe chest pain, skin ulcerations, or breast lumps, consult a licensed healthcare provider immediately.
        </p>
      </div>
    );
  }

  if (slug === 'privacy-policy') {
    return (
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-10 shadow-xs space-y-6 prose max-w-none text-[var(--color-text-muted)] leading-relaxed">
        <h1 className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)]">
          Privacy Policy
        </h1>
        <p>
          At <strong>IMRango</strong> (<a href="https://iamrango.com">iamrango.com</a>), your privacy is paramount. We believe body measurements are sensitive, intimate data.
        </p>
        <p>
          <strong>100% Client-Side Calculations:</strong> All measurements entered into our calculators are processed entirely within your web browser using client-side JavaScript. Your measurements are never transmitted to, collected by, or stored on our servers.
        </p>
        <p>
          <strong>Local Storage & "Clear My Data":</strong> You can wipe all stored data at any time by clicking the prominent <strong>"Clear my data"</strong> button in our navigation header or footer.
        </p>
      </div>
    );
  }

  if (slug === 'terms-of-service') {
    return (
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 sm:p-10 shadow-xs space-y-6 prose max-w-none text-[var(--color-text-muted)] leading-relaxed">
        <h1 className="font-serif-brand text-3xl font-extrabold text-[var(--color-text-main)]">
          Terms of Service
        </h1>
        <p>
          By accessing or using the services, calculators, and informational resources provided on <strong>IMRango</strong> (<a href="https://iamrango.com">iamrango.com</a>), you agree to be bound by these Terms of Service.
        </p>
        <p>
          All calculators and guides are provided free of charge for personal, non-commercial use. Automated scraping or unauthorized reproduction of guides without attribution is prohibited.
        </p>
      </div>
    );
  }

  // 404 Fallback
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 sm:p-16 text-center shadow-xs max-w-xl mx-auto space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] font-serif-brand font-bold text-3xl flex items-center justify-center mx-auto">
        404
      </div>
      <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[var(--color-text-main)]">
        Page Not Found
      </h1>
      <p className="text-sm text-[var(--color-text-muted)]">
        The requested intimates sizing page or calculator could not be found. Make sure you are using a slashless URL.
      </p>
      <button
        onClick={() => onNavigate('/')}
        className="px-6 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-sm hover:bg-[var(--color-primary-hover)] transition-all"
      >
        Return to IMRango Home
      </button>
    </div>
  );
};
