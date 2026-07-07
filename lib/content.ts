import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Stat = { value: string; label: string };
export type ResourceLink = { label: string; url: string };

export type ProjectMeta = {
  slug: string;
  /** Home card title */
  title: string;
  /** Home card tagline */
  tagline: string;
  /** Uppercase eyebrow on the project page */
  category: string;
  /** Large serif headline on the project page */
  heroTitle: string;
  heroSubtitle: string;
  /** Meta description for SEO + preview cards */
  description: string;
  date: string;
  order: number;
  featured?: boolean;
  tags?: string[];
  stats?: Stat[];
  resources?: ResourceLink[];
  /** Image registry keys (see lib/projectImages.ts) */
  heroImage: string;
  cardImage: string;
};

export type Project = {
  meta: ProjectMeta;
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) =>
      fs.existsSync(path.join(CONTENT_DIR, entry.name, "index.mdx"))
    )
    .map((entry) => entry.name);
}

export function getProject(slug: string): Project {
  const file = path.join(CONTENT_DIR, slug, "index.mdx");
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const meta = { slug, ...(data as Omit<ProjectMeta, "slug">) };
  return { meta, body: content };
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => getProject(slug))
    .sort((a, b) => a.meta.order - b.meta.order);
}
