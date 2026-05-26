export type DepartmentType =
  | 'engineering'
  | 'product-design'
  | 'data-platform'
  | 'go-to-market'
  | 'customer-success'
  | 'sales'
  | 'operations'
  | 'it'
  | 'support'
  | 'finance-admin'
  | 'initiative';

export type LensId =
  | 'focus-fragmentation'
  | 'meetings-revenue'
  | 'interruptions-resolution'
  | 'concentration-risk';

export type LensStatus = 'healthy' | 'watch' | 'overload';

export type LensMetric = {
  name: string;
  value: number;
  display: string;
};

export type DepartmentLensThresholds = {
  healthyRange: string;
  overloadThreshold: string;
};

export type DepartmentLensDefinition = DepartmentLensThresholds & {
  lensId: LensId;
  lensLabel: string;
  metricALabel: string;
  metricBLabel: string;
};

export type DepartmentLensMetrics = {
  focusPct?: number;
  fragmentationPct?: number;
  meetingsPct?: number;
  revenueWorkPct?: number;
  interruptionsPerWeek?: number;
  avgResolutionHours?: number;
  interruptionsTrend?: 'up' | 'down' | 'flat';
  resolutionTrend?: 'up' | 'down' | 'flat';
  topContributorPct?: number;
};

export type DepartmentLensView = DepartmentLensDefinition & {
  metricA: LensMetric;
  metricB: LensMetric;
  status: LensStatus;
  statusLabel: string;
  summaryLine: string;
};

const LENS_BY_TYPE: Record<DepartmentType, DepartmentLensDefinition> = {
  engineering: {
    lensId: 'focus-fragmentation',
    lensLabel: 'Focus vs fragmentation',
    metricALabel: 'Focus',
    metricBLabel: 'Fragmentation',
    healthyRange: 'Focus ≥55% with fragmentation ≤35%',
    overloadThreshold: 'Fragmentation ≥45% or focus <45%',
  },
  'product-design': {
    lensId: 'focus-fragmentation',
    lensLabel: 'Focus vs fragmentation',
    metricALabel: 'Focus',
    metricBLabel: 'Fragmentation',
    healthyRange: 'Focus ≥55% with fragmentation ≤35%',
    overloadThreshold: 'Fragmentation ≥45% or focus <45%',
  },
  'data-platform': {
    lensId: 'focus-fragmentation',
    lensLabel: 'Focus vs fragmentation',
    metricALabel: 'Focus',
    metricBLabel: 'Fragmentation',
    healthyRange: 'Focus ≥55% with fragmentation ≤35%',
    overloadThreshold: 'Fragmentation ≥45% or focus <45%',
  },
  'go-to-market': {
    lensId: 'meetings-revenue',
    lensLabel: 'Meetings vs revenue work',
    metricALabel: 'Meetings',
    metricBLabel: 'Revenue work',
    healthyRange: 'Meetings roughly balanced with revenue work (≤60% meetings)',
    overloadThreshold: 'Meetings >60% of working time',
  },
  'customer-success': {
    lensId: 'meetings-revenue',
    lensLabel: 'Meetings vs revenue work',
    metricALabel: 'Meetings',
    metricBLabel: 'Revenue work',
    healthyRange: 'Meetings roughly balanced with revenue work (≤60% meetings)',
    overloadThreshold: 'Meetings >60% of working time',
  },
  sales: {
    lensId: 'meetings-revenue',
    lensLabel: 'Meetings vs revenue work',
    metricALabel: 'Meetings',
    metricBLabel: 'Revenue work',
    healthyRange: 'Meetings roughly balanced with revenue work (≤60% meetings)',
    overloadThreshold: 'Meetings >60% of working time',
  },
  operations: {
    lensId: 'interruptions-resolution',
    lensLabel: 'Recurring interruptions vs resolution time',
    metricALabel: 'Interruptions',
    metricBLabel: 'Resolution pace',
    healthyRange: 'Low interruptions or fast resolution (≤36/wk or ≤4h avg)',
    overloadThreshold: 'Interruptions rising and resolution slowing together',
  },
  it: {
    lensId: 'interruptions-resolution',
    lensLabel: 'Recurring interruptions vs resolution time',
    metricALabel: 'Interruptions',
    metricBLabel: 'Resolution pace',
    healthyRange: 'Low interruptions or fast resolution (≤36/wk or ≤4h avg)',
    overloadThreshold: 'Interruptions rising and resolution slowing together',
  },
  support: {
    lensId: 'interruptions-resolution',
    lensLabel: 'Recurring interruptions vs resolution time',
    metricALabel: 'Interruptions',
    metricBLabel: 'Resolution pace',
    healthyRange: 'Low interruptions or fast resolution (≤36/wk or ≤4h avg)',
    overloadThreshold: 'Interruptions rising and resolution slowing together',
  },
  'finance-admin': {
    lensId: 'focus-fragmentation',
    lensLabel: 'Focus vs fragmentation',
    metricALabel: 'Focus',
    metricBLabel: 'Fragmentation',
    healthyRange: 'Focus ≥55% with fragmentation ≤35%',
    overloadThreshold: 'Fragmentation ≥45% or focus <45%',
  },
  initiative: {
    lensId: 'concentration-risk',
    lensLabel: 'Concentration risk',
    metricALabel: 'Top contributor share',
    metricBLabel: 'Distributed share',
    healthyRange: 'Top contributor share <50%',
    overloadThreshold: 'Top contributor share >70%',
  },
};

export function getDepartmentLens(departmentType: DepartmentType): DepartmentLensDefinition {
  return LENS_BY_TYPE[departmentType];
}

