import { useMemo, useState } from "react";
import BackHomeButton from "./BackHomeButton";

type Resource = {
  title: string;
  href: string;
  description: string;
  type: "Course" | "Reference" | "Practice" | "Community" | "Notes";
  featured?: boolean;
};

type ResourceGroup = {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
};

const resourceGroups: ResourceGroup[] = [
  {
    id: "relativity",
    title: "Relativity & Geometry",
    description: "Courses, notes, and articles for studying spacetime and geometry.",
    resources: [
      {
        title: "MIT OpenCourseWare",
        href: "https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/",
        description: "Lecture videos, assignments, and course materials for general relativity.",
        type: "Course",
        featured: true,
      },
      {
        title: "Sean Carroll's General Relativity Notes",
        href: "https://www.preposterousuniverse.com/grnotes/",
        description: "A widely used set of notes covering the foundations of general relativity.",
        type: "Notes",
        featured: true,
      },
      {
        title: "New Quanta",
        href: "https://newquanta.com/",
        description: "Explanations and articles on modern physics topics.",
        type: "Community",
      },
    ],
  },
  {
    id: "competitions",
    title: "Physics Competitions",
    description: "Problem sources, official information, and practice communities.",
    resources: [
      {
        title: "CPhO Wiki",
        href: "https://pan.cpho.wiki/",
        description: "Competition reference material and community-maintained resources.",
        type: "Community",
        featured: true,
      },
      {
        title: "Physics Cup",
        href: "https://physicscup.ee/",
        description: "International competition problems and event information.",
        type: "Practice",
      },
      {
        title: "pho.rs",
        href: "https://pho.rs/",
        description: "A collection of practice resources for physics olympiad preparation.",
        type: "Practice",
      },
      {
        title: "CPhO Official Website",
        href: "https://cpho.pku.edu.cn/ckzl/qgjssthjd.htm",
        description: "Official announcements and information for the Chinese Physics Olympiad.",
        type: "Reference",
      },
    ],
  },
  {
    id: "classical",
    title: "Classical Physics & Reference",
    description: "Helpful reading, teaching material, and reference collections.",
    resources: [
      {
        title: "College Physics",
        href: "https://dxwl.bnu.edu.cn/CN/1000-0712/current.shtml",
        description: "A Chinese-language source for physics education and learning material.",
        type: "Reference",
      },
      {
        title: "dnlab",
        href: "https://index.dnlab.net/%E5%AD%A6%E7%A7%91/%E7%89%A9%E7%90%86?hash=5ze4pekW",
        description: "An organised index of physics topics and useful links.",
        type: "Reference",
      },
      {
        title: "Fluid Dynamics Notes",
        href: "https://hackmd.io/@0xff07/r1rq24hqI/https%3A%2F%2Fhackmd.io%2F%400xff07%2Fr1Qo_QFKx",
        description: "Online notes and discussions on fluid dynamics.",
        type: "Notes",
      },
      {
        title: "Jackson Electrodynamics Notes",
        href: "https://github.com/euphoricrhino/jackson-em-notes",
        description: "Community-created notes and solutions for Jackson's Classical Electrodynamics.",
        type: "Notes",
      },
      {
        title: "Professor Zhao-Huan Yu's Teaching Page",
        href: "https://yzhxxzxy.github.io/cn/teaching.html",
        description: "Course materials and teaching resources from Professor Zhao-Huan Yu.",
        type: "Course",
      },
    ],
  },
  {
    id: "quantum",
    title: "AMO & Quantum Optics",
    description: "A starting point for atomic, molecular, optical, and quantum physics.",
    resources: [
      {
        title: "AMO Wiki by MIT",
        href: "https://amowiki.odl.mit.edu/index.php/Main_Page",
        description: "A collaborative reference for AMO physics and quantum optics.",
        type: "Reference",
        featured: true,
      },
    ],
  },
];

export default function OnlineResources() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const visibleGroups = useMemo(
    () =>
      selectedCategory === "all"
        ? resourceGroups
        : resourceGroups.filter((group) => group.id === selectedCategory),
    [selectedCategory]
  );

  return (
    <section id="three">
      <div className="container">
        <BackHomeButton />
        <header className="comp-major resources-header">
          <p className="section-eyebrow">Study library</p>
          <h2>Resources</h2>
          <p>Selected courses, references, and problem-solving tools.</p>
        </header>

        <div className="resource-filters" aria-label="Resource categories">
          <button
            type="button"
            className={selectedCategory === "all" ? "is-selected" : ""}
            aria-pressed={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          {resourceGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              className={selectedCategory === group.id ? "is-selected" : ""}
              aria-pressed={selectedCategory === group.id}
              onClick={() => setSelectedCategory(group.id)}
            >
              {group.title}
            </button>
          ))}
        </div>

        <div className="resource-library">
          {visibleGroups.map((group) => (
            <section className="resource-group" key={group.id}>
              <header>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </header>

              <div className="resource-grid">
                {group.resources.map((resource) => (
                  <article
                    className={`resource-card${resource.featured ? " is-featured" : ""}`}
                    key={resource.href}
                  >
                    <p className="resource-type">{resource.type}</p>
                    <h4>
                      <a href={resource.href} target="_blank" rel="noreferrer">
                        {resource.title} <span aria-hidden="true">↗</span>
                      </a>
                    </h4>
                    <p>{resource.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
