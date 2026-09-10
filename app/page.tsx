import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { hero } from "@/lib/site";
import { Reveal } from "@/components/shell/Reveal";
import heroBg from "@/assets/home/hero.jpg";

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
      <section id="home" className="hero-section">
        <div className="hero-background">
          <Image
            src={heroBg}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{hero.greeting}</h1>
            <p className="hero-subtitle">{hero.subtitle}</p>
            <p className="hero-description">{hero.description}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                {hero.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Projects</h2>
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
