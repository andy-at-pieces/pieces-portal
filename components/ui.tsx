import { ReactNode } from 'react';

export function PageHeader({
  kicker,
  title,
  subtitle,
  meta,
}: {
  kicker?: string;
  title: ReactNode;
  subtitle?: string;
  meta?: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-8">
      <div>
        {kicker && (
          <div className="text-[11px] font-semibold tracking-[0.1em] text-ink-400 uppercase mb-2">
            {kicker}
          </div>
        )}
        <h2 className="text-[28px] font-bold text-ink tracking-tight font-display leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-ink-500 mt-2 max-w-[640px] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {meta && <div className="text-right text-sm text-ink-500">{meta}</div>}
    </div>
  );
}

export function SectionLabel({
  children,
  note,
}: {
  children: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between mt-8 mb-3">
      <div className="text-[11px] font-semibold tracking-[0.1em] text-ink-400 uppercase">
        {children}
      </div>
      {note && (
        <div className="text-xs text-ink-400 font-mono">{note}</div>
      )}
    </div>
  );
}

export function Card({
  children,
  className = '',
  padding = 'default',
}: {
  children: ReactNode;
  className?: string;
  padding?: 'default' | 'lg' | 'none';
}) {
  const padCls =
    padding === 'lg' ? 'p-6' : padding === 'none' ? '' : 'p-5';
  return (
    <div
      className={`rounded-card border border-surface-200 bg-white ${padCls} ${className}`}
    >
      {children}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  unit,
  delta,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  tone?: 'pos' | 'neg' | 'warn' | 'neutral';
}) {
  const toneCls =
    tone === 'pos'
      ? 'text-accent-green'
      : tone === 'neg'
      ? 'text-accent-red'
      : tone === 'warn'
      ? 'text-accent-orange'
      : 'text-ink-500';
  return (
    <Card>
      <div className="text-[11px] font-medium text-ink-500 mb-2.5">{label}</div>
      <div className="flex items-baseline">
        <span className="font-display font-bold text-[28px] text-ink tracking-tight leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-ink-500 font-medium ml-1">{unit}</span>
        )}
      </div>
      {delta && (
        <div className={`text-[11px] font-mono mt-2 ${toneCls}`}>{delta}</div>
      )}
    </Card>
  );
}
