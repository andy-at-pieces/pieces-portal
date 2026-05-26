import { getAiToolPenetrationSummary } from '@/lib/benchmarks/aiToolPenetration';
import { getContextResolutionSummary } from '@/lib/benchmarks/contextResolution';
import { getCustomerQuarterlyReportPattern } from '@/lib/benchmarks/customerPatterns';
import { getFocusBlockSummary } from '@/lib/benchmarks/focusBlocks';
import { getNewHireContextVelocitySummary } from '@/lib/benchmarks/newHireVelocity';

/** Shared org benchmark figures — hero, metric grid, and procurement narrative. */
export const BENCHMARK_TENANT = 'pieces.app';
export const BENCHMARK_WEEKS = 12;

export type BenchmarkMetricCard = {
  label: string;
  value: string;
  suffix: string;
  note: string;
  secondaryNote?: string;
  variant?: 'default' | 'customer-pattern';
};

const context = getContextResolutionSummary();
const aiTools = getAiToolPenetrationSummary();
const focus = getFocusBlockSummary();
const newHires = getNewHireContextVelocitySummary();
const quarterlyPattern = getCustomerQuarterlyReportPattern();

export const BENCHMARK_METRIC_CARDS: BenchmarkMetricCard[] = [
  {
    label: 'Context Resolution Time',
    value: String(context.deltaMinutes),
    suffix: ' min',
    note: 'Time from context query to opening relevant file. Measured from workstream telemetry.',
    secondaryNote: `Week 1 → Week 12 of Pieces use (${context.week1AvgMinutes} → ${context.week12AvgMinutes} min/query).`,
  },
  {
    label: 'AI Tool Penetration',
    value: String(aiTools.underusedLicensedToolCount),
    suffix: ' tools',
    note: aiTools.caption,
    secondaryNote: aiTools.secondaryLine ?? undefined,
  },
  {
    label: 'Focus Block Duration',
    value: `${focus.week12AvgMinutes}`,
    suffix: ' min',
    note: 'Average uninterrupted work block, measured from app-switching telemetry.',
    secondaryNote: `Week 12 vs Week 1 (${focus.week1AvgMinutes} → ${focus.week12AvgMinutes} min).`,
  },
  {
    label: 'New-Hire Context Velocity',
    value: String(newHires.week3PrimarySharePct),
    suffix: '%',
    note: `How quickly new hires concentrate on their primary project. Pattern observed across last ${newHires.hireCount} hires.`,
  },
  {
    label: 'Quarterly Report Pattern',
    value: quarterlyPattern.headline,
    suffix: '',
    note: quarterlyPattern.caption,
    variant: 'customer-pattern',
  },
  {
    label: '',
    value: '',
    suffix: '',
    note: '',
  },
];

export const DEFAULT_BENCHMARK_NARRATIVE_INPUT = {
  tenant: BENCHMARK_TENANT,
  weeks: BENCHMARK_WEEKS,
  contextWeek1Minutes: context.week1AvgMinutes,
  contextWeek12Minutes: context.week12AvgMinutes,
  underusedAiToolCount: aiTools.underusedLicensedToolCount,
  focusBlockWeek1Minutes: focus.week1AvgMinutes,
  focusBlockWeek12Minutes: focus.week12AvgMinutes,
  newHirePrimaryShareWeeks: newHires.weeksToPrimaryShare,
} as const;
