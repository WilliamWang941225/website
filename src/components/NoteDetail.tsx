import { Link, useParams } from "react-router-dom";
import BackHomeButton from "./BackHomeButton";
import ReleaseTimeline from "./ReleaseTimeline";
import { notes } from "../data/Notes";

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function formatNoteDate(date: string): string {
  if (!date) return "In progress";

  const [year, month, day] = date.split("/").map(Number);

  if (!year || !month || !day) return date;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function NoteDetail() {
  const { slug } = useParams();
  const note = notes.find((item) => item.slug === slug);

  if (!note) {
    return (
      <section id="note-detail">
        <div className="container">
          <BackHomeButton to="/notes" label="Notes" />
          <header className="comp-major">
            <h2>Note not found</h2>
            <p>The note you requested does not exist or has been moved.</p>
          </header>
          <Link className="note-return-link" to="/notes">
            Browse all notes
          </Link>
        </div>
      </section>
    );
  }

  const resources =
    note.links && note.links.length > 0
      ? note.links
      : note.href
        ? [{ label: "Open resource", href: note.href }]
        : [];

  return (
    <section id="note-detail">
      <div className="container">
        <BackHomeButton to="/notes" label="Notes" />

        <article className="note-detail">
          <header className="note-detail-header">
            <p className="note-eyebrow">Notes</p>
            <h2>{note.title}</h2>
            <div className="note-meta">
              <span>{formatNoteDate(note.date)}</span>
              {note.tags.map((tag) => (
                <span className="note-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="note-detail-body">
            <p>{note.summary}</p>
          </div>

          {note.releases && note.releases.length > 0 ? (
            <ReleaseTimeline releases={note.releases} />
          ) : resources.length > 0 && (
            <section
              className="note-resources"
              aria-labelledby="note-resources-title"
            >
              <h3 id="note-resources-title">Resources</h3>
              <ul>
                {resources.map((resource) => (
                  <li key={resource.href}>
                    <a
                      href={resource.href}
                      target={
                        isExternalHref(resource.href) ? "_blank" : undefined
                      }
                      rel={
                        isExternalHref(resource.href) ? "noreferrer" : undefined
                      }
                    >
                      {resource.label}
                      {isExternalHref(resource.href) && (
                        <span aria-hidden="true"> ↗</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </div>
    </section>
  );
}
