"use client";

import { useId, useState } from "react";

import { genres, platforms } from "@/data";
import { cn } from "@/lib/utils";
import type { GameStatus } from "@/types";

const RELEASE_PERIODS = [
  { id: "next-30-days", label: "Next 30 days" },
  { id: "next-3-months", label: "Next 3 months" },
  { id: "this-year", label: "This year" },
  { id: "beyond", label: "2027 and beyond" },
] as const;

const STATUS_OPTIONS: { id: GameStatus; label: string }[] = [
  { id: "announced", label: "Announced" },
  { id: "in-development", label: "In development" },
  { id: "early-access", label: "Early access" },
  { id: "delayed", label: "Delayed" },
  { id: "released", label: "Released" },
];

function toggleValue(current: Set<string>, value: string): Set<string> {
  const next = new Set(current);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

export function ReleaseFilters() {
  const releasePeriodName = useId();
  const [releasePeriod, setReleasePeriod] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(
    () => new Set(),
  );
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(
    () => new Set(),
  );
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(
    () => new Set(),
  );

  const activeCount =
    (releasePeriod ? 1 : 0) +
    selectedPlatforms.size +
    selectedGenres.size +
    selectedStatuses.size;

  function resetFilters() {
    setReleasePeriod(null);
    setSelectedPlatforms(new Set());
    setSelectedGenres(new Set());
    setSelectedStatuses(new Set());
  }

  return (
    <aside
      aria-label="Filter releases"
      className="hidden lg:sticky lg:top-24 lg:block lg:h-fit lg:w-64 lg:shrink-0"
    >
      <div className="border-border bg-surface/80 rounded-2xl border p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-[0.08em] uppercase">
            Filters
          </h2>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={resetFilters}
              className="focus-ring text-primary rounded-sm text-xs font-semibold"
            >
              Clear ({activeCount})
            </button>
          ) : null}
        </div>

        <fieldset className="border-border mt-6 border-t pt-5">
          <legend className="text-secondary text-xs font-bold tracking-[0.12em] uppercase">
            Release period
          </legend>
          <div className="mt-3 flex flex-col gap-2">
            {RELEASE_PERIODS.map((period) => (
              <label
                key={period.id}
                className="text-secondary has-[:checked]:text-foreground flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name={releasePeriodName}
                  value={period.id}
                  checked={releasePeriod === period.id}
                  onChange={() => setReleasePeriod(period.id)}
                  className="accent-primary focus-ring size-4"
                />
                {period.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="border-border mt-5 border-t pt-5">
          <legend className="text-secondary text-xs font-bold tracking-[0.12em] uppercase">
            Platforms
          </legend>
          <div className="mt-3 flex flex-col gap-2">
            {platforms.map((platform) => (
              <label
                key={platform.id}
                className="text-secondary has-[:checked]:text-foreground flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.has(platform.id)}
                  onChange={() =>
                    setSelectedPlatforms((current) =>
                      toggleValue(current, platform.id),
                    )
                  }
                  className="accent-primary focus-ring size-4 rounded-sm"
                />
                <span
                  aria-hidden="true"
                  className="inline-block size-2 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                {platform.shortName}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="border-border mt-5 border-t pt-5">
          <legend className="text-secondary text-xs font-bold tracking-[0.12em] uppercase">
            Genres
          </legend>
          <div className="mt-3 flex flex-col gap-2">
            {genres.map((genre) => (
              <label
                key={genre.id}
                className="text-secondary has-[:checked]:text-foreground flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.has(genre.id)}
                  onChange={() =>
                    setSelectedGenres((current) =>
                      toggleValue(current, genre.id),
                    )
                  }
                  className="accent-primary focus-ring size-4 rounded-sm"
                />
                {genre.name}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="border-border mt-5 border-t pt-5">
          <legend className="text-secondary text-xs font-bold tracking-[0.12em] uppercase">
            Status
          </legend>
          <div className="mt-3 flex flex-col gap-2">
            {STATUS_OPTIONS.map((status) => (
              <label
                key={status.id}
                className="text-secondary has-[:checked]:text-foreground flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses.has(status.id)}
                  onChange={() =>
                    setSelectedStatuses((current) =>
                      toggleValue(current, status.id),
                    )
                  }
                  className="accent-primary focus-ring size-4 rounded-sm"
                />
                {status.label}
              </label>
            ))}
          </div>
        </fieldset>

        <p
          className={cn(
            "text-secondary mt-5 text-xs leading-5",
            activeCount === 0 && "hidden",
          )}
        >
          Filtering the catalog arrives in a later milestone. Selections here
          are visual only for now.
        </p>
      </div>
    </aside>
  );
}
