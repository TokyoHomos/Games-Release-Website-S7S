import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { CredibilityBadge } from "@/components/credibility/credibility-badge";
import { StatusPill } from "@/components/ui/status-pill";
import { cn, formatDate } from "@/lib/utils";
import type { CredibilityAssessment, NewsArticle, NewsCategory } from "@/types";

export type NewsCardVariant = "default" | "compact";

export interface NewsCardProps {
  article: NewsArticle;
  assessment?: CredibilityAssessment;
  href?: ComponentPropsWithoutRef<typeof Link>["href"];
  variant?: NewsCardVariant;
  showExcerpt?: boolean;
  className?: string;
}

const CATEGORY_TONE: Record<
  NewsCategory,
  "neutral" | "success" | "rumor" | "leak"
> = {
  announcement: "neutral",
  release: "success",
  industry: "neutral",
  update: "neutral",
  rumor: "rumor",
  leak: "leak",
};

export function NewsCard({
  article,
  assessment,
  href,
  variant = "default",
  showExcerpt = true,
  className,
}: NewsCardProps) {
  const title = href ? (
    <Link
      href={href}
      className="focus-ring rounded-sm underline-offset-4 hover:underline"
    >
      {article.title}
    </Link>
  ) : (
    article.title
  );

  return (
    <article
      className={cn(
        "border-border bg-surface flex min-w-0 flex-col overflow-hidden rounded-xl border",
        variant === "compact" && "sm:flex-row sm:items-start",
        className,
      )}
    >
      {article.imageUrl ? (
        <div
          className={cn(
            "bg-surface-elevated relative aspect-video w-full shrink-0 overflow-hidden",
            variant === "compact" && "sm:aspect-auto sm:h-24 sm:w-40",
          )}
        >
          <Image
            src={article.imageUrl}
            alt={`Artwork for ${article.title}`}
            width={640}
            height={360}
            unoptimized
            className="size-full object-cover"
          />
        </div>
      ) : null}

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col p-5",
          variant === "compact" && "sm:p-4",
        )}
      >
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
          <StatusPill tone={CATEGORY_TONE[article.category]}>
            {article.category.replace("-", " ")}
          </StatusPill>
          <time
            dateTime={article.publishedAt}
            className="text-secondary text-xs font-medium"
          >
            {formatDate(article.publishedAt)}
          </time>
        </div>

        <h3 className="mt-4 min-w-0 text-lg font-bold text-balance break-words">
          {title}
        </h3>

        {showExcerpt ? (
          <p className="text-secondary mt-2 text-sm leading-6">
            {article.excerpt}
          </p>
        ) : null}

        <div className="mt-4 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-secondary min-w-0 text-xs">
            Source:{" "}
            <a
              href={article.sourceUrl}
              className="focus-ring text-foreground rounded-sm font-semibold underline-offset-2 hover:underline"
            >
              {article.sourceName}
            </a>
          </p>
          {assessment ? (
            <CredibilityBadge assessment={assessment} size="sm" showScore />
          ) : null}
        </div>
      </div>
    </article>
  );
}
