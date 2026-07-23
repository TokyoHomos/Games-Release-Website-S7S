import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";

export function HomepageCta() {
  return (
    <section className="border-border border-t">
      <PageContainer className="page-section">
        <div className="border-border relative overflow-hidden rounded-2xl border bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent_60%)] p-10 text-center sm:p-14">
          <p className="text-primary text-sm font-bold tracking-[0.16em] uppercase">
            Stay ahead of the signal
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-balance sm:text-4xl">
            Follow the games and stories you care about.
          </h2>
          <p className="text-secondary mx-auto mt-4 max-w-xl leading-7">
            Build a watchlist, get a personalized feed, and see the evidence
            behind every developing story.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/favorites"
              className="focus-ring bg-primary hover:bg-primary-hover rounded-md px-5 py-3 font-bold text-white transition-colors"
            >
              Start your watchlist
            </Link>
            <Link
              href="/news"
              className="focus-ring border-border bg-surface hover:bg-surface-elevated rounded-md border px-5 py-3 font-bold transition-colors"
            >
              Browse the newsroom
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
