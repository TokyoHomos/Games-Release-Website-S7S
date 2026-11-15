import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { StatusPill } from "@/components/ui/status-pill";
import { cn, formatDate } from "@/lib/utils";
import type { Game, GameRelease, Platform, ReleaseStatus } from "@/types";

export type GameReleaseCardVariant = "default" | "compact";

export interface GameReleaseCardProps {
  game: Game;
  release: GameRelease;
  platforms: readonly Platform[];
  href?: ComponentPropsWithoutRef<typeof Link>["href"];
  badgeLabel?: string;
  variant?: GameReleaseCardVariant;
  showSummary?: boolean;
  className?: string;
}

const RELEASE_TONE: Record<ReleaseStatus, "success" | "warning" | "neutral"> = {
  confirmed: "success",
  expected: "neutral",
  delayed: "warning",
  released: "success",
};

export function GameReleaseCard({
  game,
  release,
  platforms,
  href,
  badgeLabel,
  variant = "default",
  showSummary = false,
  className,
}: GameReleaseCardProps) {
  const hasExactDate =
    release.precision === "exact" && Boolean(release.releaseDate);
  const title = href ? (
    <Link
      href={href}
      className="focus-ring rounded-sm underline-offset-4 hover:underline"
    >
      {game.title}
    </Link>
  ) : (
    game.title
  );

  return (
    <article
      className={cn(
        "border-border bg-surface flex h-full min-w-0 flex-col rounded-xl border p-5",
        variant === "compact" && "sm:flex-row sm:items-start sm:gap-5",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <StatusPill tone={RELEASE_TONE[release.status]}>
          {badgeLabel ?? release.status.replace("-", " ")}
        </StatusPill>

        <h3 className="mt-3 min-w-0 text-lg font-bold break-words text-balance">
          {title}
        </h3>

        {showSummary ? (
          <p className="text-secondary mt-2 text-sm leading-6">
            {game.summary}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "border-border mt-4 flex min-w-0 flex-col gap-3 border-t pt-4",
          variant === "compact" && "sm:mt-0 sm:border-t-0 sm:pt-1",
        )}
      >
        <div>
          <p className="text-secondary text-xs font-semibold">Release window</p>
          {hasExactDate && release.releaseDate ? (
            <time
              dateTime={release.releaseDate}
              className="mt-1 block text-sm font-semibold"
            >
              {formatDate(release.releaseDate)}
            </time>
          ) : (
            <p className="mt-1 text-sm font-semibold">
              {release.releaseWindowLabel}
            </p>
          )}
        </div>

        {platforms.length > 0 ? (
          <ul
            aria-label="Available platforms"
            className="flex min-w-0 flex-wrap gap-x-3 gap-y-2"
          >
            {platforms.map((platform) => (
              <li
                key={platform.id}
                className="text-secondary flex min-w-0 items-center gap-1.5 text-xs font-semibold"
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="break-words">{platform.shortName}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
