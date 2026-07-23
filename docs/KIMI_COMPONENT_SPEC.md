# Kimi Reusable Component Specification

## Purpose

This specification defines Kimi's component-only contribution for the combined
Milestone 1 repository. Claude's homepage is the visual and behavioral source of
truth. Kimi should extract repeated presentation into typed components without
redesigning the page, changing mock data, or moving route responsibilities.

Kimi's branch should **add only the files listed below**. The lead integrator
will replace Claude's inline markup after reviewing Kimi's components.

## Existing contracts to reuse

Import domain models from `@/types`:

- `Game`
- `GameRelease`
- `Platform`
- `Genre`
- `GameStatus`
- `ReleaseStatus`
- `NewsArticle`
- `Favorite`
- `CalendarEvent`
- `CalendarEventType`

Import fixtures from `@/data` only in examples, stories, or parent integration
code. Presentational components must receive data through props and must not
import the global mock arrays directly.

Reuse these existing components and helpers rather than duplicating them:

- `StatusPill` from `@/components/ui/status-pill`
- `PageContainer` from `@/components/layout/page-container`
- `HeroCarousel` from `@/components/home/hero-carousel`
- `cn` and `formatDate` from `@/lib/utils`

## Theme and styling contract

Use semantic Tailwind classes backed by `src/styles/theme.css`:

- Brand: `bg-primary`, `text-primary`, `hover:bg-primary-hover`
- Page: `bg-background`, `text-foreground`
- Cards: `bg-surface`, `bg-surface-elevated`
- Borders: `border-border`
- Muted text: `text-secondary`
- States: `text-success`, `text-warning`, `text-rumor`, `text-leak`,
  `text-destructive`
- Keyboard focus: `focus-ring`
- Shared width: `container-shell`

Do not introduce raw copies of the theme colors. A data-provided
`Platform.color` may be used through an inline `style` because platform colors
are catalog data, not theme values.

## Required components

### 1. Shared section heading

**File:** `src/components/ui/section-heading.tsx`

```ts
import type { ReactNode } from "react";

export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  headingId?: string;
  className?: string;
}
```

Requirements:

- Preserve the current responsive wrapping, typography, spacing, and optional
  action placement.
- Apply `headingId` to the `<h2>` when provided.
- Remain a Server Component.
- Use `cn` for optional classes.

Later replaces:

- The complete implementation in
  `src/components/home/section-heading.tsx`.
- Imports in `anticipated-games-section.tsx`,
  `personalized-feed-section.tsx`, `release-calendar-section.tsx`,
  `releasing-today-section.tsx`, and `trending-tags-section.tsx`.

Example:

```tsx
<SectionHeading
  headingId="anticipated-games-heading"
  eyebrow="Most anticipated"
  title="Games everyone is watching"
  description="Upcoming titles ranked by development stage."
/>
```

Acceptance criteria:

- Optional properties compile with `exactOptionalPropertyTypes`.
- The action wraps below the copy at narrow widths without overflow.
- The heading ID can satisfy the owning section's `aria-labelledby`.

### 2. Button and button link

**File:** `src/components/ui/button.tsx`

```ts
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import type Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}
```

Requirements:

- Export `Button` and `ButtonLink`.
- Preserve native button and Next.js link semantics; do not implement a
  click-handler-based pseudo-link.
- Default button `type` to `"button"` unless explicitly supplied.
- Include `focus-ring`, disabled styling, and a minimum 40×40 px icon target.
- Do not add a class-variance dependency.

Later replaces:

- Follow control in `src/components/home/hero-carousel.tsx`.
- CTA links in `src/components/home/homepage-cta.tsx`.
- Section action links in `personalized-feed-section.tsx` and
  `release-calendar-section.tsx`.
- Clear control in `src/components/games/release-filters.tsx`.

Example:

```tsx
<Button variant="primary" aria-pressed={false}>
  Follow release
</Button>

<ButtonLink href="/calendar" variant="secondary" size="sm">
  Full calendar
</ButtonLink>
```

Acceptance criteria:

