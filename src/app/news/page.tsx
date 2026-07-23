import { PageIntro } from "@/components/ui/page-intro";
import { StatusPill } from "@/components/ui/status-pill";
import { newsArticles } from "@/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "News" };

export default function NewsPage() {
  return (
    <section className="container-shell page-section">
      <PageIntro
        eyebrow="Newsroom"
        title="The story, separated from the noise."
        description="Reporting is linked to games, sources, and credibility assessments from the start."
      />
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {newsArticles.map((article) => (
          <article
            className="border-border bg-surface flex flex-col rounded-xl border p-6"
            key={article.id}
          >
            <div className="flex items-center justify-between gap-3">
              <StatusPill
                tone={article.category === "rumor" ? "rumor" : "neutral"}
              >
                {article.category}
              </StatusPill>
              <time className="text-secondary text-xs">
                {formatDate(article.publishedAt)}
              </time>
            </div>
            <h2 className="mt-6 text-xl font-bold text-balance">
              {article.title}
            </h2>
            <p className="text-secondary mt-3 leading-7">{article.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
