# Kimi Component Specification — Milestone 1C

## Purpose and scope

This document defines Kimi's first reusable component batch for GameSignal.
Claude's homepage is the visual and behavioral source of truth. Kimi should
extract reusable presentation without redesigning the page, changing route
ownership, duplicating domain models, or importing global mock arrays into
presentational components.

Kimi should create only the five component files specified below. The Lead
Engineer will integrate them into the existing homepage after review.

## Existing contracts to reuse

Import domain models from `@/types`:

- `Game`
- `GameRelease`
- `Platform`
- `NewsArticle`
- `CredibilityAssessment`
- `CredibilityVerdict`
- `ISODateString`

Reuse these existing helpers and components:

- `StatusPill` from `@/components/ui/status-pill`
- `cn` and `formatDate` from `@/lib/utils`
- Next.js `Link` for navigation; never emulate a link with a click handler

Fixtures from `@/data` may appear in examples or parent integration code only.
The five presentational components must receive all data through props.

## Theme and styling contract

Use the semantic Tailwind classes backed by `src/styles/theme.css`:

- Brand: `bg-primary`, `text-primary`, `hover:bg-primary-hover`
- Page: `bg-background`, `text-foreground`
- Cards: `bg-surface`, `bg-surface-elevated`
- Borders: `border-border`
- Muted text: `text-secondary`
- States: `text-success`, `text-warning`, `text-rumor`, `text-leak`,
  `text-destructive`
- Keyboard focus: `focus-ring`
- Shared width: `container-shell`

Do not copy the theme's hex values into component files. A data-provided
`Platform.color` may be applied with an inline style because it is catalog data,
not a theme token.

## First reusable component batch

### 1. GameReleaseCard

**Filename:** `src/components/games/game-release-card.tsx`

**Purpose:** Present a game and one release record as a reusable launch card for
the homepage, release listings, and calendar-adjacent views.

```ts
import type { ComponentPropsWithoutRef } from "react";
import type Link from "next/link";

import type { Game, GameRelease, Platform } from "@/types";

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
```

**Existing shared types:** `Game`, `GameRelease`, and `Platform`.

**Required behavior:**

- Render an `<article>`; the parent owns `<li>` semantics.
- Use `release.releaseWindowLabel` when an exact date is unavailable.
- Use `formatDate` for exact dates.
- Reuse `StatusPill` for the release state or supplied `badgeLabel`.
- Render platform labels from the `platforms` prop; do not perform catalog
  lookups internally.
- Render a real Next.js link only when `href` is supplied.
- Preserve the existing rounded surface, semantic border, spacing, and equal
  height behavior.

**Accessibility:**

- The card title must be a heading.
- Exact dates must use `<time dateTime={release.releaseDate}>`.
- Platform color dots are decorative and must be `aria-hidden`.
- A linked title must retain a visible `focus-ring`.
- The whole card must not become a nested interactive control.

**Responsive behavior:**

- No horizontal overflow at 320 px.
- `default` supports equal-height grid cards.
- `compact` may switch from stacked to row layout at `sm`.
- Long platform lists wrap.

**Example usage:**

```tsx
import { GameReleaseCard } from "@/components/games/game-release-card";
import { gameReleases, games, platforms } from "@/data";

const release = gameReleases[0];
const game = release
  ? games.find((candidate) => candidate.id === release.gameId)
  : undefined;

if (!release || !game) return null;

const releasePlatforms = platforms.filter((platform) =>
  release.platformIds.includes(platform.id),
);

return (
  <GameReleaseCard
    game={game}
    release={release}
    platforms={releasePlatforms}
    badgeLabel="Out now"
    showSummary
  />
);
```

**Homepage replacement target:**
`src/components/home/releasing-today-section.tsx`, replacing the inline
`<li>` card contents inside `releasingToday.map(...)`. The parent keeps the list
and data selection.

**Acceptance criteria:**

- Uses the existing domain interfaces unchanged.
- Supports exact and imprecise release windows.
- Does not import `games`, `gameReleases`, or `platforms`.
- Does not duplicate date formatting.
- Link-free usage contains no fake affordance.
- Passes strict TypeScript and remains visually compatible with the current
  responsive grid.

### 2. NewsCard

**Filename:** `src/components/news/news-card.tsx`

