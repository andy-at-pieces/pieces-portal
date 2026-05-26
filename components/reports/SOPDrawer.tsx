'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { SOP } from '@/lib/reports/sopData';

function ProjectChip({ children }: { children: string }) {
  return (
    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-surface-100 text-ink-700 border border-surface-200">
      {children}
    </span>
  );
}

export default function SOPDrawer({
  sop,
  onClose,
}: {
  sop: SOP | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!sop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [sop, onClose]);

  if (!sop) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-ink/20"
        aria-label="Close SOP drawer"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="sop-drawer-title"
        className="relative w-full max-w-[480px] h-full bg-white border-l border-surface-200 shadow-xl flex flex-col overflow-hidden"
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-surface-200 shrink-0">
          <div className="min-w-0 pr-2">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 id="sop-drawer-title" className="font-display font-bold text-xl text-ink tracking-tight">
                {sop.title}
              </h2>
              <ProjectChip>{sop.project}</ProjectChip>
            </div>
            <p className="text-sm text-ink-500 leading-relaxed">{sop.description}</p>
            <p className="text-[11px] text-ink-400 mt-2">
              Generated from Workstream Activity · Last updated {sop.lastUpdated}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-surface-100 text-ink-500 shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-surface-200 shrink-0">
          <button
            type="button"
            disabled
            title="PDF export coming soon"
            className="px-3 py-1.5 rounded-lg border border-surface-200 bg-surface-50 text-sm font-medium text-ink-400 cursor-not-allowed"
          >
            Export as PDF
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <ol className="space-y-0">
            {sop.steps.map((step, i) => (
              <li
                key={step.number}
                className={i < sop.steps.length - 1 ? 'pb-6 mb-6 border-b border-surface-200' : ''}
              >
                <div className="flex gap-4">
                  <span className="font-display font-bold text-2xl text-surface-300 leading-none tabular-nums shrink-0">
                    {step.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-100 text-ink-600 border border-surface-200">
                        {step.estimatedTime}
                      </span>
                    </div>
                    <p className="text-[13px] text-ink-500 leading-relaxed">{step.description}</p>
                    <p className="text-[11px] text-ink-400 mt-2">
                      {step.toolsObserved.join(' · ')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
