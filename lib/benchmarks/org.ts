/**
 * Admin-supplied org facts for benchmark overlays.
 * Populate `aiSubscriptionCosts` in Settings (v1: static stub).
 */
export type OrgBenchmarkConfig = {
  aiSubscriptionCosts?: Partial<Record<string, number>> | null;
};

/** v1 default — no subscription costs until admin adds them. */
export const ORG_BENCHMARK_CONFIG: OrgBenchmarkConfig = {
  aiSubscriptionCosts: null,
};
