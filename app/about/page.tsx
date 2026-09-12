import type { Metadata } from "next";
import Image from "next/image";
import { experience, site } from "@/lib/site";
import { Reveal } from "@/components/shell/Reveal";
import headshot from "@/assets/about/headshot.jpg";
import emailIcon from "@/assets/icons/email.png";
import linkedinIcon from "@/assets/icons/linkedin.png";

export const metadata: Metadata = {
  title: "About",
  description:
    "A bit about Henry Chen — EE/Robotics student and Varsity Student-Athlete at Penn, plus what he's up to outside the classroom.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="about-section">
      <div className="container about-container">
        <div className="about-photo">
          <Image
            src={headshot}
            alt="Henry Chen"
            placeholder="blur"
            sizes="220px"
            style={{ objectFit: "cover" }}
            fill
            priority
          />
        </div>
        <Reveal className="about-intro">
          <h1 className="about-title">About</h1>
          <p className="about-bio">
            I&apos;m Henry Chen, a Varsity Student-Athlete at the University
            of Pennsylvania studying Electrical Engineering with a
            concentration in Controls and Robotics. I like building
            things — from autonomous robots to hardware ventures — and
            I&apos;m always looking for the next interesting problem to
            work on.
          </p>
          <div className="about-contact-links">
            <a
              href={site.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-link"
              aria-label="Send email via Gmail"
            >
              <Image src={emailIcon} alt="" width={28} height={28} />
              <span>Email</span>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-link"
              aria-label="LinkedIn profile"
            >
              <Image src={linkedinIcon} alt="" width={22} height={22} />
              <span>LinkedIn</span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="container about-outside">
        <Reveal>
          <h2 className="about-outside-title">Outside the Classroom</h2>
          <p className="about-outside-text">
            Outside of class, you&apos;ll usually find me on a golf course,
            trying out a new restaurant, or on the tennis court. I&apos;m a
            big basketball fan and love catching a game with friends
            whenever I can — most of my free time comes down to spending
            it with the people around me.
          </p>
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
