'use client';

import { useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  MessageCircle,
  Minus,
  Moon,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Card, SectionLabel } from '@/components/ui';
import type { OrgPulseSignal, OrgPulseTone, OrgPulseTrend } from '@/lib/reports/orgPulse';
import { getManagerOrgPulse } from '@/lib/reports/orgPulse';

const toneStyles: Record<OrgPulseTone, { state: string }> = {
  positive: { state: 'text-accent-green' },
  neutral: { state: 'text-ink-600' },
  caution: { state: 'text-accent-orange' },
};

const signalIcons = {
  engagement: MessageCircle,
  'meeting-load': CalendarDays,
  'after-hours': Moon,
} as const;

function TrendGlyph({ trend }: { trend: OrgPulseTrend }) {
  if (trend === 'up') {
    return <TrendingUp className="w-3 h-3" strokeWidth={2.25} aria-hidden />;
  }
  if (trend === 'down') {
    return <TrendingDown className="w-3 h-3" strokeWidth={2.25} aria-hidden />;
  }
  return <Minus className="w-3 h-3" strokeWidth={2.25} aria-hidden />;
}

function PulseRow({
  signal,
  expanded,
  onToggle,
  showBorder,
}: {
  signal: OrgPulseSignal;
  expanded: boolean;
  onToggle: () => void;
  showBorder: boolean;
}) {
  const styles = toneStyles[signal.tone];
  const Icon = signalIcons[signal.id as keyof typeof signalIcons] ?? MessageCircle;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className={`w-full text-left px-5 py-3.5 transition-colors hover:bg-surface-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink/10 ${
        showBorder ? 'border-b border-surface-200 md:border-b-0' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon className="w-3.5 h-3.5 text-ink-400 mt-0.5 shrink-0" strokeWidth={2} />
        <div className="flex-1 min-w-0 grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 items-baseline">
          <div className="text-[11px] font-medium text-ink-500">{signal.label}</div>
          <div className="flex items-center gap-1.5 justify-end">
            <span className={`text-sm font-semibold font-display ${styles.state}`}>
              {signal.state}
            </span>
            <span className={styles.state} aria-hidden>
              <TrendGlyph trend={signal.trend} />
            </span>
            <ChevronDown
              className={`w-3 h-3 text-ink-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
              strokeWidth={2.25}
              aria-hidden
            />
          </div>
          <div className="text-[12px] text-ink-500 leading-snug col-span-2">{signal.driver}</div>
          {expanded && (
            <p className="text-[12px] text-ink-600 col-span-2 mt-2 pt-2 border-t border-surface-100 leading-relaxed">
              {signal.expandedSummary}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default function OrgPulse({ signals = getManagerOrgPulse() }: { signals?: OrgPulseSignal[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section aria-label="Team pulse signals">
      <SectionLabel note="Team-level · click to expand">Pulse · beyond the numbers</SectionLabel>
      <Card padding="none" className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-surface-200">
          {signals.map((signal, i) => (
            <PulseRow
              key={signal.id}
              signal={signal}
              expanded={expandedId === signal.id}
              showBorder={i < signals.length - 1}
              onToggle={() =>
                setExpandedId((current) => (current === signal.id ? null : signal.id))
              }
            />
          ))}
        </div>
      </Card>
    </section>
  );
}
