import { DEFAULT_BENCHMARK_NARRATIVE_INPUT } from '@/lib/benchmarks/constants';
import { getWeeklyPeriodKey } from '@/lib/scores/aiUtilization';

export type BenchmarkNarrativeData = {
  tenant: string;
  weeks: number;
  contextWeek1Minutes: number;
  contextWeek12Minutes: number;
  underusedAiToolCount: number;
  focusBlockWeek1Minutes: number;
  focusBlockWeek12Minutes: number;
};

function fmtMinutes(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function generateBenchmarkNarrative(data: BenchmarkNarrativeData): string {
  return (
    `Over 12 weeks of Pieces use at ${data.tenant}, context resolution time has declined from ${fmtMinutes(data.contextWeek1Minutes)} to ${fmtMinutes(data.contextWeek12Minutes)} minutes per query. ` +
    `${data.underusedAiToolCount} licensed AI tools appear in less than 5% of actual employee output. ` +
    `Average focus block duration has grown from ${fmtMinutes(data.focusBlockWeek1Minutes)} to ${fmtMinutes(data.focusBlockWeek12Minutes)} minutes.`
  );
}

type NarrativeCacheEntry = {
  periodKey: string;
  narrative: string;
};

let narrativeCache: NarrativeCacheEntry | null = null;

/** Narrative refreshes when the ISO week rolls over (aligned with AI utilization scoring). */
export function getBenchmarkNarrative(
  data: BenchmarkNarrativeData = DEFAULT_BENCHMARK_NARRATIVE_INPUT
): string {
  const periodKey = getWeeklyPeriodKey();
  if (narrativeCache?.periodKey === periodKey) {
    return narrativeCache.narrative;
  }

  const narrative = generateBenchmarkNarrative(data);
  narrativeCache = { periodKey, narrative };
  return narrative;
}
