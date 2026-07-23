# GameSignal Design Reference

The approved visual reference is
[`design-reference.png`](./design-reference.png). It is a direction and
component-language reference for Milestone 1, not a requirement to implement
every future product module in the first homepage.

## Approved design language

- Dark gaming-dashboard canvas with red brand accents.
- Compact sticky navigation with release, calendar, news, favorites, search,
  notification, and profile entry points.
- Dense desktop information hierarchy that progressively stacks on tablet and
  mobile.
- Featured release hero with status, genres, release timing, platforms,
  follow action, and carousel navigation.
- Filter surface alongside release-focused homepage content.
- Rounded, bordered surface cards with restrained elevation.
- Semantic status colors for confirmed information, warnings, rumors, leaks,
  and destructive states.
- Release, calendar, personalized-feed, anticipated-game, trending-tag, and
  call-to-action content areas.
- Visible focus treatment, readable contrast, native control semantics, and
  responsive behavior.

## Repository implementation notes

The current homepage follows this language through the shared theme tokens,
sticky header, responsive hero, desktop release filters, card-based content
sections, semantic status pills, and closing CTA. It intentionally uses mock
data and simplified content treatments while later milestones add richer
artwork, live countdowns, news/credibility cards, and reusable component
extractions.

Do not copy colors from the reference image. Use the semantic variables in
`src/styles/theme.css`. Do not redesign the homepage during component
extraction; reusable components must preserve the existing spacing,
typography, responsive breakpoints, and accessibility behavior.
