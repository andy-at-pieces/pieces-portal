import { ReactNode } from 'react';

type FutureFeatureOverlayProps = {
  children: ReactNode;
  className?: string;
  badgeClassName?: string;
};

export default function FutureFeatureOverlay({
  children,
  className = '',
  badgeClassName = '',
}: FutureFeatureOverlayProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="opacity-60 pointer-events-none select-none">{children}</div>
      <div
        className={`absolute top-3 right-3 z-10 pointer-events-none ${badgeClassName}`}
        aria-hidden
      >
        <span className="inline-flex items-center rounded-md border border-surface-300 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-[0.04em] text-ink-500 shadow-sm">
          v2: Coming Later
        </span>
      </div>
    </div>
  );
}
