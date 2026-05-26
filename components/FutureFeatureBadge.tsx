type FutureFeatureBadgeProps = {
  className?: string;
};

export default function FutureFeatureBadge({ className = '' }: FutureFeatureBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg ring-2 ring-white/80 ${className}`}
    >
      <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/90">
        v2
      </span>
      Coming Soon
    </span>
  );
}
