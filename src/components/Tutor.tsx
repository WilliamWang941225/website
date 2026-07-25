import BackHomeButton from "./BackHomeButton";

export default function Tutor() {
  return (
    <section id="four">
      <div className="container">
        <BackHomeButton />
        <header className="comp-major">
          <h2>Tutor</h2>
        </header>
        <p>
          I&apos;m looking forward to providing <b>tutoring</b>. {" "}
          <a href="document/CV.pdf" target="_blank" rel="noreferrer">
            Here
          </a>{" "}
          is the detailed information.
        </p>
      </div>
    </section>
  );
}
