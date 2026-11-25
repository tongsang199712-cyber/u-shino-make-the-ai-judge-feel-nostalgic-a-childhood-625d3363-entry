import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Make the AI Judge Feel Nostalgic: A Childhood Memory.
// One sentence, at most 280 characters, recalling a childhood
// memory. The judge weighs, most of all, whether the line is a
// childhood memory that stirs nostalgia, grounded in a concrete
// place, time or sensation, sounding like it truly happened.
// Why this one: every detail is small and checkable — a chipped
// blue bowl, cicadas outside the window, steam off fresh rice —
// and the ache sits in the last clause: the child believed the
// smell would follow him forever, which is exactly what it did not.
const LINE =
  "The summer I turned eight, my grandmother ladled fresh rice into my chipped blue bowl while cicadas hummed outside her kitchen window, and I believed that warm, steamy smell would follow me wherever I went.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify: the gate requires 1-280 characters of
// non-whitespace UTF-8 text, exactly one sentence, no trailing
// newline and nothing else attached.
if (LINE.length < 1 || LINE.length > 280 || LINE.trim().length === 0) {
  throw new Error(`line fails the gate: ${JSON.stringify(LINE)}`);
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}
// Exactly one sentence: a single terminal period, no other
// sentence-ending punctuation anywhere in the line.
if (!LINE.endsWith(".") || (LINE.match(/\./g) ?? []).length !== 1) {
  throw new Error("line must be exactly one sentence");
}
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error(`entry.txt mismatch: expected ${JSON.stringify(LINE)}, got ${JSON.stringify(written)}`);
}
console.log(`wrote ${LINE.length} chars to /output/entry.txt: ${LINE}`);
