import type { Metadata } from "next";
import Image from "next/image";
import { experience, site } from "@/lib/site";
import { Reveal } from "@/components/shell/Reveal";
import headshot from "@/assets/about/headshot.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "A bit about Henry Chen — EE/Robotics student and Varsity Student-Athlete at Penn, plus what he's up to outside the classroom.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="about-section">
      <div className="container about-hero">
        <Reveal className="about-hero-text">
          <p className="about-eyebrow">About / Henry Chen</p>
          <h1 className="about-heading">
            Hi, I&apos;m
            <br />
            Henry Chen.
          </h1>
          <p className="about-categories">
            Robotics / Controls / Entrepreneurship
          </p>
          <p className="about-bio">
            I&apos;m a Varsity Student-Athlete at the University of
            Pennsylvania, studying Electrical Engineering with a
            concentration in Controls and Robotics. I like building
            things — from autonomous robots to hardware ventures — and
            I&apos;m always looking for the next interesting problem to
            work on.
          </p>
          <hr className="about-divider" />
          <p className="about-bio">
            Outside of class, you&apos;ll usually find me on a golf
            course, trying out a new restaurant, or on the tennis
            court. I&apos;m a big basketball fan and love catching a
            game with friends whenever I can.
          </p>
        </Reveal>

        <Reveal className="about-hero-media">
          <div className="about-photo-frame">
            <Image
              src={headshot}
              alt="Henry Chen"
              placeholder="blur"
              sizes="(max-width: 900px) 90vw, 40vw"
              style={{ objectFit: "cover" }}
              fill
              priority
            />
          </div>
          <div className="about-contact-row">
            <a
              href={site.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-link"
            >
              {site.email} <span aria-hidden="true">&#8599;</span>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-link"
            >
              LinkedIn <span aria-hidden="true">&#8599;</span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="container">
        <Reveal>
          <h2 className="about-experience-title">Experience</h2>
        </Reveal>
        <ul className="about-experience-list">
          {experience.map((entry) => (
            <li key={`${entry.org}-${entry.period}`}>
              <Reveal className="about-experience-entry">
                <p className="about-experience-role">
                  {entry.role} · {entry.org}
                </p>
                <p className="about-experience-period">{entry.period}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
