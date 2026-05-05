type Dept = {
  name: string;
  size: number;
  focusPct: number;
  fragTone: 'mild' | 'hot';
  hours: string;
  status: string;
  statusTone: 'good' | 'warn' | 'bad';
};

const depts: Dept[] = [
  { name: 'Engineering', size: 28, focusPct: 68, fragTone: 'mild', hours: '6.2h focus', status: 'Healthy', statusTone: 'good' },
  { name: 'Go-to-Market', size: 34, focusPct: 58, fragTone: 'mild', hours: '5.3h focus', status: 'Healthy', statusTone: 'good' },
  { name: 'Customer Success', size: 19, focusPct: 38, fragTone: 'hot', hours: '3.4h focus', status: 'Overloaded', statusTone: 'bad' },
  { name: 'Product / Design', size: 12, focusPct: 72, fragTone: 'mild', hours: '6.8h focus', status: 'Healthy', statusTone: 'good' },
  { name: 'Operations', size: 11, focusPct: 44, fragTone: 'mild', hours: '4.0h focus', status: 'Fragmented', statusTone: 'warn' },
  { name: 'Finance / Admin', size: 8, focusPct: 61, fragTone: 'mild', hours: '5.6h focus', status: 'Healthy', statusTone: 'good' },
];

const statusToneClasses = {
  good: 'text-accent-green',
  warn: 'text-accent-orange',
  bad: 'text-accent-red',
};

export default function DepartmentList() {
  return (
    <div>
      {depts.map((d, i) => (
        <div
          key={d.name}
          className={`grid grid-cols-[170px_1fr_110px] gap-5 items-center py-3.5 ${
            i < depts.length - 1 ? 'border-b border-surface-200' : ''
          }`}
        >
          <div>
            <div className="text-sm font-medium text-ink">{d.name}</div>
            <div className="text-[10px] font-mono text-ink-400 mt-0.5">{d.size} people</div>
          </div>
          <div className="relative h-2.5 bg-surface-100 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-accent-green"
              style={{ width: `${d.focusPct}%` }}
            />
            <div
              className={`absolute top-0 bottom-0 ${
                d.fragTone === 'hot' ? 'bg-accent-red' : 'bg-accent-orange'
              }`}
              style={{ left: `${d.focusPct}%`, width: `${100 - d.focusPct}%` }}
            />
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-ink">{d.hours}</div>
            <div className={`text-[10px] font-medium uppercase tracking-wider mt-0.5 ${statusToneClasses[d.statusTone]}`}>
              {d.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
