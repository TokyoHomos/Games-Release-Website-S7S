import type { GameRelease } from "@/types";

export const gameReleases = [
  {
    id: "release-aether-2026",
    gameId: "game-echoes-of-aether",
    platformIds: ["platform-pc", "platform-ps5", "platform-xbox-series"],
    releaseDate: "2026-10-16",
    releaseWindowLabel: "October 16, 2026",
    precision: "exact",
    status: "confirmed",
    region: "worldwide",
    sourceUrl: "https://example.com/news/aether-date",
  },
  {
    id: "release-iron-early-access",
    gameId: "game-iron-horizon",
    platformIds: ["platform-pc"],
    releaseDate: "2026-08-04",
    releaseWindowLabel: "August 4, 2026",
    precision: "exact",
    status: "expected",
    region: "worldwide",
  },
  {
    id: "release-morrowdeep-2027",
    gameId: "game-morrowdeep",
    platformIds: [
      "platform-pc",
      "platform-ps5",
      "platform-xbox-series",
      "platform-switch-2",
    ],
    releaseWindowLabel: "2027",
    precision: "year",
    status: "expected",
    region: "worldwide",
  },
] satisfies GameRelease[];
