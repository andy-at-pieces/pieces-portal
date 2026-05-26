import {
  AIUtilizationInputs,
  AIUtilizationScoreResult,
  averageAIUtilizationTotals,
  calculateAIUtilizationScore,
  getOrComputeAIUtilizationScore,
} from '@/lib/scores/aiUtilization';

const ANDY_INPUTS: AIUtilizationInputs = {
  licensedToolsInOutput: 3,
  aiTouchedOutputPct: 42,
  primaryProjectShareAmongAiTouched: 52,
};

const ENGINEERING_TEAM: { userId: string; inputs: AIUtilizationInputs }[] = [
  { userId: 'eng-01', inputs: { licensedToolsInOutput: 4, aiTouchedOutputPct: 55, primaryProjectShareAmongAiTouched: 55 } },
  { userId: 'eng-02', inputs: { licensedToolsInOutput: 3, aiTouchedOutputPct: 48, primaryProjectShareAmongAiTouched: 51 } },
  { userId: 'eng-03', inputs: { licensedToolsInOutput: 3, aiTouchedOutputPct: 44, primaryProjectShareAmongAiTouched: 46 } },
  { userId: 'eng-04', inputs: { licensedToolsInOutput: 2, aiTouchedOutputPct: 38, primaryProjectShareAmongAiTouched: 42 } },
  { userId: 'eng-05', inputs: { licensedToolsInOutput: 3, aiTouchedOutputPct: 41, primaryProjectShareAmongAiTouched: 49 } },
  { userId: 'eng-06', inputs: { licensedToolsInOutput: 2, aiTouchedOutputPct: 28, primaryProjectShareAmongAiTouched: 38 } },
  { userId: 'eng-07', inputs: { licensedToolsInOutput: 4, aiTouchedOutputPct: 52, primaryProjectShareAmongAiTouched: 54 } },
  { userId: 'eng-08', inputs: { licensedToolsInOutput: 1, aiTouchedOutputPct: 18, primaryProjectShareAmongAiTouched: 35 } },
];

export function getIndividualAIUtilizationScore(): {
  score: AIUtilizationScoreResult;
  aiTouchedOutputPct: number;
} {
  const score = getOrComputeAIUtilizationScore('andy', ANDY_INPUTS, { persist: false });
  return { score, aiTouchedOutputPct: ANDY_INPUTS.aiTouchedOutputPct };
}

export function getManagerTeamAIUtilizationScore(): {
  teamAverage: number;
  aiTouchedOutputPct: number;
  memberScores: AIUtilizationScoreResult[];
} {
  const memberScores = ENGINEERING_TEAM.map(({ userId, inputs }) =>
    getOrComputeAIUtilizationScore(userId, inputs, { persist: false })
  );
  const breakdowns = ENGINEERING_TEAM.map(({ inputs }) => calculateAIUtilizationScore(inputs));
  const teamAverage = averageAIUtilizationTotals(breakdowns);
  const aiTouchedOutputPct = Math.round(
    ENGINEERING_TEAM.reduce((sum, m) => sum + m.inputs.aiTouchedOutputPct, 0) /
      ENGINEERING_TEAM.length
  );

  return { teamAverage, aiTouchedOutputPct, memberScores };
}

export function getExecutiveAIUtilizationScore(): number {
  return getManagerTeamAIUtilizationScore().teamAverage;
}
