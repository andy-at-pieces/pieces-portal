export type FocusBlockTelemetrySample = {
  /** ISO date string */
  ts: string;
  /** Minutes of uninterrupted work (no context switches) */
  blockMinutes: number;
};

// v1: deterministic representation of app-switching telemetry-derived focus blocks.
const WEEK_1_BLOCKS: FocusBlockTelemetrySample[] = [
  { ts: '2026-02-03T14:05:00Z', blockMinutes: 18 },
  { ts: '2026-02-04T11:22:00Z', blockMinutes: 22 },
  { ts: '2026-02-05T16:40:00Z', blockMinutes: 19 },
  { ts: '2026-02-06T13:10:00Z', blockMinutes: 24 },
  { ts: '2026-02-07T10:55:00Z', blockMinutes: 21 },
];

const WEEK_12_BLOCKS: FocusBlockTelemetrySample[] = [
  { ts: '2026-04-21T14:03:00Z', blockMinutes: 31 },
  { ts: '2026-04-22T11:18:00Z', blockMinutes: 34 },
  { ts: '2026-04-23T16:32:00Z', blockMinutes: 30 },
  { ts: '2026-04-24T13:07:00Z', blockMinutes: 33 },
  { ts: '2026-04-25T10:42:00Z', blockMinutes: 36 },
];

function avg(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function getFocusBlockSummary(): {
  week1AvgMinutes: number;
  week12AvgMinutes: number;
} {
  const week1AvgMinutes = Math.round(avg(WEEK_1_BLOCKS.map((b) => b.blockMinutes)) * 10) / 10;
  const week12AvgMinutes = Math.round(avg(WEEK_12_BLOCKS.map((b) => b.blockMinutes)) * 10) / 10;
  return { week1AvgMinutes, week12AvgMinutes };
}

