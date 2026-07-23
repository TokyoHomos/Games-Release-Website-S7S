import type { NewsArticle } from "@/types";

export const newsArticles = [
  {
    id: "article-aether-date",
    slug: "echoes-of-aether-release-date-confirmed",
    title: "Echoes of Aether locks in an October release",
    excerpt:
      "Northstar Interactive has confirmed a simultaneous PC and console launch.",
    body: "The date arrived alongside a new development update detailing accessibility options and cross-platform progression.",
    category: "release",
    author: "Maya Chen",
    sourceName: "GameSignal",
    sourceUrl: "https://example.com/news/aether-date",
    publishedAt: "2026-07-21T09:00:00Z",
    relatedGameIds: ["game-echoes-of-aether"],
    credibilityAssessmentId: "credibility-aether-date",
  },
  {
    id: "article-morrowdeep-demo",
    slug: "morrowdeep-demo-reported-for-autumn-showcase",
    title: "Morrowdeep demo reportedly planned for autumn showcase",
    excerpt:
      "Two independent reports point to a first public hands-on later this year.",
    body: "Neither Northstar nor Orbit Publishing has announced a demo. The reports agree on timing but differ on the planned platforms.",
    category: "rumor",
    author: "Owen Price",
    sourceName: "GameSignal",
    sourceUrl: "https://example.com/news/morrowdeep-demo",
    publishedAt: "2026-07-20T14:30:00Z",
    relatedGameIds: ["game-morrowdeep"],
    credibilityAssessmentId: "credibility-morrowdeep-demo",
  },
  {
    id: "article-iron-roadmap",
    slug: "iron-horizon-roadmap-adds-cooperative-scenarios",
    title: "Iron Horizon roadmap adds cooperative scenarios",
    excerpt:
      "Redforge outlined three major updates ahead of its next early-access milestone.",
    body: "The roadmap includes shared scenario control, expanded mod support, and a complete pass over onboarding.",
    category: "update",
    author: "Sofia Rahman",
    sourceName: "GameSignal",
    sourceUrl: "https://example.com/news/iron-roadmap",
    publishedAt: "2026-07-18T16:15:00Z",
    relatedGameIds: ["game-iron-horizon"],
  },
] satisfies NewsArticle[];
