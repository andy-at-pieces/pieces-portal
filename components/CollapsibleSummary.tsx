'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleSummary({
  preview,
  children,
  expandLabel = 'Read full summary',
  collapseLabel = 'Collapse summary',
  panelClassName = '',
  toggleClassName = '',
}: {
  preview: ReactNode;
  children: ReactNode;
  expandLabel?: string;
  collapseLabel?: string;
  panelClassName?: string;
  toggleClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={panelClassName}>
      {open ? children : preview}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`mt-3 flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-ink transition-colors ${toggleClassName}`}
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.25}
          aria-hidden
        />
        {open ? collapseLabel : expandLabel}
      </button>
    </div>
  );
}