**Purpose:** Present a news article consistently in homepage feeds and future
news listings, with optional credibility context.

```ts
import type { ComponentPropsWithoutRef } from "react";
import type Link from "next/link";

import type { CredibilityAssessment, NewsArticle } from "@/types";

export type NewsCardVariant = "default" | "compact";

export interface NewsCardProps {
  article: NewsArticle;
  assessment?: CredibilityAssessment;
  href?: ComponentPropsWithoutRef<typeof Link>["href"];
  variant?: NewsCardVariant;
  showExcerpt?: boolean;
  className?: string;
}
```

**Existing shared types:** `NewsArticle` and `CredibilityAssessment`.

**Required behavior:**

- Render an `<article>` with category, title, optional excerpt, source, and
  publication time.
- Use `formatDate(article.publishedAt)`.
- Render `CredibilityBadge` only when `assessment` is supplied.
- Use `article.imageUrl` only through `next/image`; provide the dimensions or
  `fill` sizing required to avoid layout shift.
- Render a real Next.js link only when `href` is supplied.
- `compact` must align with the current personalized-feed row treatment.

**Accessibility:**

- Use a heading for the title.
- Use `<time dateTime={article.publishedAt}>`.
- Image alternative text must identify the story, or be empty when the image is
  purely decorative beside an identical linked title.
- Source and credibility text must not rely on color alone.
- Linked titles require a visible `focus-ring`.

**Responsive behavior:**

- `compact` stacks at narrow widths and becomes a row at `sm`.
- `default` works in one-, two-, and three-column parent grids.
- Titles and source names wrap without clipping.
- Images reserve space before loading.

**Example usage:**

```tsx
import { NewsCard } from "@/components/news/news-card";
import { credibilityAssessments, newsArticles } from "@/data";

const article = newsArticles[0];
if (!article) return null;

const assessment = credibilityAssessments.find(
  (candidate) => candidate.articleId === article.id,
);

return (
  <NewsCard
    article={article}
    assessment={assessment}
    href={{ pathname: "/news", query: { article: article.slug } }}
    variant="compact"
    showExcerpt
  />
);
```

**Homepage replacement target:**
`src/components/home/personalized-feed-section.tsx`, replacing the inline
`<article>` presentation for the `"Saved story"` branch after the parent keeps
the `Favorite` lookup and passes the resolved `NewsArticle`. It must not replace
the followed-game branch.

**Acceptance criteria:**

- Uses existing article and assessment types without local copies.
- Does not import mock arrays.
- Omits credibility UI cleanly when no assessment exists.
- Uses `next/image` without layout shift when an image is present.
- Preserves valid list/article nesting and keyboard-visible links.
- Compact rendering matches the current feed rhythm without redesign.

### 3. CredibilityBadge

**Filename:** `src/components/credibility/credibility-badge.tsx`

**Purpose:** Communicate a credibility verdict and optional numeric score with
semantic text and the approved state palette.

```ts
import type { CredibilityAssessment, CredibilityVerdict } from "@/types";

export type CredibilityBadgeSize = "sm" | "md";

export interface CredibilityBadgeProps {
  assessment: Pick<CredibilityAssessment, "score" | "verdict">;
  label?: string;
  showScore?: boolean;
  size?: CredibilityBadgeSize;
  className?: string;
}

export type CredibilityToneMap = Record<
  CredibilityVerdict,
  "success" | "warning" | "rumor" | "leak" | "destructive"
>;
```

**Existing shared types:** `CredibilityAssessment` and
`CredibilityVerdict`.

**Required behavior:**

- Derive the default visible label from `assessment.verdict`.
- Show `assessment.score` only when `showScore` is true.
- Clamp no values and recalculate no scores; render the assessment received.
- Use a module-level exhaustive verdict-to-tone map.
- Use semantic state classes, never copied hex colors.
- The component remains a Server Component.

**Accessibility:**

- Always include readable verdict text.
- Never communicate the verdict through color alone.
- If the score is shown, expose it as “{score} out of 100”.
- Do not add `role="status"` because the badge is not a live update.

**Responsive behavior:**

- Remains readable without wrapping at standard card widths.
- May wrap its label and score as one unit at 320 px.
- `sm` is suitable for compact feed rows; `md` is suitable for default cards.

**Example usage:**

