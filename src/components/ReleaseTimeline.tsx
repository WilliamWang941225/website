import type { NoteRelease } from "../data/Notes";

function ReleaseDate({ date }: { date: string | null }) {
  if (!date) return <span>Date not recorded.</span>;

  const [year, month, day] = date.split("/").map(Number);
  const value = new Date(0);
  value.setUTCFullYear(year, month - 1, day);
  return (
    <time dateTime={date.replace(/\//g, "-")}>
      {new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(value)}
    </time>
  );
}

function ReleaseActions({ release }: { release: NoteRelease }) {
  return (
    <div className="release-actions">
      <a className="release-open" href={release.href}>
        Open PDF<span className="release-sr-only"> version {release.version}</span>
      </a>
    </div>
  );
}

function ReleaseChanges({ release }: { release: NoteRelease }) {
  return (
    <section className="release-changes" aria-label={`Changes in version ${release.version}`}>
      <h4>Changes</h4>
      {release.summary && <p>{release.summary}</p>}
      {release.changes.length > 0 && (
        <ul>
          {release.changes.map((change, index) => (
            <li key={index}>{change}</li>
          ))}
        </ul>
      )}
      {!release.summary && release.changes.length === 0 && (
        <p>Changes have not been documented for this release.</p>
      )}
    </section>
  );
}

// The generator supplies releases in descending numeric version order.
export default function ReleaseTimeline({ releases }: { releases: NoteRelease[] }) {
  const [latest, ...previous] = releases;
  if (!latest) return null;

  return (
    <section className="release-timeline" aria-label="Release history">
      <section className="release-latest" aria-label={`Latest release, version ${latest.version}`}>
        <div className="release-heading">
          <h3>
            Version {latest.version}
            <span className="release-meta"> · <ReleaseDate date={latest.date} /></span>
          </h3>
          <span className="release-badge">Latest</span>
        </div>
        <ReleaseActions release={latest} />
        <ReleaseChanges release={latest} />
      </section>

      {previous.length > 0 && (
        <section className="release-previous" aria-label="Previous releases">
          <ol className="release-history">
            {previous.map((release) => (
              <li key={release.version}>
                <details>
                  <summary>
                    <span className="release-version">Version {release.version}</span>
                    <span className="release-meta"> · <ReleaseDate date={release.date} /></span>
                  </summary>
                  <div className="release-history-body">
                    <ReleaseActions release={release} />
                    <ReleaseChanges release={release} />
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </section>
      )}
    </section>
  );
}
