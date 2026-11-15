import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getCountdownSnapshot,
  subscribeToCountdown,
  type CountdownSnapshot,
} from "./countdown-timer";

describe("countdown timer", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("updates the days variant once per minute", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-15T00:00:00.000Z"));

    const updates: CountdownSnapshot[] = [];
    const stop = subscribeToCountdown(
      "2026-10-17T00:00:00.000Z",
      "days",
      (snapshot) => updates.push(snapshot),
    );

    expect(updates).toHaveLength(1);
    expect(updates[0]?.visibleLabel).toBe("2 days");

    vi.advanceTimersByTime(59_999);
    expect(updates).toHaveLength(1);

    vi.advanceTimersByTime(1);
    expect(updates).toHaveLength(2);

    stop();
    vi.advanceTimersByTime(60_000);
    expect(updates).toHaveLength(2);
  });

  it("updates the detailed variant every second", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-15T00:00:00.000Z"));

    const updates: CountdownSnapshot[] = [];
    const stop = subscribeToCountdown(
      "2026-10-15T00:00:10.000Z",
      "detailed",
      (snapshot) => updates.push(snapshot),
    );

    expect(updates[0]?.units.at(-1)?.value).toBe(10);

    vi.advanceTimersByTime(3_000);

    expect(updates).toHaveLength(4);
    expect(updates.at(-1)?.units.at(-1)?.value).toBe(7);

    stop();
  });

  it("uses the expired label for past or invalid dates", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-15T00:00:10.000Z"));

    const past = getCountdownSnapshot(
      "2026-10-15T00:00:09.000Z",
      Date.now(),
      "detailed",
      "Out now",
    );
    const invalid = getCountdownSnapshot(
      "not-a-date",
      Date.now(),
      "days",
      "Date unavailable",
    );

    expect(past.expired).toBe(true);
    expect(past.visibleLabel).toBe("Out now");
    expect(invalid.expired).toBe(true);
    expect(invalid.accessibleLabel).toBe("Date unavailable");
  });

  it("keeps date-only releases available through their release day", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-15T12:00:00.000Z"));

    const today = getCountdownSnapshot("2026-10-15", Date.now(), "days");
    const tomorrow = getCountdownSnapshot("2026-10-16", Date.now(), "days");
    const yesterday = getCountdownSnapshot("2026-10-14", Date.now(), "days");

    expect(today.visibleLabel).toBe("Releasing today");
    expect(tomorrow.visibleLabel).toBe("Tomorrow");
    expect(yesterday.expired).toBe(true);
  });

  it("allows a final polite update, then stops after expiry", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-15T00:00:00.000Z"));

    const updates: CountdownSnapshot[] = [];
    const stop = subscribeToCountdown(
      "2026-10-15T00:00:02.000Z",
      "detailed",
      (snapshot) => updates.push(snapshot),
    );

    vi.advanceTimersByTime(2_000);
    expect(updates.at(-1)?.expired).toBe(true);
    const countAtExpiry = updates.length;

    vi.advanceTimersByTime(60_000);
    expect(updates).toHaveLength(countAtExpiry + 60);

    vi.advanceTimersByTime(10_000);
    expect(updates).toHaveLength(countAtExpiry + 60);

    stop();
  });
});
