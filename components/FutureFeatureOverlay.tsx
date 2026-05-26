'use client';

import { ReactNode } from 'react';
import FutureFeatureBadge from '@/components/FutureFeatureBadge';

type FutureFeatureOverlayProps = {
  children: ReactNode;
  className?: string;
  badgeClassName?: string;
};

/** Scrim darkens on hover / press so v2 regions read clearly against live UI. */
const scrimClasses =
  'absolute inset-0 z-[1] rounded-[inherit] bg-ink/[0.1] transition-colors duration-150 group-hover:bg-ink/30 group-active:bg-ink/45';

export default function FutureFeatureOverlay({
  children,
  className = '',
  badgeClassName = '',
}: FutureFeatureOverlayProps) {
  return (
    <div
      className={`group relative rounded-lg ring-1 ring-ink/10 ring-inset transition-shadow duration-150 group-hover:ring-ink/25 group-active:ring-ink/35 ${className}`}
    >
      <div className="relative z-0 opacity-[0.78] pointer-events-none select-none">{children}</div>
      <div className={scrimClasses} aria-hidden />
      <div
        className={`absolute top-3 right-3 z-[2] pointer-events-none transition-transform duration-150 group-hover:scale-[1.02] ${badgeClassName}`}
      >
        <FutureFeatureBadge />
      </div>
    </div>
  );
}
