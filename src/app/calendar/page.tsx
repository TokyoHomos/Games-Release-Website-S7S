import { PageIntro } from "@/components/ui/page-intro";
import { calendarEvents } from "@/data";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Calendar" };

export default function CalendarPage() {
  return (
    <section className="container-shell page-section">
      <PageIntro
        eyebrow="Calendar"
        title="Plan around the moments that matter."
        description="Release days, showcases, betas, and major updates share one dependable timeline."
      />
      <ol className="border-border mt-12 border-l">
        {calendarEvents.map((event) => (
          <li className="relative pb-9 pl-7" key={event.id}>
            <span className="bg-primary absolute top-1 -left-1.5 size-3 rounded-full" />
            <time className="text-primary text-sm font-bold">
              {formatDate(event.startAt)}
            </time>
            <h2 className="mt-1 text-lg font-bold">{event.title}</h2>
            <p className="text-secondary mt-1">{event.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
