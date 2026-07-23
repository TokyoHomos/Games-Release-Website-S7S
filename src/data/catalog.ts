import type { Company, Genre, Platform } from "@/types";

export const platforms = [
  {
    id: "platform-pc",
    name: "Windows PC",
    shortName: "PC",
    manufacturer: "Microsoft",
    color: "#60a5fa",
  },
  {
    id: "platform-ps5",
    name: "PlayStation 5",
    shortName: "PS5",
    manufacturer: "Sony",
    color: "#2563eb",
  },
  {
    id: "platform-xbox-series",
    name: "Xbox Series X|S",
    shortName: "Xbox",
    manufacturer: "Microsoft",
    color: "#22c55e",
  },
  {
    id: "platform-switch-2",
    name: "Nintendo Switch 2",
    shortName: "Switch 2",
    manufacturer: "Nintendo",
    color: "#ef4444",
  },
] satisfies Platform[];

export const genres = [
  { id: "genre-rpg", name: "Role-playing", slug: "role-playing" },
  { id: "genre-action", name: "Action", slug: "action" },
  { id: "genre-adventure", name: "Adventure", slug: "adventure" },
  { id: "genre-strategy", name: "Strategy", slug: "strategy" },
  { id: "genre-simulation", name: "Simulation", slug: "simulation" },
] satisfies Genre[];

export const companies = [
  {
    id: "company-northstar",
    name: "Northstar Interactive",
    slug: "northstar-interactive",
    websiteUrl: "https://example.com/northstar",
  },
  {
    id: "company-redforge",
    name: "Redforge Studios",
    slug: "redforge-studios",
    websiteUrl: "https://example.com/redforge",
  },
  {
    id: "company-orbit",
    name: "Orbit Publishing",
    slug: "orbit-publishing",
    websiteUrl: "https://example.com/orbit",
  },
] satisfies Company[];
