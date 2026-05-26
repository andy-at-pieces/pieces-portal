import { getWeeklyPeriodKey } from '@/lib/scores/aiUtilization';

export type InsightsRole = 'engineering' | 'go-to-market' | 'customer-success';

export type TimeBreakdownSegmentId =
  | 'primary'
  | 'secondary'
  | 'internalMeetings'
  | 'externalMeetings'
  | 'communication'
  | 'fragmented';

export type TimeBreakdownSegment = {
  id: TimeBreakdownSegmentId;
  label: string;
  pct: number;
  hours: number;
  /** Change vs prior 30-day window (percentage points). */
  priorPeriodPctDelta?: number;
};

export type TimeBreakdownKpiContext = {
  /** North Star target for primary initiative share (0–100). */
  primaryShareNorthStar?: number;
};

export type TimeBreakdownResult = {
  role: InsightsRole;
  periodKey: string;
  totalHours: number;
  segments: TimeBreakdownSegment[];
  observations: string[];
  cachedAt: number;
};

const GTM_CS_ROLES: InsightsRole[] = ['go-to-market', 'customer-success'];

export function roleShowsExternalMeetings(role: InsightsRole): boolean {
  return GTM_CS_ROLES.includes(role);
}

export const INSIGHTS_ROLES: { id: InsightsRole; label: string; teamLabel: string }[] = [
  { id: 'engineering', label: 'Engineering', teamLabel: 'Staff Engineering' },
  { id: 'go-to-market', label: 'Go-to-Market', teamLabel: 'Revenue · GTM' },
  { id: 'customer-success', label: 'Customer Success', teamLabel: 'Customer Success' },
];

const ROLE_SEGMENT_PROFILES: Record<
  InsightsRole,
  Omit<TimeBreakdownSegment, 'id' | 'label'>[]
> = {
  engineering: [
    { pct: 58, hours: 95, priorPeriodPctDelta: 2 },
    { pct: 14, hours: 23, priorPeriodPctDelta: -1 },
    { pct: 12, hours: 20, priorPeriodPctDelta: 12 },
    { pct: 0, hours: 0 },
    { pct: 11, hours: 18, priorPeriodPctDelta: 0 },
    { pct: 5, hours: 8, priorPeriodPctDelta: -1 },
  ],
  'go-to-market': [
    { pct: 42, hours: 69, priorPeriodPctDelta: -3 },
    { pct: 15, hours: 25, priorPeriodPctDelta: 1 },
    { pct: 10, hours: 16, priorPeriodPctDelta: 4 },
    { pct: 18, hours: 30, priorPeriodPctDelta: 2 },
    { pct: 10, hours: 16, priorPeriodPctDelta: 1 },
    { pct: 5, hours: 8, priorPeriodPctDelta: 0 },
  ],
  'customer-success': [
    { pct: 38, hours: 62, priorPeriodPctDelta: -5 },
    { pct: 12, hours: 20, priorPeriodPctDelta: 0 },
    { pct: 14, hours: 23, priorPeriodPctDelta: 8 },
    { pct: 22, hours: 36, priorPeriodPctDelta: 3 },
    { pct: 9, hours: 15, priorPeriodPctDelta: -2 },
    { pct: 5, hours: 8, priorPeriodPctDelta: 0 },
  ],
};

const SEGMENT_DEFS: { id: TimeBreakdownSegmentId; label: string }[] = [
  { id: 'primary', label: 'Primary initiative' },
  { id: 'secondary', label: 'Secondary projects' },
  { id: 'internalMeetings', label: 'Internal meetings' },
  { id: 'externalMeetings', label: 'External meetings' },
  { id: 'communication', label: 'Communication tools' },
  { id: 'fragmented', label: 'Fragmented / context-switching' },
];

function buildSegments(role: InsightsRole): TimeBreakdownSegment[] {
  const profile = ROLE_SEGMENT_PROFILES[role];
  const showExternal = roleShowsExternalMeetings(role);

  const raw = SEGMENT_DEFS.map((def, i) => ({
    ...def,
    ...profile[i],
  }));

  const visible = raw.filter(
    (seg) => showExternal || seg.id !== 'externalMeetings'
  );

  const visibleTotal = visible.reduce((sum, seg) => sum + seg.pct, 0);
  if (visibleTotal === 0) return visible;

  const scale = 100 / visibleTotal;
  return visible.map((seg) => ({
    ...seg,
    pct: Math.round(seg.pct * scale * 10) / 10,
    hours: Math.round(seg.hours * scale),
  }));
}

