"use client";

import { useEffect, useState } from "react";

import type { ISODateString } from "@/types";

export type CountdownTimerVariant = "days" | "detailed";

export interface CountdownTimerProps {
  targetDate: ISODateString;
  variant?: CountdownTimerVariant;
  expiredLabel?: string;
  prefix?: string;
  className?: string;
}

export interface CountdownUnit {
  label: "days" | "hours" | "minutes" | "seconds";
  value: number;
}

export interface CountdownSnapshot {
  expired: boolean;
  visibleLabel: string;
  accessibleLabel: string;
  units: CountdownUnit[];
}

const DAY_IN_SECONDS = 24 * 60 * 60;
const DAY_IN_MILLISECONDS = DAY_IN_SECONDS * 1_000;
const MINUTE_IN_MILLISECONDS = 60_000;
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function pluralize(value: number, unit: string): string {
  return `${value} ${unit}${value === 1 ? "" : "s"}`;
}

export function getCountdownSnapshot(
  targetDate: ISODateString,
  nowMilliseconds: number,
  variant: CountdownTimerVariant,
  expiredLabel = "Available now",
): CountdownSnapshot {
  const targetMilliseconds = Date.parse(targetDate);
  const difference = targetMilliseconds - nowMilliseconds;

  const isDateOnly = DATE_ONLY_PATTERN.test(targetDate);
  const parsedDateIsValid =
    Number.isFinite(targetMilliseconds) &&
    (!isDateOnly ||
      new Date(targetMilliseconds).toISOString().slice(0, 10) === targetDate);

  if (!parsedDateIsValid) {
    return {
      expired: true,
      visibleLabel: expiredLabel,
      accessibleLabel: expiredLabel,
      units: [],
    };
  }

  if (variant === "days") {
    let days: number;
    let label: string;

    if (isDateOnly) {
      const currentDate = new Date(nowMilliseconds);
      const currentDay = Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
      );
      days = Math.round(
        (targetMilliseconds - currentDay) / DAY_IN_MILLISECONDS,
      );
      if (days < 0) {
        return {
          expired: true,
          visibleLabel: expiredLabel,
          accessibleLabel: expiredLabel,
          units: [],
        };
      }
      label =
        days === 0
          ? "Releasing today"
          : days === 1
            ? "Tomorrow"
            : pluralize(days, "day");
    } else {
      if (difference <= 0) {
        return {
          expired: true,
          visibleLabel: expiredLabel,
          accessibleLabel: expiredLabel,
          units: [],
        };
      }
      days = Math.ceil(difference / DAY_IN_MILLISECONDS);
      label = days === 1 ? "Tomorrow" : pluralize(days, "day");
    }

    return {
      expired: false,
      visibleLabel: label,
      accessibleLabel: label,
      units: [{ label: "days", value: days }],
    };
  }

  if (difference <= 0) {
    return {
      expired: true,
      visibleLabel: expiredLabel,
      accessibleLabel: expiredLabel,
      units: [],
    };
  }

  const totalSeconds = Math.ceil(difference / 1_000);
  const days = Math.floor(totalSeconds / DAY_IN_SECONDS);
  const hours = Math.floor((totalSeconds % DAY_IN_SECONDS) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const units: CountdownUnit[] = [
    { label: "days", value: days },
    { label: "hours", value: hours },
    { label: "minutes", value: minutes },
    { label: "seconds", value: seconds },
  ];
  const spokenParts: string[] = [];

  if (days > 0) spokenParts.push(pluralize(days, "day"));
  if (hours > 0) spokenParts.push(pluralize(hours, "hour"));
  if (minutes > 0) spokenParts.push(pluralize(minutes, "minute"));
  if (spokenParts.length === 0) spokenParts.push("Less than a minute");

  return {
    expired: false,
    visibleLabel: units
      .map(({ label, value }) => `${value} ${label}`)
      .join(", "),
    accessibleLabel: spokenParts.join(", "),
    units,
  };
}

