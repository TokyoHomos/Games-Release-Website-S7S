import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-primary text-xs font-bold tracking-[0.16em] uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="text-secondary mt-2 max-w-2xl leading-7">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
