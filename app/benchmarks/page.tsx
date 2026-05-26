import WeekComparisonSection from '@/components/benchmarks/WeekComparisonSection';
import { Card, PageHeader, SectionLabel } from '@/components/ui';
import { BENCHMARK_METRIC_CARDS } from '@/lib/benchmarks/constants';
import { getBenchmarkNarrative } from '@/lib/benchmarks/summaryNarrative';
import HelpsAnswerLine from '@/components/framing/HelpsAnswerLine';
import { PAGE_PRIMARY_QUESTION } from '@/lib/framing/fiveQuestions';
import { getContextResolutionSummary } from '@/lib/benchmarks/contextResolution';
import { Lock, ShieldCheck } from 'lucide-react';
import TourTrigger from '@/components/TourTrigger';

export const metadata = { title: 'Benchmarks · Pieces Enterprise' };

export default function BenchmarksPage() {
  const narrative = getBenchmarkNarrative();
  const context = getContextResolutionSummary();

  return (
    <div className="max-w-[1240px] mx-auto px-8 py-8">
      <PageHeader
        kicker="Enterprise Benchmarking"
        title="Before & After"
        subtitle={
          <>
            What a consultant would deliver in a quarterly engagement — Pieces produces continuously,
            from data your team is already generating.{' '}
            <HelpsAnswerLine questionId={PAGE_PRIMARY_QUESTION.benchmarks} />
          </>
        }
        meta={
          <div>
            <div className="font-mono text-xs text-ink-400 uppercase tracking-wider">Tenant · pieces.app</div>
            <div className="font-display font-bold text-2xl text-ink mt-1">12 weeks in</div>
          </div>
        }
      />

      {/* Hero before / after */}
      <div data-tour="bench-hero" className="grid grid-cols-2 rounded-card border border-surface-200 overflow-hidden">
        <div className="p-9 bg-surface-50">
          <div className="text-[10px] font-semibold tracking-[0.1em] text-ink-400 uppercase mb-4">
            Week 1 · first 7 days
          </div>
          <div className="flex items-baseline">
            <span className="font-display font-bold text-[56px] text-ink leading-none tracking-tight">
              {Math.round(context.week1AvgMinutes * 10) / 10}
            </span>
            <span className="text-sm text-ink-500 font-medium ml-2">min/query</span>
          </div>
          <div className="text-sm text-ink-500 mt-3 max-w-[340px] leading-relaxed">
            Time from context query to opening a relevant file.
          </div>
        </div>

        <div className="p-9 bg-ink-900 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-lime/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="text-[10px] font-semibold tracking-[0.1em] text-lime uppercase mb-4">
              After · Week 12
            </div>
            <div className="flex items-baseline">
              <span className="font-display font-bold text-[56px] text-lime leading-none tracking-tight">
                {Math.round(context.week12AvgMinutes * 10) / 10}
              </span>
              <span className="text-sm text-surface-300 font-medium ml-2">min/query</span>
            </div>
            <div className="text-sm text-surface-300 mt-3 max-w-[340px] leading-relaxed">
              Week 12 reflects the most recent 7 days of OS-level workstream telemetry with Pieces.
            </div>
          </div>
        </div>
        <div className="col-span-2 border-t border-ink-700 px-9 py-5 bg-ink-900">
          <div className="text-[10px] font-semibold tracking-[0.1em] text-lime/80 uppercase mb-2">
            Auto-generated from organizational data
          </div>
          <blockquote className="font-display font-medium text-[15px] text-surface-200 leading-relaxed">
            &ldquo;{narrative}&rdquo;
          </blockquote>
        </div>
      </div>

      <SectionLabel note="Pre/post methodology · Per-person telemetry">
        Measured across the organization
      </SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        {BENCHMARK_METRIC_CARDS.map((b, idx) =>
          b.label ? (
            <Card
              key={b.label}
              padding="lg"
              className={
                b.variant === 'customer-pattern'
                  ? 'relative bg-surface-50/80 border-surface-200'
                  : undefined
              }
            >
              {b.variant === 'customer-pattern' && (
                <span className="absolute top-4 right-4 text-[9px] font-semibold tracking-[0.08em] text-ink-400 uppercase">
                  Customer pattern
                </span>
              )}
              <div
                className={`text-[11px] font-medium mb-3 ${
                  b.variant === 'customer-pattern' ? 'text-ink-400' : 'text-ink-500'
                }`}
              >
                {b.label}
              </div>
              <div
                className={`font-display font-bold text-[40px] leading-none tracking-tight ${
                  b.variant === 'customer-pattern' ? 'text-ink-700' : 'text-ink'
                }`}
              >
                {b.value}
                {b.suffix && (
                  <span className="text-lg text-ink-500 font-semibold ml-0.5">{b.suffix}</span>
                )}
              </div>
              <div className="text-xs text-ink-500 mt-3 leading-relaxed">{b.note}</div>
              {b.secondaryNote && (
                <div className="text-[11px] text-ink-400 mt-2 leading-snug">{b.secondaryNote}</div>
              )}
            </Card>
          ) : (
            <div key={`bench-metric-spacer-${idx}`} aria-hidden />
          )
        )}
      </div>

      <WeekComparisonSection />

      <SectionLabel note="Why Pieces clears where Copilot sometimes doesn't">
        Security posture, for the deck
      </SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        <Card padding="lg">
          <div className="w-10 h-10 rounded-lg bg-accent-greenSoft text-accent-green grid place-items-center mb-3">
            <Lock className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="font-display font-semibold text-[15px] text-ink mb-1.5">
            OS-level, local by default
          </div>
          <div className="text-[13px] text-ink-500 leading-relaxed">
            LTM-2.7 captures context on-device. 90% runs offline. Nothing leaves the endpoint unless the
            admin explicitly routes summaries through the Team User Service. For security-first
            enterprises currently defaulting to Microsoft Copilot, this is the differentiator.
          </div>
        </Card>
        <Card padding="lg">
          <div className="w-10 h-10 rounded-lg bg-accent-blueSoft text-accent-blue grid place-items-center mb-3">
            <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="font-display font-semibold text-[15px] text-ink mb-1.5">
            Templated, not raw
          </div>
          <div className="text-[13px] text-ink-500 leading-relaxed">
            Org-wide reporting uses structured, templated summaries. Not raw memories, documents, or
            message contents. SOC 2 compliant. Auth0 with MFA. BYOK and BYOM supported. Domain capture
            gates enterprise seat allocation. Air-gap deployment available.
          </div>
        </Card>
      </div>

      <TourTrigger />
    </div>
  );
}
