const team = [
  { initials: 'PM', name: 'Priya Menon', role: 'Senior Engineer', project: 'Auth Refactor + 3', focus: '2.1h', kpi: 92, kpiTone: 'neg' as const, status: 'Stretched', statusTone: 'stretched' as const, avatarTone: 'pink' },
  { initials: 'MW', name: 'Mark Widman', role: 'Staff Engineer', project: 'Team User Service', focus: '6.8h', kpi: 78, kpiTone: 'neutral' as const, status: 'Focused', statusTone: 'focused' as const, avatarTone: 'teal' },
  { initials: 'BP', name: 'Brian Powell', role: 'Engineer', project: 'Domain Capture', focus: '6.2h', kpi: 64, kpiTone: 'neutral' as const, status: 'Focused', statusTone: 'focused' as const, avatarTone: 'green' },
  { initials: 'MM', name: 'Mack Myers', role: 'Engineer', project: 'Copilot · Reports', focus: '5.4h', kpi: 71, kpiTone: 'neutral' as const, status: 'Focused', statusTone: 'focused' as const, avatarTone: 'violet' },
  { initials: 'MU', name: 'Musa Ahmed', role: 'Engineer', project: 'Server-side Pipelines', focus: '3.9h', kpi: 44, kpiTone: 'warn' as const, status: 'Fragmented', statusTone: 'fragmented' as const, avatarTone: 'orange' },
  { initials: 'JK', name: 'Jordan Kim', role: 'Engineer', project: 'Reports onboarding', focus: '5.1h', kpi: 58, kpiTone: 'pos' as const, status: 'Healthy', statusTone: 'good' as const, avatarTone: 'blue' },
  { initials: 'GJ', name: 'Gavin Judd', role: 'Engineer', project: 'Analytics · Telemetry', focus: '5.8h', kpi: 81, kpiTone: 'neutral' as const, status: 'Focused', statusTone: 'focused' as const, avatarTone: 'lime' },
  { initials: 'SJ', name: 'Sam Jaffe', role: 'Engineer', project: 'Audit Logs', focus: '4.2h', kpi: 38, kpiTone: 'capacity' as const, status: 'Capacity', statusTone: 'capacity' as const, avatarTone: 'tan' },
];

const avatarColors: Record<string, string> = {
  pink: 'bg-gradient-to-br from-pink-200 to-pink-400 text-pink-900',
  teal: 'bg-gradient-to-br from-teal-200 to-teal-400 text-teal-900',
  green: 'bg-gradient-to-br from-green-200 to-green-400 text-green-900',
  violet: 'bg-gradient-to-br from-violet-200 to-violet-400 text-violet-900',
  orange: 'bg-gradient-to-br from-orange-200 to-orange-400 text-orange-900',
  blue: 'bg-gradient-to-br from-blue-200 to-blue-400 text-blue-900',
  lime: 'bg-lime text-limeDark',
  tan: 'bg-gradient-to-br from-amber-200 to-amber-400 text-amber-900',
};

const statusStyles: Record<string, string> = {
  focused: 'bg-accent-greenSoft text-accent-green',
  good: 'bg-accent-greenSoft text-accent-green',
  fragmented: 'bg-accent-orangeSoft text-accent-orange',
  stretched: 'bg-accent-redSoft text-accent-red',
  capacity: 'bg-surface-100 text-ink-500',
};

const kpiBarTone: Record<string, string> = {
  pos: 'bg-accent-green',
  neg: 'bg-accent-red',
  warn: 'bg-accent-orange',
  neutral: 'bg-ink-700',
  capacity: 'bg-ink-300',
};

export default function TeamTable() {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-surface-200">
          {['Member', 'Primary Project', 'Focus / Day', 'KPI Progress', 'Signal'].map((h) => (
            <th
              key={h}
              className="text-left text-[10px] font-semibold tracking-[0.08em] text-ink-400 uppercase px-4 py-3"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {team.map((row, i) => (
          <tr
            key={row.name}
            className={`hover:bg-surface-50 cursor-pointer transition-colors ${
              i < team.length - 1 ? 'border-b border-surface-200' : ''
            }`}
          >
            <td className="px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full grid place-items-center text-[10px] font-semibold ${avatarColors[row.avatarTone]}`}
                >
                  {row.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">{row.name}</div>
                  <div className="text-[10px] font-mono text-ink-400">{row.role}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-3.5 text-sm text-ink-700">{row.project}</td>
            <td className="px-4 py-3.5 text-sm font-mono text-ink">{row.focus}</td>
            <td className="px-4 py-3.5">
              <div className="flex items-center gap-2">
                <div className="w-[100px] h-1 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${kpiBarTone[row.kpiTone]}`}
                    style={{ width: `${row.kpi}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-ink-500">{row.kpi}%</span>
              </div>
            </td>
            <td className="px-4 py-3.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusStyles[row.statusTone]}`}>
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
