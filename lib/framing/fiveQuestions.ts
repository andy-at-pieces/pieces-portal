export type FiveQuestionId =
  | 'time'
  | 'ai-spend'
  | 'attention'
  | 'knowledge'
  | 'change';

export type FiveQuestion = {
  id: FiveQuestionId;
  shortLabel: string;
  text: string;
};

/** The five questions Pieces is built to answer — single source of truth. */
export const FIVE_QUESTIONS: readonly FiveQuestion[] = [
  {
    id: 'time',
    shortLabel: 'TIME',
    text: 'Where is our time actually going?',
  },
  {
    id: 'ai-spend',
    shortLabel: 'AI SPEND',
    text: 'Is the AI spend paying off?',
  },
  {
    id: 'attention',
    shortLabel: 'ATTENTION',
    text: 'Who needs a conversation this week?',
  },
  {
    id: 'knowledge',
    shortLabel: 'KNOWLEDGE',
    text: 'Where is critical knowledge concentrated?',
  },
  {
    id: 'change',
    shortLabel: 'CHANGE',
    text: 'How does this quarter compare to last?',
  },
] as const;

export const FIVE_QUESTIONS_STRIP_LABEL = 'PIECES ANSWERS';

/** Primary question each reporting surface is oriented around. */
export const PAGE_PRIMARY_QUESTION = {
  insights: 'time',
  benchmarks: 'change',
} as const satisfies Record<string, FiveQuestionId>;

export function getFiveQuestion(id: FiveQuestionId): FiveQuestion {
  const question = FIVE_QUESTIONS.find((item) => item.id === id);
  if (!question) {
    throw new Error(`Unknown five question: ${id}`);
  }
  return question;
}

export function helpsAnswerText(id: FiveQuestionId): string {
  return `Helps answer: ${getFiveQuestion(id).text}`;
}
