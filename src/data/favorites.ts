import type { Favorite } from "@/types";

export const favorites = [
  {
    id: "favorite-aether",
    userId: "user-demo",
    targetType: "game",
    targetId: "game-echoes-of-aether",
    createdAt: "2026-07-19T11:30:00Z",
  },
  {
    id: "favorite-morrowdeep-report",
    userId: "user-demo",
    targetType: "article",
    targetId: "article-morrowdeep-demo",
    createdAt: "2026-07-20T18:10:00Z",
  },
] satisfies Favorite[];