- All forwarded native props remain typed.
- Keyboard focus is visible.
- Disabled buttons cannot communicate an enabled visual state.
- Link variants remain crawlable anchors.

### 3. Tag chip

**File:** `src/components/ui/tag-chip.tsx`

```ts
import type { ComponentPropsWithoutRef } from "react";
import type Link from "next/link";

export type TagChipVariant = "default" | "overlay";

export interface TagChipProps {
  label: string;
  count?: number;
  dotColor?: string;
  href?: ComponentPropsWithoutRef<typeof Link>["href"];
  variant?: TagChipVariant;
  className?: string;
}
```

Requirements:

- Render a `<span>` without `href` and a Next.js `<Link>` with `href`.
- Set a decorative color dot to `aria-hidden`.
- Preserve the compact pill treatment and overlay variant used by the hero.
- Never construct query strings manually; accept a typed `href` object.

Later replaces:

- Genre spans inside `AnticipatedGamesSection`.
- Genre spans inside `HeroCarousel`.
- Genre and platform links inside `TrendingTagsSection`.

Example:

```tsx
const genre = genres.find((item) => item.id === "genre-rpg")!;

<TagChip
  label={genre.name}
  count={2}
  href={{ pathname: "/releases", query: { genre: genre.slug } }}
/>;
```

Acceptance criteria:

- Link and non-link variants are visually consistent.
- Counts are announced as part of meaningful link text.
- Overlay contrast remains readable on the hero background.

### 4. Platform badges

**File:** `src/components/games/platform-badges.tsx`

```ts
import type { Platform } from "@/types";

export interface PlatformBadgesProps {
  platforms: readonly Platform[];
  variant?: "inline" | "compact";
  className?: string;
  ariaLabel?: string;
}
```

Requirements:

- Render a semantic list.
- Use `Platform.id` as the key and `Platform.shortName` as the visible label.
- Treat the platform color dot as decorative.
- Return `null` for an empty list.

Later replaces:

- The `gamePlatforms.map` block in
  `src/components/home/anticipated-games-section.tsx`.
- The joined platform text in the hero release details after the integrator
  passes full `Platform` objects to the presentational layer.

Example:

```tsx
const game = games.find((item) => item.id === "game-echoes-of-aether")!;
const supportedPlatforms = platforms.filter((platform) =>
  game.platformIds.includes(platform.id),
);

<PlatformBadges platforms={supportedPlatforms} />;
```

Acceptance criteria:

- No catalog lookup occurs inside the component.
- Long platform sets wrap without horizontal overflow.
- The list has an accessible label when used without nearby context.

### 5. Game card

**File:** `src/components/games/game-card.tsx`

```ts
import type { Game, Genre, Platform } from "@/types";

export interface GameCardProps {
  game: Game;
  genres: readonly Genre[];
  platforms: readonly Platform[];
  statusTone?: "neutral" | "success" | "warning";
  href?: string;
  className?: string;
}
```

Requirements:

- Reuse `StatusPill`, `TagChip`, and `PlatformBadges`.
- Preserve Claude's card height, responsive grid behavior, placeholder artwork,
  summary, status, genre tags, and platform footer.
- The outer component must be an `<article>`; the parent owns the `<li>`.
- If `href` is absent, do not render a fake interactive card.

Later replaces:

- The `<article>` inside `anticipated.map(...)` in
  `src/components/home/anticipated-games-section.tsx`.

Example:

```tsx
const game = games.find((item) => item.id === "game-echoes-of-aether")!;

<GameCard
  game={game}
  genres={genres.filter((genre) => game.genreIds.includes(genre.id))}
  platforms={platforms.filter((platform) =>
    game.platformIds.includes(platform.id),
  )}
  statusTone="neutral"
/>;
```

Acceptance criteria:

- Uses the existing `Game`, `Genre`, and `Platform` models unchanged.
- Does not import `games`, `genres`, or `platforms` from `@/data`.
- Cards in the same CSS grid can stretch to equal height.
- Missing optional links do not produce dead controls.

