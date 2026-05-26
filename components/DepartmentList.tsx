import {
  buildDepartmentLensView,
  resolveDepartmentType,
} from '@/lib/lenses/departmentLens';
import { EXECUTIVE_DEPARTMENTS } from '@/lib/reports/executiveDepartments';
import { getDepartmentStatusTone } from '@/lib/reports/executiveBrief';

const statusToneClasses = {
  good: 'text-accent-green',
  warn: 'text-accent-orange',
  overload: 'text-accent-orange',
};

export default function DepartmentList() {
  const rows = EXECUTIVE_DEPARTMENTS.map((dept) => {
    const type = resolveDepartmentType(dept.departmentType, { isInitiative: dept.isInitiative });
    const lens = buildDepartmentLensView(type, dept.metrics);
    const statusTone = getDepartmentStatusTone(lens.status);
    return { dept, lens, statusTone };
  });

  return (
    <div>
      {rows.map(({ dept, lens, statusTone }, i) => (
        <div
          key={dept.id}
          className={`grid grid-cols-[170px_1fr_110px] gap-5 items-center py-3.5 ${
            i < rows.length - 1 ? 'border-b border-surface-200' : ''
          }`}
        >
          <div>
            <div className="text-sm font-medium text-ink">{dept.name}</div>
            <div className="text-[10px] font-mono text-ink-400 mt-0.5">{dept.size} people</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[0.08em] text-ink-400 uppercase mb-1.5">
              {lens.lensLabel}
            </div>
            <div className="relative h-2.5 bg-surface-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-accent-green"
                style={{ width: `${lens.metricA.value}%` }}
              />
              <div
                className="absolute top-0 bottom-0 bg-accent-orange"
                style={{ left: `${lens.metricA.value}%`, width: `${lens.metricB.value}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-ink">{lens.summaryLine}</div>
            <div
              className={`text-[10px] font-medium uppercase tracking-wider mt-0.5 ${statusToneClasses[statusTone]}`}
            >
              {lens.statusLabel}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
