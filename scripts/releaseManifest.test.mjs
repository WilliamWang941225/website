import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { readReleases } from "./releaseManifest.mjs";

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "website-release-test-"));
  const folder = path.join(root, "document", "fluid_mechanics");
  fs.mkdirSync(folder, { recursive: true });
  t.after(() => {
    assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
    assert.ok(path.basename(root).startsWith("website-release-test-"));
    fs.rmSync(root, { recursive: true, force: true });
  });
  const manifest = path.join(folder, "releases.json");
  return {
    root,
    folder,
    manifest,
    write(entries) {
      fs.writeFileSync(manifest, JSON.stringify(entries));
    },
    pdf(file = "notes.pdf") {
      fs.writeFileSync(path.join(folder, file), "%PDF-1.4\nTest fixture\n");
    },
    read() {
      return readReleases(root, "document/fluid_mechanics/releases.json");
    }
  };
}

const release = (overrides = {}) => ({ version: "1.0", date: null, file: "notes.pdf", ...overrides });

test("an empty archive needs no PDFs", (t) => {
  const data = fixture(t);
  data.write([]);
  assert.deepEqual(data.read(), []);
});

test("sorts numerically, retains unknown dates, and leaves PDFs and mtimes unchanged", (t) => {
  const data = fixture(t);
  data.pdf();
  const pdf = path.join(data.folder, "notes.pdf");
  fs.utimesSync(pdf, new Date("2020-01-01"), new Date("2020-01-01"));
  const before = { bytes: fs.readFileSync(pdf), mtime: fs.statSync(pdf).mtimeMs };
  data.write(["1.9", "2.0", "1.10", "1.0"].map((version) => release({ version })));
  const result = data.read();
  assert.deepEqual(result.map((item) => item.version), ["2.0", "1.10", "1.9", "1.0"]);
  assert.equal(result[0].date, null);
  assert.equal(result[0].summary, "");
  assert.deepEqual(result[0].changes, []);
  assert.deepEqual(fs.readFileSync(pdf), before.bytes);
  assert.equal(fs.statSync(pdf).mtimeMs, before.mtime);
});

test("encodes literal spaces, Unicode and percent signs in PDF names", (t) => {
  const data = fixture(t);
  const file = "Fluid 力學 100%.PDF";
  data.pdf(file);
  data.write([release({ file, date: "2024/02/29", summary: " A statement. ", changes: [" A correction. "] })]);
  assert.deepEqual(data.read(), [{
    version: "1.0",
    date: "2024/02/29",
    href: `document/fluid_mechanics/${encodeURIComponent(file)}`,
    summary: "A statement.",
    changes: ["A correction."]
  }]);
});

test("rejects duplicate version labels", (t) => {
  const data = fixture(t);
  data.pdf();
  data.write([release(), release()]);
  assert.throws(() => data.read(), /entry 2: duplicate version "1.0"/);
});

for (const version of ["v1.0", "1", "1.0.1", "01.0", "1.01", "-1.0", "1.9007199254740992", 1]) {
  test(`rejects invalid version ${JSON.stringify(version)}`, (t) => {
    const data = fixture(t);
    data.write([release({ version })]);
    assert.throws(() => data.read(), /version must use major.minor/);
  });
}

for (const date of ["2023/02/29", "2024/04/31", "2024/00/10", "2024/13/01", "0000/01/01", "2024-01-01", "", undefined]) {
  test(`rejects invalid release date ${JSON.stringify(date)}`, (t) => {
    const data = fixture(t);
    data.write([release({ date })]);
    assert.throws(() => data.read(), /date must be a real/);
  });
}

test("rejects malformed metadata instead of silently dropping it", (t) => {
  const data = fixture(t);
  for (const entry of [null, [], release({ summary: 42 }), release({ changes: "Correction" }),
    release({ changes: [null] }), release({ changes: [" "] }), release({ change: "Typo" })]) {
    data.write([entry]);
    assert.throws(() => data.read(), /Release manifest .*entry 1:/);
  }
});

test("requires an existing PDF file inside the manifest folder", (t) => {
  const data = fixture(t);
  fs.mkdirSync(path.join(data.folder, "directory.pdf"));
  for (const file of ["missing.pdf", "directory.pdf", "../outside.pdf", "..\\outside.pdf", "C:outside.pdf", "/outside.pdf", "notes.txt", "notes#1.pdf", "notes?.pdf"]) {
    data.write([release({ file })]);
    assert.throws(() => data.read(), /PDF not found|file must be a PDF filename/);
  }
});

test("rejects missing, malformed, and non-array manifests with their path", (t) => {
  const data = fixture(t);
  assert.throws(() => data.read(), /Release manifest document\/fluid_mechanics\/releases.json: cannot read JSON/);
  fs.writeFileSync(data.manifest, "[");
  assert.throws(() => data.read(), /cannot read JSON/);
  data.write({ releases: [] });
  assert.throws(() => data.read(), /expected a JSON array/);
});

test("requires a local manifest path inside public", (t) => {
  const data = fixture(t);
  for (const href of [null, "", "https://example.com/releases.json", "/releases.json", "../releases.json", "%2e%2e/releases.json", "%ZZ"]) {
    assert.throws(() => readReleases(data.root, href), /Release manifest/);
  }
});
