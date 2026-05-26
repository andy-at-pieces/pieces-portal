export type CustomerPattern = {
  id: string;
  label: string;
  headline: string;
  caption: string;
};

const CUSTOMER_PATTERNS: readonly CustomerPattern[] = [
  {
    id: 'quarterly-report-disney',
    label: 'CUSTOMER PATTERN',
    headline: '6 hours → under 1 hour',
    caption:
      'Disney pattern: quarterly reports auto-drafted from Jira templates + organizational memory. Observed at 3 customers.',
  },
] as const;

export function getCustomerQuarterlyReportPattern(): CustomerPattern {
  return CUSTOMER_PATTERNS[0];
}

