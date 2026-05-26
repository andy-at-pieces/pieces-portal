import { Card, SectionLabel } from '@/components/ui';
import {
  generateWeekChangeCommentary,
  getWeekSegmentSlices,
  WEEK_0_BASELINE,
  WEEK_12_RECENT,
  WEEK_COMPARISON_TOTAL_HOURS,
  type WeekHoursBreakdown,
} from '@/lib/benchmarks/weekComparison';

function StackedWeekBar({ breakdown }: { breakdown: WeekHoursBreakdown }) {
  const slices = getWeekSegmentSlices(breakdown);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <div>
          <div className="font-display font-semibold text-[15px] text-ink">{breakdown.weekLabel}</div>
          <div className="text-[11px] text-ink-400 mt-0.5">{breakdown.subtitle}</div>
        </div>
        <div className="text-xs font-mono text-ink-500 tabular-nums">{WEEK_COMPARISON_TOTAL_HOURS}h week</div>
      </div>
      <div
        className="flex h-8 w-full overflow-hidden rounded-lg border border-surface-200 bg-surface-100"
        role="img"
        aria-label={`${breakdown.weekLabel}: ${slices.map((s) => `${s.def.label} ${s.hours}h`).join(', ')}`}
      >
        {slices.map((slice) => (
          <div
            key={slice.def.id}
            className={`${slice.def.colorClass} h-full min-w-[2px]`}
            style={{ width: `${slice.pct}%` }}
            title={`${slice.def.label}: ${slice.hours}h`}
          />
        ))}
      </div>
    </div>
  );
}

export default function WeekComparisonSection() {
  const commentary = generateWeekChangeCommentary(WEEK_0_BASELINE, WEEK_12_RECENT);

  return (
    <>
      <SectionLabel note="Workstream Activity · 7-day windows">
        How the Week Has Changed.
      </SectionLabel>
      <Card padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StackedWeekBar breakdown={WEEK_0_BASELINE} />
          <StackedWeekBar breakdown={WEEK_12_RECENT} />
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mt-5 pt-4 border-t border-surface-200">
          {getWeekSegmentSlices(WEEK_0_BASELINE).map((slice) => (
            <li key={slice.def.id} className="flex items-center gap-1.5 text-[10px] text-ink-500">
              <span className={`w-2 h-2 rounded-sm ${slice.def.colorClass}`} aria-hidden />
              {slice.def.label}
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-ink-500 mt-4 leading-snug border-t border-surface-200 pt-4">
          {commentary}
        </p>
      </Card>
    </>
  );
}
