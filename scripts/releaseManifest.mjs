import fs from "node:fs";
import path from "node:path";

function isReleaseDate(value) {
  if (value === null) return true;
  if (typeof value !== "string" || !/^\d{4}\/\d{2}\/\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("/").map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return year > 0 && date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

// Read only: PDF files and their modification dates are never changed here.
export function readReleases(publicDir, manifestHref) {
  const fail = (message) => {
    throw new Error(`Release manifest ${String(manifestHref)}: ${message}`);
  };

  if (typeof manifestHref !== "string" || !manifestHref) {
    fail("expected a local manifest path relative to public/.");
  }

  let manifestPath;
  try {
    manifestPath = decodeURIComponent(manifestHref);
  } catch {
    fail("the manifest path contains invalid URL encoding.");
  }
  const segments = manifestPath.split("/");
  if (/[\\:?#]/.test(manifestPath) || segments.some((part) => !part || part === "." || part === "..")) {
    fail("use a local path relative to public/, without parent directories, queries or fragments.");
  }

  const absoluteManifestPath = path.join(publicDir, ...segments);
  let entries;
  try {
    entries = JSON.parse(fs.readFileSync(absoluteManifestPath, "utf8"));
  } catch (error) {
    fail(`cannot read JSON (${error.message}).`);
  }
  if (!Array.isArray(entries)) fail("expected a JSON array of releases.");

  const versions = new Set();
  const fields = new Set(["version", "date", "file", "summary", "changes"]);
  const releases = entries.map((entry, index) => {
    const invalid = (message) => fail(`entry ${index + 1}: ${message}`);
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      invalid("expected a release object.");
    }
    const unknownField = Object.keys(entry).find((field) => !fields.has(field));
    if (unknownField) invalid(`unknown field "${unknownField}".`);

    const { version, date, file, summary = "", changes = [] } = entry;
    if (typeof version !== "string" || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version) ||
      !version.split(".").every((part) => Number.isSafeInteger(Number(part)))) {
      invalid('version must use major.minor numbers, such as "1.0" or "1.10", without a v prefix.');
    }
    if (versions.has(version)) invalid(`duplicate version "${version}".`);
    versions.add(version);

    if (!isReleaseDate(date)) invalid("date must be a real YYYY/MM/DD date, or null when unknown.");
    if (typeof summary !== "string") invalid("summary must be text.");
    if (!Array.isArray(changes) || changes.some((change) => typeof change !== "string" || !change.trim())) {
      invalid("changes must be an array of non-empty text entries (or an empty array).");
    }
    if (typeof file !== "string" || /[\\/:?#]/.test(file) || !/\.pdf$/i.test(file)) {
      invalid("file must be a PDF filename within the manifest folder, without directory separators, # or ?.");
    }
    const pdfPath = path.join(path.dirname(absoluteManifestPath), file);
    if (!fs.existsSync(pdfPath) || !fs.statSync(pdfPath).isFile()) {
      invalid(`PDF not found: ${file}.`);
    }

    return {
      version,
      date,
      href: [...segments.slice(0, -1), file].map(encodeURIComponent).join("/"),
      summary: summary.trim(),
      changes: changes.map((change) => change.trim())
    };
  });

  return releases.sort((a, b) => {
    const [aMajor, aMinor] = a.version.split(".").map(Number);
    const [bMajor, bMinor] = b.version.split(".").map(Number);
    return bMajor - aMajor || bMinor - aMinor;
  });
}
