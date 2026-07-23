import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { favorites } from "@/data";
import { getArticleById, getGameById } from "@/data/selectors";
import { formatDate } from "@/lib/utils";

const DEMO_USER_ID = "user-demo";

export function PersonalizedFeedSection() {
  const feedItems = favorites
    .filter((favorite) => favorite.userId === DEMO_USER_ID)
    .flatMap((favorite) => {
      if (favorite.targetType === "game") {
        const game = getGameById(favorite.targetId);
        if (!game) return [];
        return [
          {
            id: favorite.id,
            kind: "Followed game",
            title: game.title,
            excerpt: game.summary,
            date: favorite.createdAt,
          },
        ];
      }
      const article = getArticleById(favorite.targetId);
      if (!article) return [];
      return [
        {
          id: favorite.id,
          kind: "Saved story",
          title: article.title,
          excerpt: article.excerpt,
          date: favorite.createdAt,
        },
      ];
    });

  return (
    <section aria-labelledby="personalized-feed-heading">
      <SectionHeading
        headingId="personalized-feed-heading"
        eyebrow="For you"
        title="Personalized feed"
        description="A preview of what your feed looks like once you follow games and save stories."
        action={
          <Link
            href="/favorites"
            className="focus-ring border-border bg-surface hover:bg-surface-elevated rounded-md border px-4 py-2 text-sm font-semibold transition-colors"
          >
            View favorites
          </Link>
        }
      />

      {feedItems.length > 0 ? (
        <ul className="mt-6 grid gap-3">
          {feedItems.map((item) => (
            <li key={item.id}>
              <article className="border-border bg-surface flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <StatusPill>{item.kind}</StatusPill>
                  <h3 className="mt-2 text-base font-bold">{item.title}</h3>
                  <p className="text-secondary mt-1 text-sm leading-6">
                    {item.excerpt}
                  </p>
                </div>
                <time
                  dateTime={item.date}
                  className="text-secondary text-xs font-semibold whitespace-nowrap"
                >
                  {formatDate(item.date)}
                </time>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-border bg-surface text-secondary mt-6 rounded-xl border p-6 leading-7">
          Sign in and follow a game or save a story to build your feed.
        </p>
      )}
    </section>
  );
}
