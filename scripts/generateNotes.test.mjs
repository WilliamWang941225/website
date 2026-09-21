import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

let fixtureId = 0;

async function generateFixture(entries, nextEntries) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "website-date-test-"));
  const folder = path.join(root, "public", "document", "fluid_mechanics");
  const previousCwd = process.cwd();
  const previousWarn = console.warn;
  const previousLog = console.log;
  const warnings = [];
  try {
    fs.mkdirSync(folder, { recursive: true });
    // A non-versioned note must retain its original file-date behavior.
    const olympiad = path.join(root, "public", "document", "Olympiad_Record.pdf");
    fs.writeFileSync(olympiad, "%PDF-1.4\nDate test fixture\n");
    fs.utimesSync(olympiad, new Date(2001, 0, 2), new Date(2001, 0, 2));
    process.chdir(root);
    console.warn = (message) => warnings.push(message);
    console.log = () => {};
    const pages = [];
    for (const snapshot of nextEntries === undefined ? [entries] : [entries, nextEntries]) {
      fs.writeFileSync(path.join(folder, "releases.json"), JSON.stringify(snapshot));
      for (const entry of snapshot) {
        const pdf = path.join(folder, entry.file);
        if (!fs.existsSync(pdf)) {
          fs.writeFileSync(pdf, "%PDF-1.4\nDate test fixture\n");
          fs.utimesSync(pdf, new Date(2020, 0, 2), new Date(2020, 0, 2));
        }
      }
      const pdfNames = fs.readdirSync(folder).filter((name) => /\.pdf$/i.test(name));
      const before = pdfNames.map((name) => ({
        bytes: fs.readFileSync(path.join(folder, name)),
        mtime: fs.statSync(path.join(folder, name)).mtimeMs
      }));
      // Each import runs the actual generator against isolated files and its real configuration.
      await import(new URL(`./generateNotes.mjs?date-test=${fixtureId++}`, import.meta.url));
      assert.deepEqual(fs.readdirSync(folder).filter((name) => /\.pdf$/i.test(name)), pdfNames);
      pdfNames.forEach((name, index) => {
        assert.deepEqual(fs.readFileSync(path.join(folder, name)), before[index].bytes);
        assert.equal(fs.statSync(path.join(folder, name)).mtimeMs, before[index].mtime);
      });
      pages.push(fs.readFileSync(path.join(root, "public", "notes", "fluid-mechanics", "latest", "index.html"), "utf8"));
    }
    const output = fs.readFileSync(path.join(root, "src", "data", "Notes.ts"), "utf8");
    const notes = JSON.parse(output.match(/export const notes: Note\[\] = ([\s\S]+);\s*$/)[1]);
    assert.deepEqual(fs.readdirSync(path.join(root, "public", "notes")), ["fluid-mechanics"]);
    return { notes, warnings, pages, html: pages.at(-1) };
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

test("note date, primary PDF and forwarding page follow the highest version, not file time or maximum date", async () => {
  const { notes, warnings, html } = await generateFixture([
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
  assert.match(html, /http-equiv="refresh" content="0;url=\.\.\/\.\.\/\.\.\/document\/fluid_mechanics\/notes-v1\.10\.pdf"/);
  assert.match(html, /href="\.\.\/\.\.\/\.\.\/document\/fluid_mechanics\/notes-v1\.10\.pdf">Open PDF<\/a>/);
  assert.doesNotMatch(html, /notes-v1\.9\.pdf/);
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
  const { notes, html } = await generateFixture([]);
  const fluid = notes.find((note) => note.slug === "fluid-mechanics");
  assert.equal(fluid.date, "");
  assert.equal(fluid.href, undefined);
  assert.deepEqual(fluid.releases, []);
  assert.equal(notes.find((note) => note.slug === "olympiad-record").date, "2001/01/02");
  assert.match(html, /No PDF is available yet/);
  assert.doesNotMatch(html, /http-equiv="refresh"|location\.replace|Open PDF/);
});

test("regeneration changes the forwarding destination and clears it when the archive becomes empty", async () => {
  const first = release("1.0", null);
  const second = release("2.0", null);
  const { pages } = await generateFixture([first], [first, second]);
  assert.match(pages[0], /notes-v1\.0\.pdf/);
  assert.match(pages[1], /notes-v2\.0\.pdf/);
  assert.doesNotMatch(pages[1], /notes-v1\.0\.pdf/);
  const { html } = await generateFixture([first], []);
  assert.match(html, /No PDF is available yet/);
  assert.doesNotMatch(html, /http-equiv="refresh"|location\.replace|notes-v1\.0\.pdf/);
});

test("PDF and archive links resolve under development and production bases, including encoded filenames", async () => {
  const file = "Fluid 力學 100% & notes.pdf";
  const { html } = await generateFixture([{ ...release("1.0", null), file }]);
  const redirect = html.match(/http-equiv="refresh" content="0;url=([^"]+)"/)[1];
  const fallback = html.match(/href="([^"]+)">Open PDF<\/a>/)[1];
  const history = html.match(/href="([^"]+)">View release history<\/a>/)[1];
  assert.equal(redirect, fallback);
  assert.ok(html.includes(`window.location.replace(${JSON.stringify(redirect)})`));
  for (const base of ["/", "/website/"]) {
    const page = `https://example.com${base}notes/fluid-mechanics/latest/`;
    assert.equal(new URL(redirect, page).href, `https://example.com${base}document/fluid_mechanics/${encodeURIComponent(file)}`);
    assert.equal(new URL(history, page).href, `https://example.com${base}#/notes/fluid-mechanics`);
  }
});
