import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  label: string;
  onNavigate: (path: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ label, onNavigate }) => {
  return (
    <nav className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-subtle)]" aria-label="Breadcrumb">
      <button
        onClick={() => onNavigate('/')}
        className="hover:text-[var(--color-primary)] transition-colors focus:outline-hidden"
      >
        Home
      </button>
      <ChevronRight className="w-3.5 h-3.5 text-[var(--color-border)]" aria-hidden="true" />
      <span className="font-semibold text-[var(--color-text-main)]" aria-current="page">
        {label}
      </span>
    </nav>
  );
};
