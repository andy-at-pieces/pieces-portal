import type { RoleId, RoleOption } from './types';

export const DEFAULT_ROLE_ID: RoleId = 'engineering-staff-engineering';

export const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'engineering-staff-engineering',
    department: 'Engineering',
    title: 'Staff Engineering',
  },
  {
    id: 'go-to-market-revenue',
    department: 'Go-to-Market',
    title: 'Revenue',
  },
  {
    id: 'customer-success-team',
    department: 'Customer Success',
    title: 'Customer Success',
  },
];

export function getRoleById(id: RoleId): RoleOption {
  const role = ROLE_OPTIONS.find((r) => r.id === id);
  if (!role) throw new Error(`Unknown role: ${id}`);
  return role;
}

export function formatRoleLabel(role: RoleOption): string {
  return `${role.department} · ${role.title}`;
}
