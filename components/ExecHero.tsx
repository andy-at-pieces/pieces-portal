import { getExecutiveDepartmentCallouts } from '@/lib/reports/executiveBrief';
import { getExecutiveAIUtilizationScore } from '@/lib/reports/aiUtilizationRollups';
import { getExecutiveAIBriefCopy } from '@/lib/scores/aiUtilization';

const AI_SPEND_AT_RISK_MONTHLY = 11_200;

export default function ExecHero() {
  const { attentionParagraph } = getExecutiveDepartmentCallouts();
  const score = getExecutiveAIUtilizationScore();
  const { headlineFragment, bodyParagraph } = getExecutiveAIBriefCopy(
    score,
    AI_SPEND_AT_RISK_MONTHLY
  );

  return (
    <div className="rounded-card bg-ink-900 border border-ink-700 p-10 relative overflow-hidden">
      {/* Lime glow accent */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-lime/10 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="text-[11px] font-semibold tracking-[0.1em] text-lime uppercase mb-4">
          Executive Brief · Auto-generated from organizational memory
        </div>

        <h2 className="font-display font-bold text-[34px] text-white leading-tight tracking-tight max-w-[820px] mb-5">
          The organization is <span className="text-lime">more focused</span> than last quarter —{' '}
          {headlineFragment}
        </h2>

        <div className="text-[15px] text-surface-300 leading-relaxed max-w-[760px] space-y-3">
          <p>
            Average focus time is up <strong className="text-white font-semibold">14%</strong>{' '}
            company-wide. Engineering and Go-to-Market are operating at healthy utilization. Operations
            shows signs of overload and should be looked at.
          </p>
          <p>{bodyParagraph}</p>
          <p>{attentionParagraph}</p>
        </div>

        <div className="flex justify-between mt-7 pt-5 border-t border-ink-700 text-[10px] font-mono text-surface-400 uppercase tracking-wider">
          <span>Generated · Apr 22, 2026 · 09:14</span>
          <span>Tier · Executive · High-level only</span>
        </div>
      </div>
    </div>
  );
}
