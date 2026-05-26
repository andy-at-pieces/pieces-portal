import type { KpiDefinition, KpiId } from './types';

export const KPI_CATALOG: KpiDefinition[] = [
  {
    id: 'focus',
    name: 'Focus Time per Day',
    desc: 'Sustained, uninterrupted work blocks. Low fragmentation means shipping time, not switching time.',
    defaultTarget: '5h/day',
    measureCadence: 'Measured weekly',
    recommendOrder: 1,
  },
  {
    id: 'primary',
    name: 'Primary Project Share',
    desc: 'Percent of working time on the strategic initiative for the quarter. Rising share means focus on what matters.',
    defaultTarget: '55%+',
    measureCadence: 'Measured monthly',
    recommendOrder: 2,
  },
  {
    id: 'review',
    name: 'Review & Mentorship Load',
    desc: 'Time spent in PRs, design review, and mentoring. Balances IC output against team multiplier effects.',
    defaultTarget: '8–15h/week',
    measureCadence: 'Measured weekly',
    recommendOrder: 4,
  },
  {
    id: 'concentration',
    name: 'Knowledge Concentration',
    desc: 'Lower is better. High values indicate critical context sitting with one person, a risk to shared ownership.',
    defaultTarget: '< 0.4',
    measureCadence: 'Team-shared',
    recommendOrder: 3,
  },
  {
    id: 'ai',
    name: 'AI Utilization Ratio',
    desc: 'Percent of output touched by AI tooling. Tracks adoption of approved AI spend, not seat counts.',
    defaultTarget: '40%+',
    measureCadence: 'Measured weekly',
    recommendOrder: 5,
  },
  {
    id: 'context',
    name: 'Context Savings',
    desc: 'Time reclaimed from searching for prior work, meeting recall, and handoffs. A Pieces-unique benchmark.',
    defaultTarget: '20+ hrs/month',
    measureCadence: 'Measured monthly',
    recommendOrder: 6,
  },
];

export function getKpiById(id: KpiId): KpiDefinition {
  const kpi = KPI_CATALOG.find((k) => k.id === id);
  if (!kpi) throw new Error(`Unknown KPI: ${id}`);
  return kpi;
}

export function kpiMetaLine(kpi: KpiDefinition, target: string): string {
  return `Suggested · ${target} · ${kpi.measureCadence}`;
}
