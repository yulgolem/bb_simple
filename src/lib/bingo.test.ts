import { describe, it, expect } from "vitest";
import { hasBingo, type Board } from "./bingo";

function empty(): Board {
  return Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => false));
}

describe("hasBingo", () => {
  it("detects row", () => {
    const b = empty();
    b[2] = [true, true, true, true, true];
    expect(hasBingo(b)).toBe(true);
  });

  it("detects column", () => {
    const b = empty();
    for (let r = 0; r < 5; r += 1) b[r][4] = true;
    expect(hasBingo(b)).toBe(true);
  });

  it("detects diagonal ", () => {
    const b = empty();
    for (let i = 0; i < 5; i += 1) b[i][i] = true;
    expect(hasBingo(b)).toBe(true);
  });

  it("no bingo", () => {
    const b = empty();
    b[0][0] = true;
    b[1][1] = true;
    b[2][2] = false;
    expect(hasBingo(b)).toBe(false);
  });
});


