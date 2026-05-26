import { helpsAnswerText, type FiveQuestionId } from '@/lib/framing/fiveQuestions';

export default function HelpsAnswerLine({ questionId }: { questionId: FiveQuestionId }) {
  return (
    <span className="text-[11px] text-ink-400">{helpsAnswerText(questionId)}</span>
  );
}
