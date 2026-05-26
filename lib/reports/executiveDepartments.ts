import type { DepartmentType, DepartmentLensMetrics } from '@/lib/lenses/departmentLens';

export type ExecutiveDepartment = {
  id: string;
  name: string;
  departmentType: DepartmentType;
  size: number;
  isInitiative?: boolean;
  metrics: DepartmentLensMetrics;
};

export const EXECUTIVE_DEPARTMENTS: ExecutiveDepartment[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    departmentType: 'engineering',
    size: 28,
    metrics: { focusPct: 68, fragmentationPct: 32 },
  },
  {
    id: 'gtm',
    name: 'Go-to-Market',
    departmentType: 'go-to-market',
    size: 34,
    metrics: { meetingsPct: 52, revenueWorkPct: 48 },
  },
  {
    id: 'customer-success',
    name: 'Customer Success',
    departmentType: 'customer-success',
    size: 19,
    metrics: { meetingsPct: 62, revenueWorkPct: 38 },
  },
  {
    id: 'product-design',
    name: 'Product / Design',
    departmentType: 'product-design',
    size: 12,
    metrics: { focusPct: 72, fragmentationPct: 28 },
  },
  {
    id: 'operations',
    name: 'Operations',
    departmentType: 'operations',
    size: 11,
    metrics: {
      interruptionsPerWeek: 41,
      avgResolutionHours: 4.6,
      interruptionsTrend: 'up',
      resolutionTrend: 'up',
    },
  },
  {
    id: 'finance-admin',
    name: 'Finance / Admin',
    departmentType: 'finance-admin',
    size: 8,
    metrics: { focusPct: 61, fragmentationPct: 39 },
  },
  {
    id: 'data-platform-initiative',
    name: 'Data Platform',
    departmentType: 'data-platform',
    size: 6,
    isInitiative: true,
    metrics: { topContributorPct: 74 },
  },
];
