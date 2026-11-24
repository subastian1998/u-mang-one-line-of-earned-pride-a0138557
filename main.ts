import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One Line of Earned Pride — a quiet, earned moment of pride for
// someone in a scene: a small person doing something hard, a long
// effort finally landing. Concrete scene, real person, pride earned
// inside the line, lands in one read.
const ENTRY =
  "He spent three winters teaching his left hand to write again, and today he signed his granddaughter's birthday card without stopping.";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 240
// characters, not only white space, and one line.
function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`entry must be 1-240 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write byte check: the file on disk must be byte-identical
// to the entry we validated, with no trailing newline added.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("post-write byte check failed: file differs from ENTRY");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
  throw new Error("post-write byte check failed: byte length mismatch");
}
console.log(`entry written: ${[...ENTRY].length} chars, valid`);
