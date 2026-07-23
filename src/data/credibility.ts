import type { CredibilityAssessment } from "@/types";

export const credibilityAssessments = [
  {
    id: "credibility-aether-date",
    articleId: "article-aether-date",
    score: 100,
    verdict: "verified",
    rationale:
      "The release date appears in the developer announcement and platform store listings.",
    evidence: [
      "First-party developer announcement",
      "Matching PlayStation and Xbox store dates",
    ],
    assessedAt: "2026-07-21T09:15:00Z",
  },
  {
    id: "credibility-morrowdeep-demo",
    articleId: "article-morrowdeep-demo",
    score: 62,
    verdict: "unconfirmed",
    rationale:
      "Independent reporting aligns on timing, but no first-party source has confirmed the demo.",
    evidence: [
      "Two independent reports",
      "No official announcement",
      "Platform details conflict",
    ],
    assessedAt: "2026-07-20T15:00:00Z",
  },
] satisfies CredibilityAssessment[];
