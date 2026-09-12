import BackHomeButton from "./BackHomeButton";

export default function About() {
  return (
    <section id="one">
      <div className="container">
        <BackHomeButton />

        <section className="about-hero" aria-labelledby="about-title">
          <span className="image avatar about-avatar">
            <img src="images/avatar.jpg" alt="William Wang" />
          </span>

          <div>
            <p className="section-eyebrow">About me</p>
            <h2 id="about-title">Zhao-Guo Wang</h2>
            <p className="about-lead">
              A curious learner interested in physics</p>
            <p>
              My physics journey led to the National Physics Team in grade 11 and
              gold medals at the Asian and International Physics Olympiads in
              2023. I now enjoy continuing that exploration through study,
              problem-solving, and independent projects.
            </p>
          </div>
        </section>

        <section className="about-section" aria-labelledby="education-title">
          <header>
            <p className="section-eyebrow">Education</p>
            <h3 id="education-title">Learning journey</h3>
          </header>

          <ol className="education-timeline">
            <li>
              <p className="education-type">University</p>
              <h4>National Taiwan University</h4>
              <p className="education-program">Electrical Engineering</p>
              <p>
                Exploring engineering alongside a continuing interest in physics
                and programming.
              </p>
            </li>
            <li>
              <p className="education-type">High school</p>
              <h4>
                <a
                  href="https://www.cchs.chc.edu.tw/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ching Cheng High School
                </a>
              </h4>
              <p className="education-program">Changhua, Taiwan</p>
              <p>
                The place where my interest in physics grew into competition,
                team training, and a lasting habit of self-directed learning.
              </p>
            </li>
          </ol>
        </section>

        <section className="about-section" aria-labelledby="highlights-title">
          <header>
            <p className="section-eyebrow">Highlights</p>
            <h3 id="highlights-title">Physics milestones</h3>
          </header>

          <ul className="achievement-list">
            <li>
              <span className="icon solid fa-users" aria-hidden="true" />
              <div>
                <h4>National Physics Team</h4>
                <p>Selected as a team member in grade 11.</p>
              </div>
            </li>
            <li>
              <span className="icon solid fa-trophy" aria-hidden="true" />
              <div>
                <h4>
                  <a
                    href="https://ipho-unofficial.org/timeline/2023/individual"
                    target="_blank"
                    rel="noreferrer"
                  >
                    IPhO 2023 Gold Medal
                  </a>
                </h4>
                <p>International Physics Olympiad.</p>
              </div>
            </li>
            <li>
              <span className="icon solid fa-trophy" aria-hidden="true" />
              <div>
                <h4>APhO 2023 Gold Medal</h4>
                <p>Asian Physics Olympiad.</p>
              </div>
            </li>
          </ul>
        </section>

        <section
          className="about-section about-connect"
          aria-labelledby="connect-title"
        >
          <p className="section-eyebrow">Connect</p>
          <h3 id="connect-title">Keep in touch</h3>
          <ul className="icons">
            <li>
              <a
                href="https://github.com/WilliamWang941225"
                target="_blank"
                rel="noreferrer"
                className="icon brands fa-github"
              >
                <span className="label">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:WilliamWang941225@gmail.com"
                className="icon solid fa-envelope"
              >
                <span className="label">Email</span>
              </a>
            </li>
          </ul>
        </section>

        <figure className="image about-photo">
          <img src="images/IMG_5221 (1).jpeg" alt="IPhO team graffiti" />
          <figcaption>
            A graffiti drawn with IPhO teammates, celebrating the five gold
            medals we hoped to earn together.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
