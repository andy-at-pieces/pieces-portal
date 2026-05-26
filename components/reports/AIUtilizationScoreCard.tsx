import { MetricCard } from '@/components/ui';
import { AIUtilizationScoreBreakdown, formatBreakdownCaption } from '@/lib/scores/aiUtilization';

type AIUtilizationScoreCardProps = {
  total: number;
  breakdown?: AIUtilizationScoreBreakdown;
  caption?: string;
  secondaryLabel?: string;
  secondaryValue?: string;
};

export default function AIUtilizationScoreCard({
  total,
  breakdown,
  caption,
  secondaryLabel,
  secondaryValue,
}: AIUtilizationScoreCardProps) {
  const display = Number.isInteger(total) ? String(total) : total.toFixed(1);
  const footnoteParts = [
    breakdown ? formatBreakdownCaption(breakdown) : caption?.replace(/\.$/, ''),
    secondaryLabel && secondaryValue ? `${secondaryLabel} ${secondaryValue}` : null,
  ].filter(Boolean);

  return (
    <MetricCard
      label="AI Utilization"
      value={display}
      unit="/10"
      footnote={footnoteParts.length > 0 ? footnoteParts.join(' · ') : undefined}
    />
  );
}
