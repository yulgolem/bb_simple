export type Board = boolean[][]; // 5x5 grid of marked cells

export function hasBingo(marked: Board): boolean {
  // rows
  for (let r = 0; r < 5; r += 1) if (marked[r].every(Boolean)) return true;
  // cols
  for (let c = 0; c < 5; c += 1) {
    let ok = true;
    for (let r = 0; r < 5; r += 1) if (!marked[r][c]) ok = false;
    if (ok) return true;
  }
  // diagonals
  if ([0, 1, 2, 3, 4].every((i) => marked[i][i])) return true;
  if ([0, 1, 2, 3, 4].every((i) => marked[i][4 - i])) return true;
  return false;
}

/**
 * Returns indices (0..24) of one winning line if present, otherwise null.
 */
export function detectWinningLine(marked: Board): number[] | null {
  // rows
  for (let r = 0; r < 5; r += 1) {
    if (marked[r].every(Boolean)) return [0, 1, 2, 3, 4].map((c) => r * 5 + c);
  }
  // cols
  for (let c = 0; c < 5; c += 1) {
    let ok = true;
    for (let r = 0; r < 5; r += 1) if (!marked[r][c]) ok = false;
    if (ok) return [0, 1, 2, 3, 4].map((r) => r * 5 + c);
  }
  // diagonals
  if ([0, 1, 2, 3, 4].every((i) => marked[i][i])) return [0, 6, 12, 18, 24];
  if ([0, 1, 2, 3, 4].every((i) => marked[i][4 - i])) return [4, 8, 12, 16, 20];
  return null;
}


