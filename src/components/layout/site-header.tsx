import Link from "next/link";

import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

export function SiteHeader() {
  return (
    <header className="border-border/80 bg-background/90 relative sticky top-0 z-50 border-b backdrop-blur">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-ring flex items-center gap-2 rounded-sm font-black tracking-tight"
        >
          <span
            aria-hidden="true"
            className="bg-primary inline-block size-2.5 rounded-full shadow-[0_0_18px_var(--primary)]"
          />
          GameSignal
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="focus-ring border-border bg-surface hover:bg-surface-elevated hidden items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-colors sm:inline-flex"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Search
          </Link>
          <Link
            href="/search"
            aria-label="Search"
            className="focus-ring border-border bg-surface hover:bg-surface-elevated inline-flex size-10 items-center justify-center rounded-md border transition-colors sm:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>

          <button
            type="button"
            aria-label="Notifications"
            className="focus-ring border-border bg-surface hover:bg-surface-elevated relative hidden size-10 items-center justify-center rounded-md border transition-colors sm:inline-flex"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 12 6 8Z" />
              <path d="M9.5 17a2.5 2.5 0 0 0 5 0" />
            </svg>
            <span
              aria-hidden="true"
              className="bg-primary absolute top-2 right-2 size-2 rounded-full"
            />
          </button>

          <Link
            href="/profile"
            aria-label="Profile"
            className="focus-ring border-border bg-surface-elevated hover:bg-surface hidden size-10 items-center justify-center rounded-full border text-xs font-bold transition-colors sm:inline-flex"
          >
            GS
          </Link>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
