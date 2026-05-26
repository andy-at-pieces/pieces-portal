import {
  buildDepartmentLensView,
  resolveDepartmentType,
  type LensStatus,
} from '@/lib/lenses/departmentLens';
import { EXECUTIVE_DEPARTMENTS, type ExecutiveDepartment } from '@/lib/reports/executiveDepartments';

function formatDepartmentCallout(dept: ExecutiveDepartment): string | null {
  const type = resolveDepartmentType(dept.departmentType, { isInitiative: dept.isInitiative });
  const lens = buildDepartmentLensView(type, dept.metrics);

  if (lens.status !== 'overload') return null;

  const name = dept.isInitiative ? `The ${dept.name} initiative` : dept.name;
  const teamSize = `a ${dept.size}-person team`;

  switch (lens.lensId) {
    case 'meetings-revenue':
      return `${name} is running ${lens.metricA.value}% meetings to ${lens.metricB.value}% revenue work — outside the healthy band for ${teamSize}.`;
    case 'focus-fragmentation':
      return `${name} is at ${lens.metricA.value}% focus against ${lens.metricB.value}% fragmentation — outside the healthy band for ${teamSize}.`;
    case 'interruptions-resolution':
      return `${name} is seeing ${lens.metricA.display} with ${lens.metricB.display} — interruptions and resolution time are both moving the wrong way.`;
    case 'concentration-risk':
      return `${name} has ${lens.metricA.value}% of activity with the top contributor — above the 70% concentration risk threshold for a ${dept.size}-person initiative.`;
  }
}

function getHealthyDepartmentNames(departments: ExecutiveDepartment[]): string[] {
  return departments
    .filter((dept) => {
      const type = resolveDepartmentType(dept.departmentType, { isInitiative: dept.isInitiative });
      return buildDepartmentLensView(type, dept.metrics).status === 'healthy';
    })
    .filter((dept) => !dept.isInitiative)
    .map((dept) => dept.name);
}

export function getExecutiveDepartmentCallouts(
  departments: ExecutiveDepartment[] = EXECUTIVE_DEPARTMENTS
): {
  healthySummary: string;
  attentionParagraph: string;
} {
  const callouts = departments
    .map(formatDepartmentCallout)
    .filter((line): line is string => line !== null);

  const healthyNames = getHealthyDepartmentNames(departments);
  const healthySummary =
    healthyNames.length >= 2
      ? `${healthyNames.slice(0, 2).join(' and ')} are operating within healthy bands.`
      : healthyNames.length === 1
      ? `${healthyNames[0]} is operating within a healthy band.`
      : '';

  const attentionParagraph =
    callouts.length === 0
      ? 'No departments are flagged outside their function-specific operating bands this month.'
      : callouts.length === 1
      ? `${callouts[0]}`
      : `${callouts.length} areas warrant a closer look. ${callouts.join(' ')}`;

  return { healthySummary, attentionParagraph };
}

export function getDepartmentStatusTone(status: LensStatus): 'good' | 'warn' | 'overload' {
  if (status === 'healthy') return 'good';
  if (status === 'watch') return 'warn';
  return 'overload';
}
