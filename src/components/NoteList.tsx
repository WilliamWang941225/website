import { Link } from "react-router-dom";
import type { Note } from "../data/Notes";

function parseNoteDate(date: string): number {
  if (!date) return 0;

  const [year, month, day] = date.split("/").map(Number);

  if (!year || !month || !day) return 0;

  return new Date(year, month - 1, day).getTime();
}

function formatNoteDate(date: string): string {
  if (!date) return "In progress";

  const [year, month, day] = date.split("/").map(Number);

  if (!year || !month || !day) return date;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function NoteList({ notes }: { notes: Note[] }) {
  const sortedNotes = [...notes].sort(
    (a, b) => parseNoteDate(b.date) - parseNoteDate(a.date)
  );

  return (
    <div className="note-index" aria-label="Notes">
      {sortedNotes.map((note) => (
        <article className="note-index-item" key={note.slug}>
          <h3>
            <Link to={`/notes/${note.slug}`}>{note.title}</Link>
          </h3>
          <p className="note-summary">{note.summary}</p>
          <div className="note-meta">
            <span>{formatNoteDate(note.date)}</span>
            {note.tags.map((tag) => (
              <span className="note-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
