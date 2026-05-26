'use client';

import { Sparkles, Clock } from 'lucide-react';
import CollapsibleSummary from '@/components/CollapsibleSummary';

const HEADLINE =
  'Shipped the enterprise reporting spec and unblocked the server-side pipeline migration.';

export default function StandupCard() {
  return (
    <div className="rounded-card border border-surface-200 bg-white p-7 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime" />

      <CollapsibleSummary
        expandLabel="Expand standup update"
        collapseLabel="Collapse standup update"
        preview={
          <>
            <StandupMeta />
            <h2 className="font-display font-semibold text-[22px] text-ink leading-snug tracking-tight max-w-[760px]">
              {HEADLINE}
            </h2>
          </>
        }
      >
        <>
          <StandupMeta />
          <h2 className="font-display font-semibold text-[22px] text-ink leading-snug tracking-tight max-w-[760px] mb-4">
            {HEADLINE}
          </h2>

          <div className="text-sm text-ink-500 leading-relaxed max-w-[780px] space-y-3">
            <p>
              You spent <strong className="text-ink font-semibold">3h 12m</strong> in the{' '}
              <strong className="text-ink font-semibold">Enterprise Reporting</strong> project. Most of
              that was the stakeholder call with Tsavo, Ali, Mack, Mark, Brian, and Gavin, followed by 52
              minutes revising the scope doc. You closed Ali&apos;s feedback on benchmarking and opened a
              thread with Musa on the pipeline migration.
            </p>
            <p>
              A second block of <strong className="text-ink font-semibold">1h 48m</strong> went to reviewing
              Brian&apos;s domain capture issue and pulling the Disney quarterly-report demo pattern into your
              draft. Remaining time was fragmented across Slack, email, and a candidate call.
            </p>
            <p>
              <strong className="text-ink font-semibold">Open threads:</strong> Musa hasn&apos;t responded on
              pipeline timeline. Brian is targeting a week for tenant setup. Ali&apos;s benchmarking notes are
              waiting on your review.
            </p>
          </div>

          <div className="flex gap-1.5 mt-5 flex-wrap">
            <Chip lime>Enterprise Reporting</Chip>
            <Chip>Team User Service</Chip>
            <Chip>Benchmarking</Chip>
            <Chip>Domain Capture</Chip>
          </div>
        </>
      </CollapsibleSummary>
    </div>
  );
}

function StandupMeta() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-lime/30 text-limeDark text-[10px] font-semibold tracking-wider uppercase">
        <Sparkles className="w-3 h-3" strokeWidth={2.5} />
        Single-Click · Standup Update
      </div>
      <div className="flex items-center gap-1.5 text-xs text-ink-400 font-mono">
        <Clock className="w-3 h-3" strokeWidth={2} />
        Generated 4 min ago from yesterday&apos;s memory
      </div>
    </div>
  );
}

function Chip({ children, lime }: { children: React.ReactNode; lime?: boolean }) {
  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-mono font-medium ${
        lime
          ? 'bg-lime/40 text-limeDark border border-lime'
          : 'bg-surface-100 text-ink-700 border border-surface-200'
      }`}
    >
      {children}
    </span>
  );
}
