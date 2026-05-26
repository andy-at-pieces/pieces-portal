import { KPI_CATALOG } from './kpis';
import type { KpiId, KpiSelection } from './types';

const AUTO_SELECT_COUNT = 3;

/** Top recommended KPI ids for Staff Engineering (and default role). */
const STAFF_ENGINEERING_RECOMMENDED: KpiId[] = ['focus', 'primary', 'concentration'];

export function recommendedKpiIdsForRole(_roleId: string): KpiId[] {
  return STAFF_ENGINEERING_RECOMMENDED;
}

export function applyRoleKpiDefaults(roleId: string): KpiSelection[] {
  const recommended = new Set(recommendedKpiIdsForRole(roleId));
  const sorted = [...KPI_CATALOG].sort((a, b) => a.recommendOrder - b.recommendOrder);
  const topIds = new Set(
    sorted
      .filter((k) => recommended.has(k.id))
      .slice(0, AUTO_SELECT_COUNT)
      .map((k) => k.id),
  );

  if (topIds.size < AUTO_SELECT_COUNT) {
    for (const kpi of sorted) {
      if (topIds.size >= AUTO_SELECT_COUNT) break;
      topIds.add(kpi.id);
    }
  }

  return KPI_CATALOG.map((kpi) => ({
    id: kpi.id,
    selected: topIds.has(kpi.id),
    target: kpi.defaultTarget,
  }));
}

export function createInitialKpiSelections(roleId: string): KpiSelection[] {
  return applyRoleKpiDefaults(roleId);
}
