export type ContextResolutionTelemetryEvent = {
  /** ISO date string */
  ts: string;
  /** Time from context query -> opening a relevant file (minutes) */
  minutesToResolution: number;
};

// In v1 this is a small deterministic dataset that represents OS-level workstream telemetry.
// It is intentionally shaped like real events so it can be replaced with real ingestion later.
const WEEK_1_EVENTS: ContextResolutionTelemetryEvent[] = [
  { ts: '2026-02-03T13:10:00Z', minutesToResolution: 6.9 },
  { ts: '2026-02-03T15:22:00Z', minutesToResolution: 5.8 },
  { ts: '2026-02-04T12:40:00Z', minutesToResolution: 6.1 },
  { ts: '2026-02-05T16:05:00Z', minutesToResolution: 7.2 },
  { ts: '2026-02-06T14:31:00Z', minutesToResolution: 6.4 },
];

const WEEK_12_EVENTS: ContextResolutionTelemetryEvent[] = [
  { ts: '2026-04-21T13:08:00Z', minutesToResolution: 2.6 },
  { ts: '2026-04-21T15:18:00Z', minutesToResolution: 2.2 },
  { ts: '2026-04-22T12:52:00Z', minutesToResolution: 2.0 },
  { ts: '2026-04-23T16:11:00Z', minutesToResolution: 2.4 },
  { ts: '2026-04-24T14:26:00Z', minutesToResolution: 1.9 },
];

function avgMinutes(events: ContextResolutionTelemetryEvent[]): number {
  if (events.length === 0) return 0;
  return events.reduce((sum, e) => sum + e.minutesToResolution, 0) / events.length;
}

export function getContextResolutionSummary(): {
  week1AvgMinutes: number;
  week12AvgMinutes: number;
  deltaMinutes: number;
} {
  const week1AvgMinutes = avgMinutes(WEEK_1_EVENTS);
  const week12AvgMinutes = avgMinutes(WEEK_12_EVENTS);
  const deltaMinutes = Math.max(0, Math.round((week1AvgMinutes - week12AvgMinutes) * 10) / 10);
  return { week1AvgMinutes, week12AvgMinutes, deltaMinutes };
}

