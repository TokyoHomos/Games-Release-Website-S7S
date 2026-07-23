import { describe, expect, it } from "vitest";

import { getGameById, getPlatformById } from "./selectors";

describe("mock-data selectors", () => {
  it("resolves a game by its stable identifier", () => {
    expect(getGameById("game-echoes-of-aether")?.title).toBe(
      "Echoes of Aether",
    );
  });

  it("returns undefined for an unknown platform", () => {
    expect(getPlatformById("platform-unknown")).toBeUndefined();
  });
});