export function generateTimeBreakdownObservations(
  role: InsightsRole,
  segments: TimeBreakdownSegment[],
  kpiContext: TimeBreakdownKpiContext = {}
): string[] {
  const northStar = kpiContext.primaryShareNorthStar ?? 55;
  const primary = segments.find((s) => s.id === 'primary');
  const internal = segments.find((s) => s.id === 'internalMeetings');
  const fragmented = segments.find((s) => s.id === 'fragmented');
  const external = segments.find((s) => s.id === 'externalMeetings');

  const observations: string[] = [];

  if (primary) {
    if (primary.pct >= northStar) {
      observations.push(
        `Primary initiative share is ${primary.pct}%, above the ${northStar}% North Star — focus is holding.`
      );
    } else if (primary.pct >= northStar - 5) {
      observations.push(
        `Primary initiative share is ${primary.pct}%, within a few points of the ${northStar}% North Star — worth protecting in the next sprint cycle.`
      );
    } else {
      observations.push(
        `Primary initiative share slipped to ${primary.pct}% against a ${northStar}% North Star — secondary work may be crowding the quarter priority.`
      );
    }
  }

  if (internal) {
    const delta = internal.priorPeriodPctDelta ?? 0;
    if (Math.abs(delta) < 4) {
      observations.push(
        `Internal meetings held steady at ${internal.pct}% of tracked time — within normal range for this team.`
      );
    } else if (delta > 0) {
      observations.push(
        `Internal meetings climbed ${delta}% vs prior 30 days. Worth watching.`
      );
    } else {
      observations.push(
        `Internal meetings eased ${Math.abs(delta)}% vs prior 30 days — more calendar room for deep work.`
      );
    }
  }

  if (fragmented) {
    const teamSizeHint =
      role === 'customer-success' ? 'this CS pod size' : 'this team size';
    if (fragmented.pct <= 6) {
      observations.push(
        `Fragmented time at ${fragmented.pct}% — low and healthy for ${teamSizeHint}.`
      );
    } else if (fragmented.pct <= 10) {
      observations.push(
        `Fragmented time at ${fragmented.pct}% — moderate for ${teamSizeHint}; Slack and email still manageable.`
      );
    } else {
      observations.push(
        `Fragmented time at ${fragmented.pct}% — elevated for ${teamSizeHint}; context-switching may be eating focus blocks.`
      );
    }
  }

  if (roleShowsExternalMeetings(role) && external && external.pct >= 18 && observations.length >= 2) {
    observations[1] =
      `External meetings held at ${external.pct}% — in range for ${role === 'go-to-market' ? 'GTM' : 'Customer Success'}, with internal meetings at ${internal?.pct ?? 0}%.`;
  }

  return observations.slice(0, 3);
}

type CacheEntry = TimeBreakdownResult;

const memoryCache = new Map<string, CacheEntry>();

const LOCAL_STORAGE_PREFIX = 'pieces:time-breakdown:';

function cacheKey(role: InsightsRole, periodKey: string): string {
  return `${role}:${periodKey}`;
}

function readLocalCache(key: string): CacheEntry | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${key}`);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeLocalCache(key: string, entry: CacheEntry): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    /* quota or private mode */
  }
}

export function getTimeBreakdown(
  role: InsightsRole,
  kpiContext: TimeBreakdownKpiContext = {},
  date = new Date()
): TimeBreakdownResult {
  const periodKey = getWeeklyPeriodKey(date);
  const key = cacheKey(role, periodKey);

  const withObservations = (
    base: Omit<TimeBreakdownResult, 'observations'>
  ): TimeBreakdownResult => ({
    ...base,
    observations: generateTimeBreakdownObservations(role, base.segments, kpiContext),
  });

  const cached = memoryCache.get(key);
  if (cached) return withObservations(cached);

  const fromStorage = readLocalCache(key);
  if (fromStorage) {
    memoryCache.set(key, fromStorage);
    return withObservations(fromStorage);
  }

  const segments = buildSegments(role);
  const totalHours = segments.reduce((sum, s) => sum + s.hours, 0);
  const result: TimeBreakdownResult = {
    role,
    periodKey,
    totalHours,
    segments,
    observations: [],
    cachedAt: Date.now(),
  };

  memoryCache.set(key, result);
  writeLocalCache(key, result);
  return withObservations(result);
}

/** Segment colors for the stacked bar (Tailwind class names). */
export const TIME_BREAKDOWN_SEGMENT_COLORS: Record<TimeBreakdownSegmentId, string> = {
  primary: 'bg-ink-700',
  secondary: 'bg-accent-violet',
  internalMeetings: 'bg-accent-orange',
  externalMeetings: 'bg-accent-teal',
  communication: 'bg-accent-blue',
  fragmented: 'bg-ink-300',
};
