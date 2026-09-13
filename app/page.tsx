import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { Reveal } from "@/components/shell/Reveal";
import gelloHero from "@/assets/gello/hero.jpg";

function formatProjectDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function ProjectEntry({
  slug,
  title,
  tagline,
  date,
  tags,
  resources,
}: {
  slug: string;
  title: string;
  tagline: string;
  date: string;
  tags?: string[];
  resources?: { label: string; url: string }[];
}) {
  const meta = [formatProjectDate(date), ...(tags ?? [])].join(" · ");

  return (
    <div className="project-entry">
      <p className="project-meta">{meta}</p>
      <h3>
        <Link href={`/projects/${slug}`}>{title}</Link>
      </h3>
      <p className="project-tagline">{tagline}</p>
      {resources && resources.length > 0 && (
        <div className="project-links">
          {resources.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              {r.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      {/* Hero */}
      <section id="home" className="hero-editorial-section">
        <div className="container hero-meta-row">
          <div className="hero-meta-left">
            <p>ROBOTICS &amp; CONTROLS ENGINEER</p>
            <p>ENTREPRENEURSHIP</p>
          </div>
          <div className="hero-meta-right">
            <p>PHILADELPHIA, PA</p>
            <p>UPDATED 2026</p>
          </div>
        </div>

        <div className="container hero-editorial-grid">
          <Reveal className="hero-editorial-text">
            <h1 className="hero-editorial-title">
              Henry
              <br />
              <em>Chen.</em>
            </h1>
            <svg
              className="hero-editorial-underline"
              viewBox="0 0 320 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 9 Q 22 2, 42 9 T 82 9 T 122 9 T 162 9 T 202 9 T 242 9 T 282 9 T 318 9"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p className="hero-editorial-tagline">
              I design and build machines — robots, control systems, and
              hardware ventures that solve real problems with simple
              mechanical ideas.
            </p>
            <Link href="/about" className="hero-editorial-link">
              MORE ABOUT ME <span aria-hidden="true">&#8594;</span>
            </Link>
          </Reveal>

          <Reveal className="hero-editorial-media">
            {/* Placeholder photo — swap for the cursor-tracking 3D robot later */}
            <Image
              src={gelloHero}
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 90vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section">
        <div className="container">
          <Reveal>
            <h2 className="section-title section-title-italic">
              <em>Projects</em>
            </h2>
          </Reveal>
          <div className="projects-list">
            {projects.map((p) => (
              <ProjectEntry
                key={p.meta.slug}
                slug={p.meta.slug}
                title={p.meta.title}
                tagline={p.meta.tagline}
                date={p.meta.date}
                tags={p.meta.tags}
                resources={p.meta.resources}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
