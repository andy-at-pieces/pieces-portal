export type NewHireTelemetryRow = {
  hireId: string;
  /** Week number since start (1-4) */
  week: 1 | 2 | 3 | 4;
  /** Primary project share (%) */
  primaryProjectSharePct: number;
};

// v1: deterministic representation of new-hire workstream concentration patterns.
const NEW_HIRE_ACTIVITY: NewHireTelemetryRow[] = [
  { hireId: 'nh-001', week: 1, primaryProjectSharePct: 22 },
  { hireId: 'nh-001', week: 2, primaryProjectSharePct: 38 },
  { hireId: 'nh-001', week: 3, primaryProjectSharePct: 52 },
  { hireId: 'nh-001', week: 4, primaryProjectSharePct: 59 },
  { hireId: 'nh-002', week: 1, primaryProjectSharePct: 18 },
  { hireId: 'nh-002', week: 2, primaryProjectSharePct: 34 },
  { hireId: 'nh-002', week: 3, primaryProjectSharePct: 47 },
  { hireId: 'nh-002', week: 4, primaryProjectSharePct: 55 },
  { hireId: 'nh-003', week: 1, primaryProjectSharePct: 25 },
  { hireId: 'nh-003', week: 2, primaryProjectSharePct: 41 },
  { hireId: 'nh-003', week: 3, primaryProjectSharePct: 54 },
  { hireId: 'nh-003', week: 4, primaryProjectSharePct: 62 },
  { hireId: 'nh-004', week: 1, primaryProjectSharePct: 20 },
  { hireId: 'nh-004', week: 2, primaryProjectSharePct: 35 },
  { hireId: 'nh-004', week: 3, primaryProjectSharePct: 49 },
  { hireId: 'nh-004', week: 4, primaryProjectSharePct: 57 },
];

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function avg(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function getNewHireContextVelocitySummary(): {
  week3PrimarySharePct: number;
  hireCount: number;
  weeksToPrimaryShare: number;
} {
  const hires = uniq(NEW_HIRE_ACTIVITY.map((r) => r.hireId));
  const hireCount = hires.length;

  const week3 = NEW_HIRE_ACTIVITY.filter((r) => r.week === 3).map((r) => r.primaryProjectSharePct);
  const week3PrimarySharePct = Math.round(avg(week3));

  // v1: interpret reaching primary-project concentration as ~50% share.
  // Calculate the average week when hires cross >=50%.
  const crossingWeeks = hires
    .map((hireId) => {
      const rows = NEW_HIRE_ACTIVITY.filter((r) => r.hireId === hireId).sort((a, b) => a.week - b.week);
      return rows.find((r) => r.primaryProjectSharePct >= 50)?.week ?? 4;
    })
    .map((w) => Number(w));
  const weeksToPrimaryShare = Math.round(avg(crossingWeeks) * 10) / 10;

  return { week3PrimarySharePct, hireCount, weeksToPrimaryShare };
}

