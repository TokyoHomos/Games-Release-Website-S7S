import { cn } from "@/lib/utils";
import type { CredibilityAssessment, CredibilityVerdict } from "@/types";

export type CredibilityBadgeSize = "sm" | "md";

export interface CredibilityBadgeProps {
  assessment: Pick<CredibilityAssessment, "score" | "verdict">;
  label?: string;
  showScore?: boolean;
  size?: CredibilityBadgeSize;
  className?: string;
}

export type CredibilityToneMap = Record<
  CredibilityVerdict,
  "success" | "warning" | "rumor" | "leak" | "destructive"
>;

const VERDICT_LABEL: Record<CredibilityVerdict, string> = {
  verified: "Verified",
  credible: "Credible",
  unconfirmed: "Unconfirmed",
  questionable: "Questionable",
  false: "False",
};

const VERDICT_TONE: CredibilityToneMap = {
  verified: "success",
  credible: "success",
  unconfirmed: "warning",
  questionable: "rumor",
  false: "destructive",
};

const TONE_CLASSES: Record<CredibilityToneMap[CredibilityVerdict], string> = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  rumor: "border-rumor/30 bg-rumor/10 text-rumor",
  leak: "border-leak/30 bg-leak/10 text-leak",
  destructive: "border-destructive/30 bg-destructive/10 text-destructive",
};

const SIZE_CLASSES: Record<CredibilityBadgeSize, string> = {
  sm: "gap-1 px-2 py-0.5 text-xs",
  md: "gap-1.5 px-2.5 py-1 text-sm",
};

export function CredibilityBadge({
  assessment,
  label,
  showScore = false,
  size = "md",
  className,
}: CredibilityBadgeProps) {
  const verdict = label ?? VERDICT_LABEL[assessment.verdict];
  const tone = VERDICT_TONE[assessment.verdict];

  return (
    <span
      className={cn(
        "inline-flex max-w-full flex-wrap items-center rounded-full border font-semibold",
        SIZE_CLASSES[size],
        TONE_CLASSES[tone],
        className,
      )}
    >
      <span>{verdict}</span>
      {showScore ? (
        <span className="whitespace-nowrap">
          <span aria-hidden="true"> · </span>
          Score {assessment.score}
          <span aria-hidden="true">/100</span>
          <span className="sr-only"> out of 100</span>
        </span>
      ) : null}
    </span>
  );
}
