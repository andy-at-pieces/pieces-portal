import { getKpiById } from './kpis';
import type { KpiId } from './types';

const ROLE_NORTH_STARS: Record<string, string> = {
  'engineering-staff-engineering':
    'Stay focused on the strategic initiative, protect deep work, and keep critical context shared across the team.',
  'go-to-market-revenue':
    'Keep pipeline work ahead of meeting load, and make revenue-facing time visible in weekly pulses.',
  'customer-success-team':
    'Protect customer outcomes while keeping meeting load and handoff time in a sustainable band.',
};

export function getNorthStarStatement(roleId: string, selectedKpiIds: KpiId[]): string {
  const base = ROLE_NORTH_STARS[roleId];
  if (base) return base;

  if (selectedKpiIds.length === 0) {
    return 'Define what success looks like for this role so Pieces can draft weekly pulse reports and flag drift.';
  }

  const names = selectedKpiIds.map((id) => getKpiById(id).name.toLowerCase());
  return `Prioritize ${names.slice(0, -1).join(', ')}${names.length > 1 ? ', and ' : ''}${names[names.length - 1]} — Pieces will reflect progress in weekly pulses.`;
}
