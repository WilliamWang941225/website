import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

let fixtureId = 0;

async function generateFixture(entries) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "website-date-test-"));
  const folder = path.join(root, "public", "document", "fluid_mechanics");
  const previousCwd = process.cwd();
  const previousWarn = console.warn;
  const previousLog = console.log;
  const warnings = [];
  try {
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(folder, "releases.json"), JSON.stringify(entries));
    for (const entry of entries) {
      const pdf = path.join(folder, entry.file);
      fs.writeFileSync(pdf, "%PDF-1.4\nDate test fixture\n");
      fs.utimesSync(pdf, new Date(2020, 0, 2), new Date(2020, 0, 2));
    }
    // A non-versioned note must retain its original file-date behavior.
    const olympiad = path.join(root, "public", "document", "Olympiad_Record.pdf");
    fs.writeFileSync(olympiad, "%PDF-1.4\nDate test fixture\n");
    fs.utimesSync(olympiad, new Date(2001, 0, 2), new Date(2001, 0, 2));
    process.chdir(root);
    console.warn = (message) => warnings.push(message);
    console.log = () => {};
    // Each import runs the actual generator against isolated files and its real configuration.
    await import(new URL(`./generateNotes.mjs?date-test=${fixtureId++}`, import.meta.url));
    const output = fs.readFileSync(path.join(root, "src", "data", "Notes.ts"), "utf8");
    const notes = JSON.parse(output.match(/export const notes: Note\[\] = ([\s\S]+);\s*$/)[1]);
    return { notes, warnings };
  } finally {
    process.chdir(previousCwd);
    console.warn = previousWarn;
    console.log = previousLog;
    assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
    assert.ok(path.basename(root).startsWith("website-date-test-"));
    fs.rmSync(root, { recursive: true, force: true });
  }
}

const release = (version, date) => ({ version, date, file: `notes-v${version}.pdf`, changes: [] });

test("note date and primary PDF follow the highest version, not file time or maximum date", async () => {
  const { notes, warnings } = await generateFixture([
    release("1.9", "2026/09/12"),
    release("1.10", "2026/07/23")
  ]);
  const fluid = notes.find((note) => note.slug === "fluid-mechanics");
  assert.equal(fluid.date, "2026/07/23");
  assert.equal(fluid.href, "document/fluid_mechanics/notes-v1.10.pdf");
  assert.deepEqual(fluid.releases.map((item) => item.version), ["1.10", "1.9"]);
  assert.equal(fluid.links, undefined);
  assert.ok(warnings.every((message) => !message.includes("Fluid_Mechanics.pdf")));
  assert.equal(notes.find((note) => note.slug === "olympiad-record").date, "2001/01/02");
  assert.equal(notes.find((note) => note.slug === "jackson-electrodynamics").date, "2024/06/05");
});

test("an unknown latest date does not inherit an older release date or PDF mtime", async () => {
  const { notes } = await generateFixture([
    release("1.0", "2026/07/23"),
    release("2.0", null)
  ]);
  const fluid = notes.find((note) => note.slug === "fluid-mechanics");
  assert.equal(fluid.date, "");
  assert.equal(fluid.releases[0].date, null);
  assert.equal(fluid.href, "document/fluid_mechanics/notes-v2.0.pdf");
});

test("empty archives do not invent a date or revive deleted Fluid Mechanics links", async () => {
  const { notes } = await generateFixture([]);
  const fluid = notes.find((note) => note.slug === "fluid-mechanics");
  assert.equal(fluid.date, "");
  assert.equal(fluid.href, undefined);
  assert.deepEqual(fluid.releases, []);
  assert.equal(notes.find((note) => note.slug === "olympiad-record").date, "2001/01/02");
});
