import type { CalendarEvent } from "@/types";

export const calendarEvents = [
  {
    id: "event-iron-early-access",
    title: "Iron Horizon early-access update",
    description: "New campaign systems and workshop support arrive on PC.",
    startAt: "2026-08-04",
    allDay: true,
    type: "early-access",
    gameId: "game-iron-horizon",
    releaseId: "release-iron-early-access",
    platformIds: ["platform-pc"],
  },
  {
    id: "event-autumn-showcase",
    title: "Orbit Autumn Showcase",
    description: "A digital presentation featuring upcoming Orbit releases.",
    startAt: "2026-09-12T17:00:00Z",
    endAt: "2026-09-12T18:00:00Z",
    allDay: false,
    type: "showcase",
    platformIds: [],
    location: "Online",
  },
  {
    id: "event-aether-release",
    title: "Echoes of Aether releases",
    description: "Worldwide launch on PC, PlayStation 5, and Xbox Series X|S.",
    startAt: "2026-10-16",
    allDay: true,
    type: "release",
    gameId: "game-echoes-of-aether",
    releaseId: "release-aether-2026",
    platformIds: ["platform-pc", "platform-ps5", "platform-xbox-series"],
  },
] satisfies CalendarEvent[];
