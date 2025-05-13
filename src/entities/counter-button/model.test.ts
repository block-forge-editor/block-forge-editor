import { fork, allSettled } from "effector";
import { it, expect, describe } from "vitest";

import { $clicksCount, buttonClicked } from "./model";

describe("model tests", () => {
  it("should increment $clicksCount when buttonClicked and $clicksCount is less than 100", async () => {
    const scope = fork();

    expect(scope.getState($clicksCount)).toBe(0);

    await allSettled(buttonClicked, { scope });

    expect(scope.getState($clicksCount)).toBe(1);
  });

  it("should not increment $clicksCount when buttonClicked and $clicksCount is 100", async () => {
    const scope = fork({
      values: [[$clicksCount, 100]],
    });

    await allSettled(buttonClicked, { scope });

    expect(scope.getState($clicksCount)).toBe(100);
  });
});