### 6. Release card

**File:** `src/components/games/release-card.tsx`

```ts
import type { Game, GameRelease, Platform } from "@/types";

export interface ReleaseCardProps {
  game: Game;
  release: GameRelease;
  platforms?: readonly Platform[];
  badgeLabel?: string;
  tone?: "neutral" | "success" | "warning";
  compact?: boolean;
  className?: string;
}
```

Requirements:

- Reuse `StatusPill` and `PlatformBadges`.
- Use `release.releaseWindowLabel` when no exact date is present.
- Use `formatDate` for exact dates.
- The parent owns list semantics.

Later replaces:

- The release `<li>` contents in
  `src/components/home/releasing-today-section.tsx`.
- A later integrator may also use it in `src/app/releases/page.tsx`; Kimi must
  not edit that route.

Example:

```tsx
const release = gameReleases.find((item) => item.id === "release-aether-2026")!;
const game = getGameById(release.gameId)!;

<ReleaseCard
  game={game}
  release={release}
  badgeLabel="Out now"
  tone="success"
/>;
```

Acceptance criteria:

- Supports exact and imprecise release windows.
- Does not mutate or re-sort source arrays.
- Does not duplicate date-formatting logic.

### 7. Calendar event card

**File:** `src/components/calendar/calendar-event-card.tsx`

```ts
import type { CalendarEvent } from "@/types";

export interface CalendarEventCardProps {
  event: CalendarEvent;
  tone?: "neutral" | "success" | "warning" | "rumor";
  className?: string;
}
```

Requirements:

- Render `<article>`, `<time dateTime>`, title, description, and `StatusPill`.
- Derive the visible default label from `event.type`.
- Use `formatDate`; do not introduce component-local date formatting.
- Preserve Claude's stacked-mobile and row-desktop behavior.

Later replaces:

- The `<article>` inside `upcoming.map(...)` in
  `src/components/home/release-calendar-section.tsx`.

Example:

```tsx
const event = calendarEvents.find(
  (item) => item.id === "event-aether-release",
)!;

<CalendarEventCard event={event} tone="success" />;
```

Acceptance criteria:

- Uses `CalendarEvent` unchanged.
- Maintains valid list/article nesting.
- Date, heading, and status remain readable at 320 px width.

### 8. Favorite feed item card

**File:** `src/components/home/feed-item-card.tsx`

```ts
import type { Favorite, Game, NewsArticle } from "@/types";

export type FeedItemSource =
  { kind: "game"; game: Game } | { kind: "article"; article: NewsArticle };

export interface FeedItemCardProps {
  favorite: Favorite;
  source: FeedItemSource;
  className?: string;
}
```

Requirements:

- Derive the label, title, and excerpt from the discriminated `source`.
- Reuse `StatusPill` and `formatDate`.
- Render the favorite timestamp with `<time dateTime>`.
- Return no navigation affordance until a real detail route exists.

Later replaces:

- The anonymous flattened feed object and repeated `<article>` inside
  `feedItems.map(...)` in
  `src/components/home/personalized-feed-section.tsx`.

Examples:

```tsx
const favorite = favorites.find((item) => item.id === "favorite-aether")!;
const game = getGameById(favorite.targetId)!;

<FeedItemCard favorite={favorite} source={{ kind: "game", game }} />;
```

```tsx
const favorite = favorites.find(
  (item) => item.id === "favorite-morrowdeep-report",
)!;
const article = getArticleById(favorite.targetId)!;

<FeedItemCard favorite={favorite} source={{ kind: "article", article }} />;
```

Acceptance criteria:

- Exhaustive TypeScript narrowing handles both source variants.
- No `any`, type assertions, or duplicated domain models.
- Game and article layouts remain visually aligned.

### 9. Release filter group

**File:** `src/components/games/release-filter-group.tsx`

```ts
export interface ReleaseFilterOption {
  id: string;
  label: string;
  color?: string;
}

export interface ReleaseFilterGroupProps {
  legend: string;
  options: readonly ReleaseFilterOption[];
  selectionMode: "single" | "multiple";
  selectedValues: ReadonlySet<string>;
  onValueChange: (value: string, selected: boolean) => void;
  name?: string;
  className?: string;
}
```

