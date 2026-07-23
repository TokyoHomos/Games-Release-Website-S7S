import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface StatusPillProps {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "rumor" | "leak";
}

const toneClasses = {
  neutral: "border-border bg-surface-elevated text-secondary",
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  rumor: "border-rumor/30 bg-rumor/10 text-rumor",
  leak: "border-leak/30 bg-leak/10 text-leak",
};

export function StatusPill({ children, tone = "neutral" }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
