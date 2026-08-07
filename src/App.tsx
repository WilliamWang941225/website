import { Link, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import About from "./components/About";
import Footer from "./components/Footer";
import Notes from "./components/Notes";
import NoteDetail from "./components/NoteDetail";
import Resources from "./components/Resources";
import Tutor from "./components/Tutor";
import RouteScrollManager from "./components/RouteScrollManager";
import ThemeToggle from "./components/ThemeToggle";

const pages = [
  {
    path: "/about",
    title: "About Me",
    description: "My background, interests, and journey through physics.",
  },
  {
    path: "/notes",
    title: "Notes",
    description: "Physics notes, handouts, solutions, and materials I have written.",
  },
  {
    path: "/resources",
    title: "Resources",
    description: "Useful websites, tools, and references for studying physics.",
  },
  {
    path: "/tutor",
    title: "Tutoring",
    description: "Information about physics tutoring and how to contact me.",
  },
];

export default function App() {
  return (
    <div id="wrapper" className="no-sidebar">
      <RouteScrollManager />
      <ThemeToggle />

      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:slug" element={<NoteDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/tutor" element={<Tutor />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToHomePosition) {
      setTimeout(() => {
        document.getElementById("home-return-position")?.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      }, 0);
    }
  }, [location]);

  return (
    <section id="home">
      {/* <div className="image main" data-position="center">
        <img src="images/IMG_5221 (1).jpeg" alt="Banner" />
      </div> */}

      <div id="home-return-position" className="container">
        <header className="major">
          <h2>Welcome to my website</h2>
          <p>and to my personal journey through physics.</p>
          <h3>Zhao-Guo Wang</h3>
        </header>

        <div className="page-choice-grid">
          {pages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="page-choice-card"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "auto",
                });
              }}
            >
              <h3>{page.title}</h3>
              <p>{page.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