Requirements:

- This is an interactive Client Component.
- Render a `<fieldset>` and `<legend>`.
- Use radio inputs for `single` and checkboxes for `multiple`.
- Require `name` for single-selection groups.
- Decorative option dots use `color` and `aria-hidden`.

Later replaces:

- The four repeated fieldsets in
  `src/components/games/release-filters.tsx`.

Examples:

```tsx
<ReleaseFilterGroup
  legend="Platforms"
  selectionMode="multiple"
  selectedValues={new Set(["platform-pc"])}
  onValueChange={() => undefined}
  options={platforms.map((platform) => ({
    id: platform.id,
    label: platform.shortName,
    color: platform.color,
  }))}
/>
```

```tsx
<ReleaseFilterGroup
  legend="Status"
  selectionMode="multiple"
  selectedValues={new Set<GameStatus>()}
  onValueChange={() => undefined}
  options={[
    { id: "announced", label: "Announced" },
    { id: "early-access", label: "Early access" },
  ]}
/>
```

Acceptance criteria:

- Labels activate their associated inputs.
- Single and multiple selection are keyboard operable.
- Controlled state is owned by `ReleaseFilters`.
- The component does not know about global mock data.

### 10. Icon action

**File:** `src/components/ui/icon-action.tsx`

```ts
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";
import type Link from "next/link";

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  label: string;
  icon: ReactNode;
  indicatorLabel?: string;
}

export interface IconLinkProps extends Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "children"
> {
  label: string;
  icon: ReactNode;
}
```

Requirements:

- Export `IconButton` and `IconLink`.
- Keep visible target dimensions at least 40×40 px.
- Expose the accessible name through `label`.
- A visual notification dot must have accessible text only when it conveys
  meaningful state.
- Do not absorb menu state or navigation logic into this primitive.

Later replaces:

- Compact search link and notification button in
  `src/components/layout/site-header.tsx`.
- Menu toggle button styling in
  `src/components/layout/mobile-navigation.tsx`, while menu state stays in
  `MobileNavigation`.

Example:

```tsx
<IconLink href="/search" label="Search" icon={<SearchIcon />} />

<IconButton
  label="Notifications"
  icon={<BellIcon />}
  indicatorLabel="Unread notifications"
/>;
```

Acceptance criteria:

- Icon-only controls have an accessible name.
- Decorative SVGs remain `aria-hidden`.
- Button and link semantics are not interchangeable.

## Files Kimi must not modify

Kimi should add only the ten component files listed above. In particular, do
not modify:

- `package.json`, `pnpm-lock.yaml`, or `pnpm-workspace.yaml`
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`,
  `postcss.config.mjs`, or `.prettierrc.json`
- `.env.example`, `.gitignore`, or `README.md`
- Any file under `src/app/`
- Any file under `src/data/`, `src/types/`, `src/lib/`, or `src/styles/`
- Existing layout components, including `site-header.tsx`,
  `mobile-navigation.tsx`, and `page-container.tsx`
- Existing homepage components, including `hero-carousel.tsx` and all section
  components

If a required prop cannot be expressed with the existing domain types, report
the issue in the handoff rather than modifying `src/types`.

## Global acceptance criteria

Kimi's contribution is acceptable when:

1. All ten required files exist at the exact paths above.
2. Every public props type is exported.
3. Components use strict TypeScript without `any`, `@ts-ignore`, non-null
   assertions in implementation code, or duplicated domain interfaces.
4. Components use semantic theme classes and introduce no copied theme hex
   values.
5. Presentational components receive data via props and do not import mock
   arrays.
6. Interactive components preserve native keyboard behavior and visible focus.
7. Components remain responsive at 320 px, 768 px, and desktop widths.
8. No dependency or configuration changes are made.
9. `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and
   `pnpm build` pass.
10. Kimi's handoff lists every created file and any integration assumption.
