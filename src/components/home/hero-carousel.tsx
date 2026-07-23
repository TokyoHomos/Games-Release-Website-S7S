"use client";

import { useState, type KeyboardEvent } from "react";

import { StatusPill } from "@/components/ui/status-pill";
import { cn } from "@/lib/utils";

export interface HeroCarouselItem {
  id: string;
  gameId: string;
  title: string;
  summary: string;
  releaseWindowLabel: string;
  countdownLabel: string;
  statusLabel: string;
  statusTone: "success" | "warning" | "neutral";
  genreNames: string[];
  platformLabels: string[];
  accentColor: string;
}

interface HeroCarouselProps {
  items: HeroCarouselItem[];
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [followedIds, setFollowedIds] = useState<Set<string>>(() => new Set());

  const activeItem = items[activeIndex];
  if (!activeItem) return null;

  const isFollowed = followedIds.has(activeItem.gameId);

  function toggleFollow() {
    setFollowedIds((current) => {
      const next = new Set(current);
      if (activeItem === undefined) return next;
      if (next.has(activeItem.gameId)) {
        next.delete(activeItem.gameId);
      } else {
        next.add(activeItem.gameId);
      }
      return next;
    });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + direction + items.length) % items.length;
    setActiveIndex(nextIndex);
    const nextTab = document.getElementById(`hero-tab-${nextIndex}`);
    nextTab?.focus();
  }

  return (
    <div
      className="relative isolate overflow-hidden rounded-3xl"
      style={{
        background: `radial-gradient(circle at 15% 20%, color-mix(in srgb, ${activeItem.accentColor} 20%, transparent), transparent 55%), linear-gradient(135deg, var(--surface-elevated), var(--background) 70%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
      />
      <div className="relative flex min-h-[26rem] flex-col justify-end p-6 sm:p-10 lg:min-h-[30rem] lg:p-14">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill tone={activeItem.statusTone}>
            {activeItem.statusLabel}
          </StatusPill>
          {activeItem.genreNames.map((genre) => (
            <span
              key={genre}
              className="border-border/70 rounded-full border bg-black/30 px-2.5 py-1 text-xs font-semibold text-white/80 backdrop-blur"
            >
              {genre}
            </span>
          ))}
        </div>

        <h2
          role="tabpanel"
          id={`hero-panel-${activeIndex}`}
          aria-labelledby={`hero-tab-${activeIndex}`}
          className="mt-5 max-w-2xl text-4xl leading-[1.02] font-black tracking-tight text-balance text-white sm:text-6xl"
        >
          {activeItem.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
          {activeItem.summary}
        </p>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <div>
            <dt className="text-xs font-bold tracking-[0.12em] text-white/50 uppercase">
              Release window
            </dt>
            <dd className="mt-1 font-semibold text-white">
              {activeItem.releaseWindowLabel}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold tracking-[0.12em] text-white/50 uppercase">
              Countdown
            </dt>
            <dd className="text-primary mt-1 font-bold">
              {activeItem.countdownLabel}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold tracking-[0.12em] text-white/50 uppercase">
              Platforms
            </dt>
            <dd className="mt-1 font-semibold text-white">
              {activeItem.platformLabels.join(" · ")}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={toggleFollow}
            aria-pressed={isFollowed}
            className={cn(
              "focus-ring inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition-colors",
              isFollowed
                ? "bg-primary text-white"
                : "border border-white/30 bg-white/10 text-white hover:bg-white/20",
            )}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill={isFollowed ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              className="size-4"
            >
              <path d="m12 17.3-6.16 3.64 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62 7.19.62-5.48 4.67 1.64 7.03Z" />
            </svg>
            {isFollowed ? "Following" : "Follow release"}
          </button>

          {items.length > 1 ? (
            <div
              role="tablist"
              aria-label="Featured releases"
              className="flex items-center gap-2"
            >
              {items.map((item, index) => (
                <button
                  key={item.id}
                  id={`hero-tab-${index}`}
                  role="tab"
                  type="button"
                  aria-selected={index === activeIndex}
                  aria-controls={`hero-panel-${index}`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={handleTabKeyDown}
                  className={cn(
                    "focus-ring rounded-full transition-all",
                    index === activeIndex
                      ? "bg-primary h-2.5 w-6"
                      : "h-2.5 w-2.5 bg-white/30 hover:bg-white/50",
                  )}
                >
                  <span className="sr-only">Show {item.title}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
