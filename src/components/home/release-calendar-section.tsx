import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { calendarEvents } from "@/data";
import { formatDate } from "@/lib/utils";
import type { CalendarEventType } from "@/types";

const EVENT_TONE: Record<
  CalendarEventType,
  "success" | "warning" | "rumor" | "neutral"
> = {
  release: "success",
  "early-access": "success",
  showcase: "rumor",
  update: "neutral",
  beta: "warning",
};

export function ReleaseCalendarSection() {
  const upcoming = [...calendarEvents]
    .sort((a, b) => a.startAt.localeCompare(b.startAt))
    .slice(0, 4);

  return (
    <section aria-labelledby="release-calendar-heading">
      <SectionHeading
        headingId="release-calendar-heading"
        eyebrow="This month"
        title="Release calendar"
        description="Launches, showcases, and updates worth planning around."
        action={
          <Link
            href="/calendar"
            className="focus-ring border-border bg-surface hover:bg-surface-elevated rounded-md border px-4 py-2 text-sm font-semibold transition-colors"
          >
            Full calendar
          </Link>
        }
      />

      <ol className="mt-6 grid gap-3">
        {upcoming.map((event) => (
          <li key={event.id}>
            <article className="border-border bg-surface flex flex-col gap-3 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <time
                  dateTime={event.startAt}
                  className="text-secondary text-xs font-bold tracking-[0.1em] uppercase"
                >
                  {formatDate(event.startAt)}
                </time>
                <h3 className="mt-1 text-base font-bold">{event.title}</h3>
                <p className="text-secondary mt-1 text-sm leading-6">
                  {event.description}
                </p>
              </div>
              <StatusPill tone={EVENT_TONE[event.type]}>
                {event.type.replace("-", " ")}
              </StatusPill>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