```tsx
import { CredibilityBadge } from "@/components/credibility/credibility-badge";
import { credibilityAssessments } from "@/data";

const assessment = credibilityAssessments[0];
if (!assessment) return null;

return <CredibilityBadge assessment={assessment} showScore size="sm" />;
```

**Homepage replacement target:**
There is no trustworthy standalone credibility badge in the current homepage
to replace. During `NewsCard` integration, use it inside the saved-story
presentation in `src/components/home/personalized-feed-section.tsx` instead of
adding another inline verdict pill. Do not replace game or release status pills.

**Acceptance criteria:**

- All `CredibilityVerdict` values are handled exhaustively.
- Verdict and score remain understandable without color.
- Score output is accessible and bounded by the source model contract.
- No client directive, effects, or local assessment logic.
- `NewsCard` can compose it without circular imports.

### 4. CountdownTimer

**Filename:** `src/components/ui/countdown-timer.tsx`

**Purpose:** Keep a release countdown current after hydration and provide a
stable, accessible replacement for the hero's server-generated countdown text.

```ts
import type { ISODateString } from "@/types";

export type CountdownTimerVariant = "days" | "detailed";

export interface CountdownTimerProps {
  targetDate: ISODateString;
  variant?: CountdownTimerVariant;
  expiredLabel?: string;
  prefix?: string;
  className?: string;
}
```

**Existing shared types:** `ISODateString`.

**Required behavior:**

- This is a Client Component.
- Calculate from `targetDate` only; do not import release fixtures.
- `days` renders a whole-day label compatible with the existing hero.
- `detailed` renders days, hours, minutes, and seconds.
- Update at the minimum useful interval: once per minute for `days`, once per
  second for `detailed`.
- Clear the interval on unmount.
- Render `expiredLabel` after the target time, defaulting to “Available now”.
- Avoid hydration mismatch by rendering a deterministic initial fallback and
  calculating live values after mount.

**Accessibility:**

- The visible countdown must have a concise accessible label.
- Do not use an assertive live region.
- For `detailed`, use `aria-live="polite"` no more frequently than once per
  minute; seconds remain visual and `aria-hidden`.
- Respect reduced motion; the timer must not animate digits.

**Responsive behavior:**

- `days` remains inline.
- `detailed` wraps unit groups without overflow at 320 px.
- Use tabular numerals to prevent layout jitter.

**Example usage:**

```tsx
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { gameReleases } from "@/data";

const release = gameReleases.find((candidate) => candidate.releaseDate);
if (!release?.releaseDate) return null;

return (
  <CountdownTimer
    targetDate={release.releaseDate}
    variant="days"
    prefix="Releasing in"
  />
);
```

**Homepage replacement target:**
`src/components/home/hero-carousel.tsx`, replacing the inline countdown
`<dd>{activeItem.countdownLabel}</dd>`. The Lead Engineer must first add the
exact release date to `HeroCarouselItem` in
`src/components/home/featured-release-hero.tsx`; Kimi must not make that
integration change.

**Acceptance criteria:**

- No hydration warning or invalid-date crash.
- Intervals are cleaned up.
- Expired dates produce the configured label.
- Days and detailed variants are covered by unit tests using fake timers.
- No fixture imports and no animation dependency.

### 5. SkeletonCard

**Filename:** `src/components/ui/skeleton-card.tsx`

**Purpose:** Provide a reusable, layout-stable loading placeholder matching the
release and news card geometries.

```ts
export type SkeletonCardVariant = "game-release" | "news";

export interface SkeletonCardProps {
  variant?: SkeletonCardVariant;
  compact?: boolean;
  ariaLabel?: string;
  className?: string;
}
```

**Existing shared types:** None. This is a UI primitive and must not duplicate
domain models.

**Required behavior:**

- Render one placeholder `<article>` per component instance.
- Match the final card's approximate image, heading, metadata, and body blocks
  to minimize layout shift.
- Use only `bg-surface`, `bg-surface-elevated`, and `border-border`.
- Do not add a dependency.
- Any pulse effect must be disabled for reduced-motion users.

**Accessibility:**

- Default `ariaLabel` to “Loading content”.
- Set `aria-busy="true"` on the placeholder.
- Mark decorative skeleton bars `aria-hidden="true"`.
- Do not expose fake headings, dates, or links to assistive technology.

**Responsive behavior:**

