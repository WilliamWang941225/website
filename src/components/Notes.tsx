import BackHomeButton from "./BackHomeButton";
import NoteList from "./NoteList";
import { notes } from "../data/Notes";

export default function MyNotes() {
  return (
    <section id="one">
      <div className="container">
        <BackHomeButton />
        <header className="comp-major">
          <h2>My Notes</h2>
          <p>A collection of notes, handouts, and worked solutions.</p>
        </header>
        <NoteList notes={notes} />
      </div>
    </section>
  );
}
