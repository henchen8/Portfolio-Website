import Image from "next/image";
import Link from "next/link";
import { getAllProjects } from "@/lib/content";
import { getImage } from "@/lib/projectImages";
import { experience, hero, assemblyLink } from "@/lib/site";
import { Reveal } from "@/components/shell/Reveal";
import heroBg from "@/assets/home/hero.jpg";
import assembly from "@/assets/home/assembly.png";

function ProjectCard({
  slug,
  title,
  tagline,
  href,
  featured,
}: {
  slug: string;
  title: string;
  tagline: string;
  href: string;
  featured?: boolean;
}) {
  const img = getImage(slug, "card");
  return (
    <Link
      href={href}
      className={`project-card${featured ? " featured-project-card" : ""}`}
    >
      <div className="project-image">
        {img && (
          <Image
            src={img}
            alt={title}
            placeholder="blur"
            sizes={featured ? "(max-width: 968px) 90vw, 55vw" : "(max-width: 968px) 45vw, 30vw"}
            style={{ objectFit: "cover" }}
            fill
          />
        )}
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p className="project-tagline">{tagline}</p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const projects = getAllProjects();
  const featured = projects.find((p) => p.meta.featured);
  const others = projects.filter((p) => !p.meta.featured);

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

      {/* Experience */}
      <section id="experience" className="experience-section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Experience</h2>
          </Reveal>
          <div className="timeline">
            {experience.map((e) => (
              <Reveal key={`${e.org}-${e.role}`} className="timeline-item">
                <div className="timeline-marker" aria-hidden="true" />
                <div className="timeline-content">
                  <h3>{e.role}</h3>
                  <p className="timeline-company">
                    {e.org} • {e.period}
                  </p>
                  <p>{e.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gap / assembly */}
      <section className="gap-section">
        <div className="gap-container">
          <a
            href={assemblyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="assembly-link"
            aria-label="View the CAD assembly on Onshape"
          >
            <Image
              src={assembly}
              alt="Rubik's Cube robot CAD assembly"
              className="assembly-image"
              sizes="(max-width: 768px) 90vw, 600px"
            />
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Projects</h2>
          </Reveal>
          <div className="projects-layout">
            <div className="featured-project-column">
              {featured && (
                <>
                  <p className="column-title">Featured Project</p>
                  <ProjectCard
                    slug={featured.meta.slug}
                    title={featured.meta.title}
                    tagline={featured.meta.tagline}
                    href={`/projects/${featured.meta.slug}?from=tile`}
                    featured
                  />
                </>
              )}
            </div>
            <div className="additional-projects-column">
              <p className="column-title">More Projects</p>
              <div className="additional-projects-stack">
                {others.map((p) => (
                  <ProjectCard
                    key={p.meta.slug}
                    slug={p.meta.slug}
                    title={p.meta.title}
                    tagline={p.meta.tagline}
                    href={`/projects/${p.meta.slug}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
