import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { gameReleases } from "@/data";
import { getGameById } from "@/data/selectors";
import { formatDate } from "@/lib/utils";

function isToday(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate()
  );
}

export function ReleasingTodaySection() {
  const releasingToday = gameReleases.filter(
    (release) => release.releaseDate && isToday(release.releaseDate),
  );

  const nextRelease = [...gameReleases]
    .filter((release) => release.releaseDate)
    .sort((a, b) => (a.releaseDate ?? "").localeCompare(b.releaseDate ?? ""))
    .find(
      (release) =>
        release.releaseDate && new Date(release.releaseDate) > new Date(),
    );

  return (
    <section aria-labelledby="releasing-today-heading">
      <SectionHeading
        headingId="releasing-today-heading"
        eyebrow="Today"
        title="Releasing today"
        description="Confirmed launches landing on their release day."
      />

      {releasingToday.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {releasingToday.map((release) => {
            const game = getGameById(release.gameId);
            if (!game) return null;
            return (
              <li
                key={release.id}
                className="border-border bg-surface rounded-xl border p-5"
              >
                <StatusPill tone="success">Out now</StatusPill>
                <h3 className="mt-4 text-lg font-bold">{game.title}</h3>
                <p className="text-secondary mt-2 text-sm leading-6">
                  {game.summary}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="border-border bg-surface mt-6 rounded-xl border p-6">
          <p className="text-secondary leading-7">
            Nothing is scheduled to release today.
            {nextRelease ? (
              <>
                {" "}
                The next confirmed window is{" "}
                <span className="text-foreground font-semibold">
                  {getGameById(nextRelease.gameId)?.title}
                </span>{" "}
                on{" "}
                <span className="text-foreground font-semibold">
                  {nextRelease.releaseDate
                    ? formatDate(nextRelease.releaseDate, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : nextRelease.releaseWindowLabel}
                </span>
                .
              </>
            ) : null}
          </p>
          <Link
            href="/calendar"
            className="focus-ring text-primary mt-3 inline-block text-sm font-semibold"
          >
            View the full release calendar →
          </Link>
        </div>
      )}
    </section>
  );
}
