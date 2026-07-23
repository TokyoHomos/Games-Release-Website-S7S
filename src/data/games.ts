import type { Game } from "@/types";

export const games = [
  {
    id: "game-echoes-of-aether",
    slug: "echoes-of-aether",
    title: "Echoes of Aether",
    summary: "A skybound action RPG about memory, weather, and lost cities.",
    description:
      "Chart an archipelago suspended above a perpetual storm, rebuild a fractured crew, and shape a world that remembers every choice.",
    coverImageUrl: "/images/games/echoes-of-aether-cover.jpg",
    heroImageUrl: "/images/games/echoes-of-aether-hero.jpg",
    developerId: "company-northstar",
    publisherId: "company-orbit",
    genreIds: ["genre-rpg", "genre-action"],
    platformIds: ["platform-pc", "platform-ps5", "platform-xbox-series"],
    status: "in-development",
    officialWebsiteUrl: "https://example.com/echoes-of-aether",
  },
  {
    id: "game-iron-horizon",
    slug: "iron-horizon",
    title: "Iron Horizon",
    summary: "A systemic strategy game played across a moving industrial city.",
    description:
      "Direct rival guilds, ration scarce power, and steer a colossal city through hostile territory in a campaign built around hard trade-offs.",
    coverImageUrl: "/images/games/iron-horizon-cover.jpg",
    developerId: "company-redforge",
    publisherId: "company-redforge",
    genreIds: ["genre-strategy", "genre-simulation"],
    platformIds: ["platform-pc"],
    status: "early-access",
    officialWebsiteUrl: "https://example.com/iron-horizon",
  },
  {
    id: "game-morrowdeep",
    slug: "morrowdeep",
    title: "Morrowdeep",
    summary:
      "A cooperative adventure through a luminous world beneath the sea.",
    description:
      "Dive with up to three friends, learn the language of ancient machines, and bring light back to a drowned civilization.",
    coverImageUrl: "/images/games/morrowdeep-cover.jpg",
    developerId: "company-northstar",
    publisherId: "company-orbit",
    genreIds: ["genre-adventure", "genre-action"],
    platformIds: [
      "platform-pc",
      "platform-ps5",
      "platform-xbox-series",
      "platform-switch-2",
    ],
    status: "announced",
  },
] satisfies Game[];
