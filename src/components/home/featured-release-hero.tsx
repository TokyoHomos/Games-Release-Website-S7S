import {
  type HeroCarouselItem,
  HeroCarousel,
} from "@/components/home/hero-carousel";
import { gameReleases, genres, platforms } from "@/data";
import { getGameById } from "@/data/selectors";
import { formatDate } from "@/lib/utils";
import type { ReleaseStatus } from "@/types";

const STATUS_TONE: Record<ReleaseStatus, "success" | "warning" | "neutral"> = {
  confirmed: "success",
  released: "success",
  expected: "neutral",
  delayed: "warning",
};

function getCountdownLabel(releaseDate: string | undefined): string {
  if (!releaseDate) return "Date TBD";
  const daysUntil = Math.ceil(
    (new Date(releaseDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  if (daysUntil > 1) return `${daysUntil} days`;
  if (daysUntil === 1) return "Tomorrow";
  if (daysUntil === 0) return "Releasing today";
  return "Available now";
}

export function FeaturedReleaseHero() {
  const featured = [...gameReleases]
    .sort((a, b) => {
      if (a.status === "confirmed" && b.status !== "confirmed") return -1;
      if (b.status === "confirmed" && a.status !== "confirmed") return 1;
      if (!a.releaseDate) return 1;
      if (!b.releaseDate) return -1;
      return a.releaseDate.localeCompare(b.releaseDate);
    })
    .slice(0, 3);

  const items: HeroCarouselItem[] = featured.flatMap((release) => {
    const game = getGameById(release.gameId);
    if (!game) return [];

    const genreNames = game.genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter((name): name is string => Boolean(name));

    const platformLabels = release.platformIds
      .map((id) => platforms.find((platform) => platform.id === id))
      .filter((platform): platform is (typeof platforms)[number] =>
        Boolean(platform),
      );

    const accentColor = platformLabels[0]?.color ?? "var(--primary)";

    const item: HeroCarouselItem = {
      id: release.id,
      gameId: game.id,
      title: game.title,
      summary: game.summary,
      releaseWindowLabel:
        release.precision === "exact" && release.releaseDate
          ? formatDate(release.releaseDate, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : release.releaseWindowLabel,
      countdownLabel: getCountdownLabel(release.releaseDate),
      statusLabel: release.status,
      statusTone: STATUS_TONE[release.status],
      genreNames,
      platformLabels: platformLabels.map((platform) => platform.shortName),
      accentColor,
    };

    return [item];
  });

  if (items.length === 0) return null;

  return (
    <section aria-label="Featured releases" className="container-shell pt-8">
      <HeroCarousel items={items} />
    </section>
  );
}
