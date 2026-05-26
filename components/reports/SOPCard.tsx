'use client';

import { ArrowRight } from 'lucide-react';
import type { SOP } from '@/lib/reports/sopData';

function ProjectChip({ children }: { children: string }) {
  return (
    <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-surface-100 text-ink-700 border border-surface-200">
      {children}
    </span>
  );
}

export default function SOPCard({
  sop,
  onOpen,
}: {
  sop: SOP;
  onOpen: (sop: SOP) => void;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-5 px-5 border-b border-surface-200 last:border-b-0">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 gap-y-1 mb-1.5">
          <h3 className="text-sm font-semibold text-ink">{sop.title}</h3>
          <ProjectChip>{sop.project}</ProjectChip>
        </div>
        <p className="text-[13px] text-ink-500 leading-relaxed max-w-[720px]">{sop.description}</p>
        <p className="text-[11px] font-mono text-ink-400 mt-2">
          {sop.stepCount} steps · {sop.estimatedTotal}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between gap-3 shrink-0 text-right">
        <span className="text-[11px] text-ink-400 whitespace-nowrap">Updated {sop.lastUpdated}</span>
        {sop.isOpen ? (
          <button
            type="button"
            onClick={() => onOpen(sop)}
            className="text-xs font-medium text-accent-blue hover:bg-accent-blueSoft px-3 py-1.5 rounded-md flex items-center gap-1 whitespace-nowrap transition-colors"
          >
            Open SOP <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <span
            title="Coming soon"
            className="text-xs font-medium text-ink-300 px-3 py-1.5 rounded-md flex items-center gap-1 whitespace-nowrap cursor-not-allowed"
          >
            Open SOP <ArrowRight className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );
}
