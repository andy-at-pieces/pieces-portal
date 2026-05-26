export type RoleId =
  | 'engineering-staff-engineering'
  | 'go-to-market-revenue'
  | 'customer-success-team';

export type KpiId =
  | 'focus'
  | 'primary'
  | 'review'
  | 'concentration'
  | 'ai'
  | 'context';

export type RoleOption = {
  id: RoleId;
  department: string;
  title: string;
};

export type KpiDefinition = {
  id: KpiId;
  name: string;
  desc: string;
  defaultTarget: string;
  measureCadence: string;
  /** Lower = higher priority when auto-selecting for a role. */
  recommendOrder: number;
};

export type KpiSelection = {
  id: KpiId;
  selected: boolean;
  target: string;
};

export type PulsePreview = {
  headline: string;
  narrative: string[];
  tags: string[];
};
