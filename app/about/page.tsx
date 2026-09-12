import type { Metadata } from "next";
import { hero, experience } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: hero.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="about-section">
      <div className="container about-container">
        {/* TODO: swap for a real next/image portrait when one is available */}
        <div className="about-photo-placeholder" aria-hidden="true">
          Photo
        </div>
        <div className="about-intro">
          <h1 className="about-title">About</h1>
          <p className="about-bio">TODO: full personal bio.</p>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Experience</h2>
        <ul className="about-timeline">
          {experience.map((entry) => (
            <li key={`${entry.org}-${entry.period}`} className="about-timeline-entry">
              <p className="about-timeline-period">{entry.period}</p>
              <h3>
                {entry.role} · {entry.org}
              </h3>
              <p className="about-timeline-desc">{entry.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