function evaluateFocusFragmentation(
  metrics: DepartmentLensMetrics,
  definition: DepartmentLensDefinition
): DepartmentLensView {
  const focusPct = metrics.focusPct ?? 0;
  const fragmentationPct = metrics.fragmentationPct ?? 100 - focusPct;

  let status: LensStatus = 'healthy';
  if (fragmentationPct >= 45 || focusPct < 45) status = 'overload';
  else if (fragmentationPct >= 35 || focusPct < 55) status = 'watch';

  const statusLabel =
    status === 'healthy' ? 'Healthy' : status === 'watch' ? 'Fragmented' : 'Overloaded';

  return {
    ...definition,
    metricA: { name: definition.metricALabel, value: focusPct, display: `${focusPct}% focus` },
    metricB: {
      name: definition.metricBLabel,
      value: fragmentationPct,
      display: `${fragmentationPct}% fragmented`,
    },
    status,
    statusLabel,
    summaryLine: `${focusPct}% focus · ${fragmentationPct}% fragmented`,
  };
}

function evaluateMeetingsRevenue(
  metrics: DepartmentLensMetrics,
  definition: DepartmentLensDefinition
): DepartmentLensView {
  const meetingsPct = metrics.meetingsPct ?? 0;
  const revenueWorkPct = metrics.revenueWorkPct ?? 100 - meetingsPct;

  let status: LensStatus = 'healthy';
  if (meetingsPct > 60) status = 'overload';
  else if (meetingsPct > 55) status = 'watch';

  const statusLabel =
    status === 'healthy' ? 'Healthy' : status === 'watch' ? 'Meeting-heavy' : 'Overloaded';

  return {
    ...definition,
    metricA: { name: definition.metricALabel, value: meetingsPct, display: `${meetingsPct}% meetings` },
    metricB: {
      name: definition.metricBLabel,
      value: revenueWorkPct,
      display: `${revenueWorkPct}% revenue work`,
    },
    status,
    statusLabel,
    summaryLine: `${meetingsPct}% meetings · ${revenueWorkPct}% revenue work`,
  };
}

function normalizeInterruptions(value: number): number {
  return Math.min(100, Math.round((value / 60) * 100));
}

function normalizeResolutionHours(hours: number): number {
  const paceScore = Math.max(0, Math.min(100, Math.round(((8 - hours) / 8) * 100)));
  return paceScore;
}

function evaluateInterruptionsResolution(
  metrics: DepartmentLensMetrics,
  definition: DepartmentLensDefinition
): DepartmentLensView {
  const interruptions = metrics.interruptionsPerWeek ?? 0;
  const resolutionHours = metrics.avgResolutionHours ?? 0;
  const interruptionPct = normalizeInterruptions(interruptions);
  const resolutionPct = normalizeResolutionHours(resolutionHours);

  const interruptionsRising = metrics.interruptionsTrend === 'up';
  const resolutionSlowing = metrics.resolutionTrend === 'up';

  let status: LensStatus = 'healthy';
  if (interruptionsRising && resolutionSlowing) status = 'overload';
  else if (interruptions >= 36 || resolutionHours >= 4) status = 'watch';

  const statusLabel =
    status === 'healthy' ? 'Healthy' : status === 'watch' ? 'Stretched' : 'Overloaded';

  return {
    ...definition,
    metricA: {
      name: definition.metricALabel,
      value: interruptionPct,
      display: `${interruptions}/wk interruptions`,
    },
    metricB: {
      name: definition.metricBLabel,
      value: resolutionPct,
      display: `${resolutionHours}h avg resolution`,
    },
    status,
    statusLabel,
    summaryLine: `${interruptions}/wk interruptions · ${resolutionHours}h resolution`,
  };
}

function evaluateConcentrationRisk(
  metrics: DepartmentLensMetrics,
  definition: DepartmentLensDefinition
): DepartmentLensView {
  const topContributorPct = metrics.topContributorPct ?? 0;
  const distributedPct = 100 - topContributorPct;

  let status: LensStatus = 'healthy';
  if (topContributorPct > 70) status = 'overload';
  else if (topContributorPct >= 50) status = 'watch';

  const statusLabel =
    status === 'healthy' ? 'Healthy' : status === 'watch' ? 'Concentrated' : 'At risk';

  return {
    ...definition,
    metricA: {
      name: definition.metricALabel,
      value: topContributorPct,
      display: `${topContributorPct}% with top contributor`,
    },
    metricB: {
      name: definition.metricBLabel,
      value: distributedPct,
      display: `${distributedPct}% distributed`,
    },
    status,
    statusLabel,
    summaryLine: `${topContributorPct}% top contributor · ${distributedPct}% distributed`,
  };
}

export function buildDepartmentLensView(
  departmentType: DepartmentType,
  metrics: DepartmentLensMetrics
): DepartmentLensView {
  const definition = getDepartmentLens(departmentType);

  switch (definition.lensId) {
    case 'focus-fragmentation':
      return evaluateFocusFragmentation(metrics, definition);
    case 'meetings-revenue':
      return evaluateMeetingsRevenue(metrics, definition);
    case 'interruptions-resolution':
      return evaluateInterruptionsResolution(metrics, definition);
    case 'concentration-risk':
      return evaluateConcentrationRisk(metrics, definition);
  }
}

export function resolveDepartmentType(
  departmentType: DepartmentType,
  options?: { isInitiative?: boolean }
): DepartmentType {
  if (options?.isInitiative) return 'initiative';
  return departmentType;
}
