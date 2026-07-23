import { PageIntro } from "@/components/ui/page-intro";
import { StatusPill } from "@/components/ui/status-pill";
import { gameReleases } from "@/data";
import { getGameById } from "@/data/selectors";

export const metadata = { title: "Releases" };

export default function ReleasesPage() {
  return (
    <section className="container-shell page-section">
      <PageIntro
        eyebrow="Release tracker"
        title="Every date, window, and delay."
        description="A normalized release feed designed for filters, platform views, and change history in the next milestone."
      />
      <div className="mt-12 grid gap-4">
        {gameReleases.map((release) => (
          <article
            className="border-border bg-surface rounded-xl border p-5 sm:flex sm:items-center sm:justify-between"
            key={release.id}
          >
            <div>
              <h2 className="text-lg font-bold">
                {getGameById(release.gameId)?.title}
              </h2>
              <p className="text-secondary mt-1 text-sm">
                {release.releaseWindowLabel}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <StatusPill
                tone={release.status === "confirmed" ? "success" : "neutral"}
              >
                {release.status}
              </StatusPill>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
