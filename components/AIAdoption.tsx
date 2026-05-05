import { Card } from '@/components/ui';

const tools = [
  { name: 'Claude', seats: '142 seats', pct: 61, note: 'Actual presence in employee output.', verdict: 'Worth the spend.', tone: 'good' as const, bar: 'bg-accent-green' },
  { name: 'GitHub Copilot', seats: '40 seats', pct: 54, note: 'Strong adoption among engineering.', verdict: '', tone: 'good' as const, bar: 'bg-accent-teal' },
  { name: 'Other AI tools', seats: '6 subscriptions', pct: 4, note: '$11.2k/mo in seats not showing up in work.', verdict: 'Candidates for review.', tone: 'bad' as const, bar: 'bg-accent-red' },
];

export default function AIAdoption() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {tools.map((t) => (
        <Card key={t.name} padding="lg">
          <div className="flex items-baseline justify-between mb-3">
            <div className="text-[15px] font-semibold text-ink">{t.name}</div>
            <div className="text-[10px] font-mono text-ink-400">{t.seats}</div>
          </div>
          <div className="font-display font-bold text-[36px] text-ink leading-none tracking-tight">
            {t.pct}
            <span className="text-base text-ink-500 font-semibold">%</span>
          </div>
          <div className="text-xs text-ink-500 mt-3 leading-relaxed">
            {t.note}{' '}
            {t.verdict && (
              <span
                className={`font-semibold ${
                  t.tone === 'good' ? 'text-accent-green' : 'text-accent-red'
                }`}
              >
                {t.verdict}
              </span>
            )}
          </div>
          <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden mt-3">
            <div className={`h-full rounded-full ${t.bar}`} style={{ width: `${t.pct}%` }} />
          </div>
        </Card>
      ))}
    </div>
  );
}
