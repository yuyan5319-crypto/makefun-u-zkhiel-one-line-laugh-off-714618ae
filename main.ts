// One-Line Laugh-Off — a smart speaker's idea of a lullaby.
//
// Writes one original, hand-written funny line (1-200 characters, no
// trailing newline) to <MAKEFUN_OUTPUT_DIR|/output>/entry.txt.
// Node 22, standard library only, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The line itself: a sleep aid that backfires — the speaker reaches for
// the most anxiety-inducing thing it knows.
// Tightened in revision: "for something" instead of "to play something"
// drops two words and lands the turn faster.
const LINE =
  "I asked my smart speaker for something to help me sleep. It read out my bank balance.";

// The gate requires 1-200 characters; refuse to write an invalid entry.
if ([...LINE].length < 1 || [...LINE].length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${[...LINE].length}`);
}

function writeLine(dir: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}

const preferred = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
try {
  writeLine(resolve(preferred));
} catch {
  // Running by hand outside the grading sandbox (e.g. /output not
  // writable): fall back to a local ./output directory.
  writeLine(resolve("output"));
}
