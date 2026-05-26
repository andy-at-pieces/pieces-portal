import { ORG_BENCHMARK_CONFIG } from '@/lib/benchmarks/org';

export type LicensedAiTool = {
  id: string;
  displayName: string;
};

export type AiToolPresence = {
  toolId: string;
  /** Percent of employee output where this tool appears. */
  outputPresencePct: number;
};

// v1: deterministic representation of OS-level app usage telemetry.
const TOOL_PRESENCE: AiToolPresence[] = [
  { toolId: 'copilot', outputPresencePct: 34 },
  { toolId: 'chatgpt', outputPresencePct: 21 },
  { toolId: 'claude', outputPresencePct: 12 },
  { toolId: 'cursor', outputPresencePct: 9 },
  { toolId: 'gemini', outputPresencePct: 2 },
  { toolId: 'perplexity', outputPresencePct: 4 },
  { toolId: 'midjourney', outputPresencePct: 1 },
];

const UNDERUSED_THRESHOLD_PCT = 5;

const CAPTION =
  'Licensed AI tools with negligible presence in actual employee workstream output. Admin can add subscription costs to see dollar value.';

function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getAiToolPenetrationSummary(options?: {
  aiSubscriptionCostsMonthlyUsd?: Partial<Record<string, number>> | null;
}): {
  underusedLicensedToolCount: number;
  underusedToolIds: string[];
  caption: string;
  secondaryLine: string | null;
} {
  const underused = TOOL_PRESENCE.filter((t) => t.outputPresencePct < UNDERUSED_THRESHOLD_PCT);
  const underusedToolIds = underused.map((t) => t.toolId);
  const underusedLicensedToolCount = underusedToolIds.length;

  const costs =
    options?.aiSubscriptionCostsMonthlyUsd ?? ORG_BENCHMARK_CONFIG.aiSubscriptionCosts;

  if (costs && Object.keys(costs).length > 0) {
    const total = underusedToolIds.reduce((sum, id) => sum + (costs[id] ?? 0), 0);
    return {
      underusedLicensedToolCount,
      underusedToolIds,
      caption: CAPTION,
      secondaryLine: `Equivalent to ${formatUsd(total)}/mo in reallocatable spend.`,
    };
  }

  return {
    underusedLicensedToolCount,
    underusedToolIds,
    caption: CAPTION,
    secondaryLine: 'Add subscription costs in Settings to see dollar value.',
  };
}
