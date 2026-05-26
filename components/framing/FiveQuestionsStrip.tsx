import { FIVE_QUESTIONS, FIVE_QUESTIONS_STRIP_LABEL } from '@/lib/framing/fiveQuestions';

export default function FiveQuestionsStrip({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 ${className}`}
      aria-label="The five questions Pieces is built to answer"
    >
      <span className="text-[10px] font-semibold tracking-[0.1em] text-ink-400 uppercase shrink-0">
        {FIVE_QUESTIONS_STRIP_LABEL}
      </span>
      <div className="flex flex-wrap items-center gap-1">
        {FIVE_QUESTIONS.map((question, i) => (
          <span key={question.id} className="flex items-center gap-1">
            {i > 0 && <span className="text-ink-300 text-[10px]" aria-hidden>·</span>}
            <span
              title={question.text}
              className="text-[10px] font-medium tracking-[0.04em] text-ink-500 cursor-default hover:text-ink-700"
            >
              {question.shortLabel}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
