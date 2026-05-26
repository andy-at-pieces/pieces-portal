export type AIUtilizationInputs = {
  /** Licensed AI tools that appeared in output during the period. */
  licensedToolsInOutput: number;
  /** Share of output that is AI-touched (0–100). */
  aiTouchedOutputPct: number;
  /** Primary-project share among AI-touched output only (0–100). */
  primaryProjectShareAmongAiTouched: number;
};

export type AIUtilizationScoreBreakdown = {
  breadth: number;
  depth: number;
  quality: number;
  total: number;
};

export type AIUtilizationScoreResult = AIUtilizationScoreBreakdown & {
  periodKey: string;
  cachedAt: number;
};

type CacheEntry = {
  result: AIUtilizationScoreResult;
  inputs: AIUtilizationInputs;
};

const memoryCache = new Map<string, CacheEntry>();

const LOCAL_STORAGE_PREFIX = 'pieces:ai-utilization:';

/** ISO week key — scores refresh when the week rolls over. */
export function getWeeklyPeriodKey(date = new Date()): string {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

function cacheKey(userId: string, periodKey: string): string {
  return `${userId}:${periodKey}`;
}

export function scoreBreadth(licensedToolsInOutput: number): number {
  if (licensedToolsInOutput >= 4) return 4;
  if (licensedToolsInOutput === 3) return 3;
  if (licensedToolsInOutput === 2) return 2;
  if (licensedToolsInOutput === 1) return 1;
  return 0;
}

export function scoreDepth(aiTouchedOutputPct: number): number {
  if (aiTouchedOutputPct >= 50) return 4;
  if (aiTouchedOutputPct >= 35) return 3;
  if (aiTouchedOutputPct >= 20) return 2;
  if (aiTouchedOutputPct >= 5) return 1;
  return 0;
}

export function scoreQuality(primaryProjectShareAmongAiTouched: number): number {
  if (primaryProjectShareAmongAiTouched > 55) return 2;
  if (primaryProjectShareAmongAiTouched >= 40) return 1;
  return 0;
}

export function calculateAIUtilizationScore(
  inputs: AIUtilizationInputs
): AIUtilizationScoreBreakdown {
  const breadth = scoreBreadth(inputs.licensedToolsInOutput);
  const depth = scoreDepth(inputs.aiTouchedOutputPct);
  const quality = scoreQuality(inputs.primaryProjectShareAmongAiTouched);
  return {
    breadth,
    depth,
    quality,
    total: breadth + depth + quality,
  };
}

export function formatScore(total: number, options?: { decimals?: number }): string {
  const decimals = options?.decimals ?? (Number.isInteger(total) ? 0 : 1);
  return `${total.toFixed(decimals)}/10`;
}

export function formatBreakdownCaption(breakdown: AIUtilizationScoreBreakdown): string {
  return `Breadth ${breakdown.breadth} · Depth ${breakdown.depth} · Quality ${breakdown.quality}`;
}

export function averageAIUtilizationTotals(
  breakdowns: AIUtilizationScoreBreakdown[]
): number {
  if (breakdowns.length === 0) return 0;
  const sum = breakdowns.reduce((acc, item) => acc + item.total, 0);
  return Math.round((sum / breakdowns.length) * 10) / 10;
}

export function getAIUtilizationVerdict(score: number): string {
  if (score >= 8) return 'adoption is aligned with spend.';
  if (score >= 6) return 'adoption is lagging spend.';
  if (score >= 4) return 'adoption remains shallow relative to licenses.';
  return 'adoption is critically low relative to spend.';
}

export function getExecutiveAIBriefCopy(score: number, aiSpendAtRiskMonthly: number): {
  headlineFragment: string;
  bodyParagraph: string;
} {
  const scoreText = formatScore(score, { decimals: 1 });
  const verdict = getAIUtilizationVerdict(score);
  const spend = aiSpendAtRiskMonthly.toLocaleString('en-US');

  const depthNote =
    score >= 8
      ? 'Breadth and depth are healthy across licensed tools.'
      : score >= 6
      ? 'Depth is moderate while several paid seats still rarely appear in output.'
      : 'Most licensed tools are underrepresented in actual work output.';

  return {
    headlineFragment: `AI Utilization Score is ${scoreText} — ${verdict}`,
    bodyParagraph: `${depthNote} Of the $38,400/mo in seat-based AI subscriptions, roughly $${spend}/mo goes to tools that appear in less than 5% of employee output — a defensible cut or reallocation while the score is still below 8.`,
  };
}

/** In-memory + optional localStorage cache; invalidates each ISO week. */
export function getOrComputeAIUtilizationScore(
  userId: string,
  inputs: AIUtilizationInputs,
  options?: { forceRefresh?: boolean; persist?: boolean }
): AIUtilizationScoreResult {
  const periodKey = getWeeklyPeriodKey();
  const key = cacheKey(userId, periodKey);

  if (!options?.forceRefresh) {
    const fromMemory = memoryCache.get(key);
    if (fromMemory) return fromMemory.result;

    const fromStorage = readPersistedScore(key);
    if (fromStorage && fromStorage.result.periodKey === periodKey) {
      memoryCache.set(key, fromStorage);
      return fromStorage.result;
    }
  }

  const breakdown = calculateAIUtilizationScore(inputs);
  const stored: AIUtilizationScoreResult = {
    ...breakdown,
    periodKey,
    cachedAt: Date.now(),
  };

  memoryCache.set(key, { result: stored, inputs });

  if (options?.persist !== false && typeof window !== 'undefined') {
    writePersistedScore(key, stored, inputs);
  }

  return stored;
}

type PersistedPayload = CacheEntry;

function readPersistedScore(key: string): CacheEntry | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedPayload;
  } catch {
    return null;
  }
}

function writePersistedScore(
  key: string,
  result: AIUtilizationScoreResult,
  inputs: AIUtilizationInputs
): void {
  if (typeof window === 'undefined') return;
  try {
    const payload: PersistedPayload = { result, inputs };
    window.localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(payload));
  } catch {
    // Quota or privacy mode — in-memory cache still applies for the session.
  }
}
