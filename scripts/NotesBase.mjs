// Edit this file when you add, remove, or rename notes.
// Versioned notes use their latest release date; other notes detect local file dates.

import { href } from "react-router-dom";

export const notesBase = [
  {
    slug: "fluid-mechanics",
    title: "Fluid Mechanics",
    summary:
      "About some interesting parts of fluid mechanics I thought of.",
    tags: ["Fluid dynamics", "Personal notes"],
    releaseManifest: "document/fluid_mechanics/releases.json"
  },
  {
    slug: "olympiad-record",
    title: "Olympiad Record",
    summary: 
      "My own experience during preparation.",
      tags: ["Personal notes"],
      href: "document/Olympiad_Record.pdf",
      links: [{ label: "Main file", href: "document/Olympiad_Record.pdf"}],
  },
  {
    slug: "jackson-electrodynamics",
    title: "Notes on Classical Electrodynamics 3rd edition, John David Jackson",
    summary:
      "Handouts and study notes for the third edition of Jackson's Classical Electrodynamics.",
    tags: ["Electrodynamics", "Handouts"],
    href: "document/Jackson_Handouts.pdf",
    dateSourceHref: "document/Jackson_Handouts.pdf",
    fallbackDate: "2024/06/05",
    links: [{ label: "Main file", href: "document/Jackson_Handouts.pdf" }]
  },
  {
    slug: "differential-geometry-general-relativity",
    title: "Differential Geometry and General Relativity",
    summary: "A work in progress on the geometric language of general relativity.",
    tags: ["Differential geometry", "General relativity", "Work in progress"],
    href: "https://github.com/WilliamWang941225/Differential-Geometry-and-General-Relativity/raw/main/Differential%20Geometry%20and%20General%20Relativity.pdf",
    links: [
      {
        label: "GitHub PDF",
        href: "https://github.com/WilliamWang941225/Differential-Geometry-and-General-Relativity/raw/main/Differential%20Geometry%20and%20General%20Relativity.pdf"
      }
    ]
  },
  {
    title: "7th Tian Wu Physics Competition Final (第七屆天物盃決賽) - Q3",
    slug: "tian-wu-physics-q3",
    summary:
      "The problem, solution, and original announcement for Question 3 of the final round.",
    tags: ["Physics competition", "Problem solution"],
    dateSourceHref: "document/Tian-Wu_Physics_Cup_Q3.pdf",
    links: [
      { label: "Problem", href: "document/Tian-Wu_Physics_Cup_Q3.pdf" },
      { label: "Solution", href: "document/Tian-Wu_Physics_Cup_A3.pdf" },
      { label: "Original Facebook link", href: "https://www.facebook.com/share/p/AW9EGxkNH9CqTBhx/" }
    ]
  },
  {
    title: "2024 IPhOC 秒題大賽 - Q2",
    slug: "iphoc-2024-q2",
    summary:
      "Question 2, its answer, and the official solution and marking scheme from IPhOC 2024.",
    tags: ["Physics competition", "Problem solution"],
    dateSourceHref: "document/Q2.pdf",
    links: [
      { label: "Problem", href: "document/Q2.pdf" },
      { label: "Answer", href: "document/S2.pdf" },
      { label: "Solution and Marking Scheme", href: "document/S2_full.pdf" }
    ]
  },
  {
    slug: "gravity",
    title: "Gravity",
    summary:
      "Lecture materials prepared for the CCHS Physics Book Club, with handouts as the primary reference.",
    tags: ["General relativity", "Lecture materials"],
    dateSourceHref: "document/Gravity_Handouts.pdf",
    links: [
      { label: "Lecture Handouts", href: "document/Gravity_Handouts.pdf" },
      { label: "Lecture Notes", href: "document/Gravity_Leture_Notes.pdf" }
    ]
  },
  {
    slug: "physics-cup-2024-problem-4",
    title: "Solution to Problem 4 of Physics Cup 2024",
    summary: "A worked solution to the fourth problem from Physics Cup 2024.",
    tags: ["Physics competition", "Problem solution"],
    href: "document/Physics_Cup_2024.pdf",
    dateSourceHref: "document/Physics_Cup_2024.pdf",
    links: [
      { label: "Solution", href: "document/Physics_Cup_2024.pdf" },
      { label: "Problem statement", href: "https://physicscup.ee/physics-cup-taltech-2024-problem-4/" }
    ]
  },
  // {
  //   title: "Self-learning Project",
  //   description: "A project focused primarily on further studying the field of electrodynamics.",
  //   dateSourceHref: "document/自主學習 電磁輻射.pdf",
  //   links: [
  //     { label: "Report", href: "document/自主學習 電磁輻射.pdf" },
  //     { label: "PPT", href: "document/自主學習 電磁輻射 PPT.pdf" }
  //   ]
  // },
  // {
  //   title: "Program Design",
  //   dateSourceHref: "document/Final_Report.pdf",
  //   links: [{ label: "Report", href: "document/Final_Report.pdf" }]
  // }
];
