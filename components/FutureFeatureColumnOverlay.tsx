'use client';

import FutureFeatureBadge from '@/components/FutureFeatureBadge';

type FutureFeatureColumnOverlayProps = {
  className?: string;
};

/** KPI-style column band: hover / press darkens only that strip. */
export default function FutureFeatureColumnOverlay({ className = '' }: FutureFeatureColumnOverlayProps) {
  return (
    <div
      className={`group absolute inset-y-0 z-[5] cursor-default ring-1 ring-inset ring-ink/10 transition-shadow duration-150 group-hover:ring-ink/25 group-active:ring-ink/35 ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-ink/[0.1] transition-colors duration-150 group-hover:bg-ink/30 group-active:bg-ink/45" />
      <div className="absolute top-3 left-1/2 z-10 -translate-x-1/2 pointer-events-none transition-transform duration-150 group-hover:scale-[1.02]">
        <FutureFeatureBadge />
      </div>
    </div>
  );
}
