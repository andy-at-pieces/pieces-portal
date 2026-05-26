'use client';

import { useMemo } from 'react';
import { SectionLabel } from '@/components/ui';
import {
  getTimeBreakdown,
  TIME_BREAKDOWN_SEGMENT_COLORS,
  type InsightsRole,
  type TimeBreakdownKpiContext,
  type TimeBreakdownSegment,
} from '@/lib/insights/timeBreakdown';

function SegmentTooltip({ segment }: { segment: TimeBreakdownSegment }) {
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <div className="whitespace-nowrap rounded-md border border-surface-200 bg-white px-2.5 py-1.5 shadow-sm text-[11px]">
        <span className="font-medium text-ink">{segment.label}</span>
        <span className="text-ink-400 mx-1.5">·</span>
        <span className="font-mono text-ink-600">{segment.hours}h</span>
        <span className="text-ink-400 mx-1">({segment.pct}%)</span>
      </div>
    </div>
  );
}

export default function TimeBreakdownSection({
  role,
  kpiContext,
}: {
  role: InsightsRole;
  kpiContext?: TimeBreakdownKpiContext;
}) {
  const data = useMemo(
    () => getTimeBreakdown(role, kpiContext),
    [role, kpiContext?.primaryShareNorthStar]
  );

  return (
    <section aria-label="Time breakdown last 30 days">
      <SectionLabel note="Where time actually went, against the KPIs you set">
        Time breakdown · last 30 days
      </SectionLabel>

      <div className="rounded-card border border-surface-200 px-4 py-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[10px] font-mono text-ink-400 uppercase tracking-wider">
            Tracked time · {data.totalHours}h
          </span>
          <span className="text-[10px] font-mono text-ink-400">
            Refreshes weekly · {data.periodKey}
          </span>
        </div>

        <div
          className="flex h-3.5 rounded-full overflow-hidden bg-surface-100"
          role="img"
          aria-label={`Time breakdown for last 30 days: ${data.segments
            .map((s) => `${s.label} ${s.pct}%`)
            .join(', ')}`}
        >
          {data.segments.map((segment) => (
            <div
              key={segment.id}
              className={`group relative h-full ${TIME_BREAKDOWN_SEGMENT_COLORS[segment.id]} ${
                segment.pct < 4 ? 'min-w-[6px]' : ''
              }`}
              style={{ width: `${segment.pct}%` }}
              tabIndex={0}
            >
              <SegmentTooltip segment={segment} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
          {data.segments.map((segment) => (
            <div key={segment.id} className="flex items-center gap-1.5 text-[11px] text-ink-500">
              <span
                className={`w-2 h-2 rounded-sm shrink-0 ${TIME_BREAKDOWN_SEGMENT_COLORS[segment.id]}`}
                aria-hidden
              />
              <span>{segment.label}</span>
              <span className="font-mono text-ink-400">{segment.pct}%</span>
            </div>
          ))}
        </div>

        <ul className="mt-3 pt-3 border-t border-surface-200 space-y-1.5">
          {data.observations.map((line) => (
            <li key={line} className="text-[12px] text-ink-500 leading-snug">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
