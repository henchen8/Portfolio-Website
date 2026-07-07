import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import type { ProjectMeta } from "@/lib/content";

function BackLink() {
  return (
    <Link href="/#projects" className="shinkei-back">
      <span className="back-arrow" aria-hidden="true">
        ←
      </span>
      Back to Projects
    </Link>
  );
}

export function ProjectLayout({
  meta,
  heroSrc,
  children,
}: {
  meta: ProjectMeta;
  heroSrc?: StaticImageData;
  children: React.ReactNode;
}) {
  return (
    <div className="shinkei-page">
      <nav className="shinkei-nav">
        <BackLink />
      </nav>

      <header className="shinkei-hero">
        <div className="shinkei-hero-content">
          <span className="shinkei-category">{meta.category}</span>
          <h1 className="shinkei-title">{meta.heroTitle}</h1>
          <p className="shinkei-subtitle">{meta.heroSubtitle}</p>
        </div>
        {heroSrc && (
          <div className="shinkei-hero-image">
            <Image
              src={heroSrc}
              alt={meta.title}
              placeholder="blur"
              sizes="(max-width: 968px) 90vw, 45vw"
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}
      </header>

      {meta.stats && meta.stats.length > 0 && (
        <section className="shinkei-stats" aria-label="Key stats">
          {meta.stats.map((s) => (
            <div className="shinkei-stat" key={s.label}>
              <span className="stat-number">{s.value}</span>
              <span className="stat-desc">{s.label}</span>
            </div>
          ))}
        </section>
      )}

      {children}

      {meta.resources && meta.resources.length > 0 && (
        <section className="shinkei-resources">
          <span className="shinkei-label">RESOURCES</span>
          <div className="shinkei-links">
            {meta.resources.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {r.label}
                <span className="link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      <footer className="shinkei-footer">
        <BackLink />
      </footer>
    </div>
  );
}
