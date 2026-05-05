import { AlertTriangle, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const signals = [
  {
    tone: 'warn' as const,
    icon: AlertTriangle,
    title: (
      <>
        The <strong className="font-semibold">Auth Refactor</strong> project looks stalled.
      </>
    ),
    desc: 'Activity dropped 73% in the last two weeks. Three contributors in early April, only one active in the last five working days. Might be blocked, deprioritized, or waiting on a dependency. Worth asking.',
    action: 'Open project',
  },
  {
    tone: 'neg' as const,
    icon: TrendingUp,
    title: (
      <>
        <strong className="font-semibold">Priya Menon</strong> appears stretched.
      </>
    ),
    desc: 'Running across four projects, averaging 2.1h of focus per day and a fragmentation index of 0.78 against a team average of 0.34. Sole reviewer on 11 PRs this month. Single-point-of-failure pattern worth addressing.',
    action: 'View profile',
  },
  {
    tone: 'pos' as const,
    icon: TrendingDown,
    title: (
      <>
        <strong className="font-semibold">Jordan Kim&apos;s</strong> ramp is ahead of schedule.
      </>
    ),
    desc: 'Three weeks in. Already contributing across two projects at pace comparable to 8-week hires. Workstream Activity shows heavy use of shared context from Priya and Mark. The onboarding handoff is working.',
    action: 'See ramp data',
  },
];

const toneStyles = {
  warn: 'bg-accent-orangeSoft text-accent-orange',
  neg: 'bg-accent-redSoft text-accent-red',
  pos: 'bg-accent-greenSoft text-accent-green',
};

export default function SignalsList() {
  return (
    <div>
      {signals.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className={`grid grid-cols-[44px_1fr_auto] gap-4 items-start py-5 ${
              i < signals.length - 1 ? 'border-b border-surface-200' : ''
            }`}
          >
            <div className={`w-9 h-9 rounded-lg grid place-items-center ${toneStyles[s.tone]}`}>
              <Icon className="w-4 h-4" strokeWidth={2.25} />
            </div>
            <div>
              <div className="text-sm text-ink mb-1">{s.title}</div>
              <div className="text-[13px] text-ink-500 leading-relaxed max-w-[580px]">
                {s.desc}
              </div>
            </div>
            <button className="self-center text-xs font-medium text-accent-blue hover:bg-accent-blueSoft px-3 py-1.5 rounded-md flex items-center gap-1 whitespace-nowrap">
              {s.action} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
