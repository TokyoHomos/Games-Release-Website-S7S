import { cn } from "@/lib/utils";

export type SkeletonCardVariant = "game-release" | "news";

export interface SkeletonCardProps {
  variant?: SkeletonCardVariant;
  compact?: boolean;
  ariaLabel?: string;
  className?: string;
}

function SkeletonBar({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-surface-elevated block animate-pulse rounded motion-reduce:animate-none",
        className,
      )}
    />
  );
}

export function SkeletonCard({
  variant = "game-release",
  compact = false,
  ariaLabel = "Loading content",
  className,
}: SkeletonCardProps) {
  const isNews = variant === "news";

  return (
    <article
      aria-label={ariaLabel}
      aria-busy="true"
      className={cn(
        "border-border bg-surface flex min-w-0 flex-col overflow-hidden rounded-xl border p-5",
        compact && "sm:flex-row sm:items-start sm:gap-5",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "bg-surface-elevated mb-4 h-32 w-full shrink-0 animate-pulse rounded-lg motion-reduce:animate-none",
          compact && "sm:mb-0 sm:h-20 sm:w-32",
          isNews && !compact && "h-40",
        )}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <SkeletonBar className="h-6 w-24" />
          {isNews ? <SkeletonBar className="h-4 w-20" /> : null}
        </div>

        <SkeletonBar className="h-6 w-4/5 max-w-sm" />
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-2/3" />

        {!isNews ? (
          <div
            aria-hidden="true"
            className="border-border mt-auto flex flex-wrap gap-2 border-t pt-4"
          >
            <SkeletonBar className="h-5 w-14" />
            <SkeletonBar className="h-5 w-16" />
            <SkeletonBar className="h-5 w-12" />
          </div>
        ) : (
          <SkeletonBar className="mt-2 h-4 w-28" />
        )}
      </div>
    </article>
  );
}