export function subscribeToCountdown(
  targetDate: ISODateString,
  variant: CountdownTimerVariant,
  onUpdate: (snapshot: CountdownSnapshot, nowMilliseconds: number) => void,
  expiredLabel = "Available now",
): () => void {
  const intervalMilliseconds =
    variant === "days" ? MINUTE_IN_MILLISECONDS : 1_000;
  let intervalId: ReturnType<typeof globalThis.setInterval> | undefined;
  let expiredAt: number | null = null;

  const update = () => {
    const nowMilliseconds = Date.now();
    const snapshot = getCountdownSnapshot(
      targetDate,
      nowMilliseconds,
      variant,
      expiredLabel,
    );
    onUpdate(snapshot, nowMilliseconds);

    if (snapshot.expired) {
      expiredAt ??= nowMilliseconds;
      const canStop =
        variant === "days" ||
        nowMilliseconds - expiredAt >= MINUTE_IN_MILLISECONDS;

      if (intervalId !== undefined && canStop) {
        globalThis.clearInterval(intervalId);
        intervalId = undefined;
      }
    } else {
      expiredAt = null;
    }

    return snapshot;
  };

  const initialSnapshot = update();
  if (!initialSnapshot.expired) {
    intervalId = globalThis.setInterval(update, intervalMilliseconds);
  }

  return () => {
    if (intervalId !== undefined) globalThis.clearInterval(intervalId);
  };
}

function withPrefix(prefix: string | undefined, label: string): string {
  return prefix ? `${prefix} ${label}` : label;
}

export function CountdownTimer({
  targetDate,
  variant = "days",
  expiredLabel = "Available now",
  prefix,
  className,
}: CountdownTimerProps) {
  const [snapshot, setSnapshot] = useState<CountdownSnapshot | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    let lastAnnouncementAt: number | null = null;

    return subscribeToCountdown(
      targetDate,
      variant,
      (nextSnapshot, nowMilliseconds) => {
        setSnapshot((current) => {
          if (
            current &&
            current.expired === nextSnapshot.expired &&
            current.visibleLabel === nextSnapshot.visibleLabel &&
            current.accessibleLabel === nextSnapshot.accessibleLabel &&
            current.units.length === nextSnapshot.units.length &&
            current.units.every(
              (unit, index) =>
                unit.label === nextSnapshot.units[index]?.label &&
                unit.value === nextSnapshot.units[index]?.value,
            )
          ) {
            return current;
          }
          return nextSnapshot;
        });

        const shouldAnnounce =
          variant === "days" ||
          lastAnnouncementAt === null ||
          nowMilliseconds - lastAnnouncementAt >= MINUTE_IN_MILLISECONDS;

        if (shouldAnnounce) {
          const label = nextSnapshot.expired
            ? nextSnapshot.accessibleLabel
            : withPrefix(prefix, nextSnapshot.accessibleLabel);
          setAnnouncement(label);
          lastAnnouncementAt = nowMilliseconds;
        }
      },
      expiredLabel,
    );
  }, [expiredLabel, prefix, targetDate, variant]);

  const fallbackLabel = prefix
    ? `${prefix}…`
    : variant === "detailed"
      ? "Calculating countdown"
      : "Loading countdown";
  const accessibleLabel = announcement ?? fallbackLabel;

  return (
    <span
      role="timer"
      aria-label={accessibleLabel}
      aria-live="off"
      className={className}
    >
      {variant === "days" ? (
        <span aria-hidden="true">
          {snapshot
            ? snapshot.expired
              ? snapshot.visibleLabel
              : withPrefix(prefix, snapshot.visibleLabel)
            : fallbackLabel}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 tabular-nums"
        >
          {snapshot?.expired ? (
            snapshot.visibleLabel
          ) : (
            <>
              {prefix ? <span>{prefix}</span> : null}
              {snapshot
                ? snapshot.units.map((unit) => (
                    <span key={unit.label} className="whitespace-nowrap">
                      <span className="font-bold">{unit.value}</span>{" "}
                      <span>
                        {unit.value === 1
                          ? unit.label.slice(0, -1)
                          : unit.label}
                      </span>
                    </span>
                  ))
                : "— days — hours — minutes — seconds"}
            </>
          )}
        </span>
      )}
      {variant === "detailed" ? (
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {accessibleLabel}
        </span>
      ) : null}
    </span>
  );
}
