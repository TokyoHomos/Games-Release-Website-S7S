import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { games, genres, platforms } from "@/data";

export function TrendingTagsSection() {
  const genreCounts = genres
    .map((genre) => ({
      genre,
      count: games.filter((game) => game.genreIds.includes(genre.id)).length,
    }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);

  const platformCounts = platforms
    .map((platform) => ({
      platform,
      count: games.filter((game) => game.platformIds.includes(platform.id))
        .length,
    }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <section aria-labelledby="trending-tags-heading" className="grid gap-10">
      <div>
        <SectionHeading
          headingId="trending-tags-heading"
          eyebrow="Discover"
          title="Trending tags"
        />
        <ul className="mt-5 flex flex-wrap gap-2">
          {genreCounts.map(({ genre, count }) => (
            <li key={genre.id}>
              <Link
                href={{ pathname: "/releases", query: { genre: genre.slug } }}
                className="focus-ring border-border bg-surface hover:border-primary hover:text-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
              >
                {genre.name}
                <span className="text-secondary text-xs font-normal">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-bold tracking-[0.1em] uppercase">
          Popular platforms
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {platformCounts.map(({ platform, count }) => (
            <li key={platform.id}>
              <Link
                href={{
                  pathname: "/releases",
                  query: { platform: platform.id },
                }}
                className="focus-ring border-border bg-surface hover:border-primary inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-2 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                {platform.shortName}
                <span className="text-secondary text-xs font-normal">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