- Match `GameReleaseCard` and `NewsCard` width behavior.
- `compact` stacks at narrow widths and becomes row-shaped at `sm`.
- Never set a fixed width that can overflow a 320 px viewport.

**Example usage:**

```tsx
import { SkeletonCard } from "@/components/ui/skeleton-card";

return (
  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
    {Array.from({ length: 3 }, (_, index) => (
      <li key={index}>
        <SkeletonCard variant="game-release" />
      </li>
    ))}
  </ul>
);
```

**Homepage replacement target:**
The homepage currently has no inline loading skeleton to replace. Its first
integration point is a future Suspense fallback around the release/news blocks
owned by `src/components/home/home-page.tsx`. Do not replace the permanent
placeholder artwork in `anticipated-games-section.tsx`; that element represents
missing artwork, not loading state.

**Acceptance criteria:**

- Geometry is compatible with both card variants.
- No fake semantic content is announced.
- Reduced-motion users receive no pulsing animation.
- No fixed-width overflow or cumulative layout shift is introduced.
- Multiple instances remain the parent's responsibility.

## Inline UI inventory for later batches

The repository review found these additional reusable patterns. They are not
part of Kimi's first five-file batch:

| Inline pattern                              | Current location                                                  | Later component candidate                        |
| ------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------ |
| Section eyebrow/title/description/action    | `src/components/home/section-heading.tsx` and five sections       | `src/components/ui/section-heading.tsx`          |
| Primary, secondary, ghost, and icon actions | Hero, CTA, header, section actions, filters                       | `Button`, `ButtonLink`, `IconButton`, `IconLink` |
| Genre/platform pills with optional counts   | Hero, anticipated games, trending tags                            | `TagChip`                                        |
| Platform dot-and-label lists                | Hero and anticipated games                                        | `PlatformBadges`                                 |
| Anticipated game article                    | `anticipated-games-section.tsx`                                   | `GameCard`                                       |
| Calendar event row                          | `release-calendar-section.tsx`                                    | `CalendarEventCard`                              |
| Followed-game feed row                      | `personalized-feed-section.tsx`                                   | `FeedItemCard`                                   |
| Repeated radio/checkbox fieldsets           | `release-filters.tsx`                                             | `ReleaseFilterGroup`                             |
| Empty-state surface                         | `releasing-today-section.tsx` and `personalized-feed-section.tsx` | `EmptyState`                                     |
| Repeated card shell                         | Release, calendar, feed, and anticipated sections                 | `Card` or shared card class contract             |

## Files Kimi must not modify

Kimi should add only these five files:

- `src/components/games/game-release-card.tsx`
- `src/components/news/news-card.tsx`
- `src/components/credibility/credibility-badge.tsx`
- `src/components/ui/countdown-timer.tsx`
- `src/components/ui/skeleton-card.tsx`

Kimi must not modify:

- `package.json`, `pnpm-lock.yaml`, or `pnpm-workspace.yaml`
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`,
  `postcss.config.mjs`, or `.prettierrc.json`
- `.env.example`, `.gitignore`, `README.md`, or any file under `docs/`
- Any file under `src/app/`
- Any file under `src/data/`, `src/types/`, `src/lib/`, or `src/styles/`
- Existing files under `src/components/home/`, `src/components/layout/`,
  `src/components/games/`, `src/components/news/`,
  `src/components/credibility/`, or `src/components/ui/`

The five new files may import one another only in this direction:
`NewsCard` may import `CredibilityBadge`; no other circular dependency is
allowed.

If a requirement cannot be expressed with existing types or tokens, report it
in the handoff rather than changing an owned file.

## Global acceptance criteria

Kimi's batch is acceptable when:

1. All five files exist at the exact paths above.
2. Every public prop and variant type is exported.
3. Strict TypeScript passes without `any`, `@ts-ignore`, duplicated domain
   interfaces, or unsafe assertions.
4. Presentational components receive data through props and import no mock
   arrays.
5. Semantic theme classes replace copied theme colors.
6. Native link, time, heading, and article semantics are preserved.
7. Interactive behavior is keyboard operable and focus remains visible.
8. Components work at 320 px, 768 px, and desktop widths.
9. Countdown tests cover future and expired dates with fake timers.
10. `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and
    `pnpm build` pass without configuration or dependency changes.
