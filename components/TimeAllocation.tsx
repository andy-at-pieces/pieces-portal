const rows = [
  { name: 'Enterprise Reporting', sub: 'Primary initiative · Q2', pct: 58, hours: 95, color: 'bg-ink-700' },
  { name: 'Go-to-Market', sub: 'Postman, Disney follow-up', pct: 18, hours: 30, color: 'bg-accent-teal' },
  { name: 'Recruiting & Hiring', sub: '3 candidate loops', pct: 11, hours: 18, color: 'bg-accent-violet' },
  { name: 'Internal meetings', sub: 'Ops, all-hands, 1:1s', pct: 8, hours: 13, color: 'bg-accent-orange' },
  { name: 'Fragmented', sub: 'Slack, email, context-switching', pct: 5, hours: 8, color: 'bg-ink-300' },
];

export default function TimeAllocation() {
  return (
    <div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          className={`grid grid-cols-[220px_1fr_90px] items-center gap-4 py-3 ${
            i < rows.length - 1 ? 'border-b border-surface-200' : ''
          }`}
        >
          <div>
            <div className="text-sm font-medium text-ink">{row.name}</div>
            <div className="text-[10px] font-mono text-ink-400 mt-0.5">{row.sub}</div>
          </div>
          <div className="h-1.5 rounded-full bg-surface-100 overflow-hidden">
            <div
              className={`h-full rounded-full ${row.color}`}
              style={{ width: `${row.pct}%` }}
            />
          </div>
          <div className="text-xs font-mono text-ink-500 text-right">
            {row.pct}% · {row.hours}h
          </div>
        </div>
      ))}
    </div>
  );
}
