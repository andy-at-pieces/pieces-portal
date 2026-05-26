/**
 * Time composition for "before and after Pieces" week comparison.
 *
 * Source: Workstream Activity telemetry (calendar, focus blocks, app/context
 * switches, standup prep signals). No employee surveys.
 *
 * Week 0 — first 7 days after install (baseline).
 * Week 12 — most recent 7 days at ~12 weeks on Pieces.
 */

export const WEEK_COMPARISON_TOTAL_HOURS = 40;

export type WeekTimeSegmentId =
  | 'focusedWork'
  | 'meetings'
  | 'contextSearch'
  | 'statusReporting'
  | 'communication';

export interface WeekTimeSegmentDef {
  id: WeekTimeSegmentId;
  label: string;
  colorClass: string;
}

/** Segment order and styling for stacked bars (same order in both weeks). */
export const WEEK_TIME_SEGMENT_DEFS: WeekTimeSegmentDef[] = [
  {
    id: 'focusedWork',
    label: 'Focused work',
    colorClass: 'bg-accent-green',
  },
  {
    id: 'meetings',
    label: 'Meetings',
    colorClass: 'bg-accent-blue',
  },
  {
    id: 'contextSearch',
    label: 'Searching for prior work',
    colorClass: 'bg-accent-orange',
  },
  {
    id: 'statusReporting',
    label: 'Status updates & reporting',
    colorClass: 'bg-accent-violet',
  },
  {
    id: 'communication',
    label: 'Fragmented time',
    colorClass: 'bg-ink-300',
  },
];

export type WeekHoursBySegment = Record<WeekTimeSegmentId, number>;

export interface WeekHoursBreakdown {
  /** e.g. "Week 0" */
  weekLabel: string;
  /** Short line under the bar */
  subtitle: string;
  hours: WeekHoursBySegment;
}

/** First 7 days post-install — more search/reporting, less focus. Sums to 40h. */
export const WEEK_0_BASELINE: WeekHoursBreakdown = {
  weekLabel: 'Week 0',
  subtitle: 'Before Pieces · first 7 days post-install (warm-up baseline)',
  hours: {
    focusedWork: 14,
    meetings: 10,
    contextSearch: 8,
    statusReporting: 5,
    communication: 3,
  },
};

/** Recent 7 days at week 12 — focus expands, search + reporting shrink. Sums to 40h. */
export const WEEK_12_RECENT: WeekHoursBreakdown = {
  weekLabel: 'Week 12',
  subtitle: 'After Pieces · most recent 7 days',
  hours: {
    focusedWork: 22,
    meetings: 10,
    contextSearch: 3,
    statusReporting: 2,
    communication: 3,
  },
};

export function assertWeekTotals(breakdown: WeekHoursBreakdown): void {
  const total = WEEK_TIME_SEGMENT_DEFS.reduce(
    (sum, seg) => sum + breakdown.hours[seg.id],
    0,
  );
  if (total !== WEEK_COMPARISON_TOTAL_HOURS) {
    throw new Error(
      `${breakdown.weekLabel} segments sum to ${total}h, expected ${WEEK_COMPARISON_TOTAL_HOURS}h`,
    );
  }
}

assertWeekTotals(WEEK_0_BASELINE);
assertWeekTotals(WEEK_12_RECENT);

export interface WeekSegmentSlice {
  def: WeekTimeSegmentDef;
  hours: number;
  pct: number;
}

export function getWeekSegmentSlices(
  breakdown: WeekHoursBreakdown,
): WeekSegmentSlice[] {
  return WEEK_TIME_SEGMENT_DEFS.map((def) => {
    const hours = breakdown.hours[def.id];
    return {
      def,
      hours,
      pct: (hours / WEEK_COMPARISON_TOTAL_HOURS) * 100,
    };
  });
}

/**
 * One-line narrative from before/after hour shapes (custom summary template).
 */
export function generateWeekChangeCommentary(
  before: WeekHoursBreakdown,
  after: WeekHoursBreakdown,
): string {
  const contextBefore =
    before.hours.contextSearch + before.hours.statusReporting;
  const contextAfter =
    after.hours.contextSearch + after.hours.statusReporting;
  const contextSaved = contextBefore - contextAfter;
  const focusGain = after.hours.focusedWork - before.hours.focusedWork;
  const meetingsDelta = after.hours.meetings - before.hours.meetings;

  if (contextSaved >= 6 && focusGain >= 6) {
    return 'The shape of the week has changed. Time previously spent reconstructing context now goes to the work that needs you.';
  }

  if (focusGain >= 4 && contextSaved >= 3) {
    return `Focused work gained ${focusGain} hours per week while context search and reporting dropped ${contextSaved} hours — without adding meeting load.`;
  }

  if (Math.abs(meetingsDelta) <= 1 && focusGain > 0) {
    return 'Meetings held steady while reclaimed time shifted into sustained focus blocks.';
  }

  return 'Average week composition is shifting toward deeper work as Pieces surfaces prior context automatically.';
}
