import { SectionHeading } from "@/components/home/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { games, genres, platforms } from "@/data";
import type { GameStatus } from "@/types";

const ANTICIPATION_RANK: Record<GameStatus, number> = {
  announced: 0,
  "in-development": 1,
  "early-access": 2,
  delayed: 3,
  released: 4,
  cancelled: 5,
};

const STATUS_TONE: Record<GameStatus, "success" | "warning" | "neutral"> = {
  announced: "neutral",
  "in-development": "neutral",
  "early-access": "success",
  delayed: "warning",
  released: "success",
  cancelled: "warning",
};

const EXCLUDED_STATUSES: GameStatus[] = ["released", "cancelled"];

export function AnticipatedGamesSection() {
  const anticipated = [...games]
    .filter((game) => !EXCLUDED_STATUSES.includes(game.status))
    .sort((a, b) => ANTICIPATION_RANK[a.status] - ANTICIPATION_RANK[b.status]);

  return (
    <section aria-labelledby="anticipated-games-heading">
      <SectionHeading
        eyebrow="Most anticipated"
        title="Games everyone is watching"
        description="Upcoming titles ranked by development stage and community interest."
      />

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {anticipated.map((game) => {
          const gameGenres = game.genreIds
            .map((id) => genres.find((genre) => genre.id === id)?.name)
            .filter((name): name is string => Boolean(name));
          const gamePlatforms = game.platformIds
            .map((id) => platforms.find((platform) => platform.id === id))
            .filter((platform): platform is (typeof platforms)[number] =>
              Boolean(platform),
            );

          return (
            <li key={game.id}>
              <article className="border-border bg-surface flex h-full flex-col rounded-xl border p-5">
                <div
                  aria-hidden="true"
                  className="border-border/60 mb-4 h-28 rounded-lg border bg-gradient-to-br from-[color-mix(in_oklch,var(--primary)_25%,var(--surface-elevated))] to-[var(--surface-elevated)]"
                />
                <StatusPill tone={STATUS_TONE[game.status]}>
                  {game.status.replace("-", " ")}
                </StatusPill>
                <h3 className="mt-3 text-lg font-bold text-balance">
                  {game.title}
                </h3>
                <p className="text-secondary mt-2 text-sm leading-6">
                  {game.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {gameGenres.map((genre) => (
                    <span
                      key={genre}
                      className="border-border text-secondary rounded-full border px-2 py-0.5 text-xs font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="border-border mt-auto flex flex-wrap gap-2 border-t pt-4">
                  {gamePlatforms.map((platform) => (
                    <span
                      key={platform.id}
                      className="text-secondary flex items-center gap-1.5 text-xs font-semibold"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block size-1.5 rounded-full"
                        style={{ backgroundColor: platform.color }}
                      />
                      {platform.shortName}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
