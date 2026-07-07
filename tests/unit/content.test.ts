import { describe, it, expect } from "vitest";
import { getAllProjects, getProjectSlugs } from "@/lib/content";
import { site, hero, experience } from "@/lib/site";
import { projectImages } from "@/lib/projectImages";

describe("content data layer", () => {
  const projects = getAllProjects();

  it("exposes the three projects", () => {
    expect(getProjectSlugs().sort()).toEqual([
      "financial-derivatives",
      "fitbox",
      "rubiks-cube",
    ]);
  });

  it("sorts projects by order with rubiks-cube featured first", () => {
    expect(projects.map((p) => p.meta.slug)).toEqual([
      "rubiks-cube",
      "fitbox",
      "financial-derivatives",
    ]);
    expect(projects[0].meta.featured).toBe(true);
  });

  it("gives every project the fields the template and SEO need", () => {
    for (const { meta } of projects) {
      expect(meta.title).toBeTruthy();
      expect(meta.tagline).toBeTruthy();
      expect(meta.description.length).toBeGreaterThan(20);
      expect(meta.category).toBeTruthy();
      expect(meta.heroTitle).toBeTruthy();
      expect(meta.resources?.length).toBeGreaterThan(0);
      // Every image key referenced in frontmatter must resolve in the registry.
      expect(projectImages[meta.slug]?.[meta.heroImage]).toBeDefined();
      expect(projectImages[meta.slug]?.[meta.cardImage]).toBeDefined();
    }
  });

  it("preserves all external resource links as https URLs", () => {
    const urls = projects.flatMap((p) =>
      (p.meta.resources ?? []).map((r) => r.url)
    );
    expect(urls.length).toBeGreaterThanOrEqual(11);
    for (const url of urls) expect(url).toMatch(/^https:\/\//);
  });

  it("keeps the Rubik's stats and drops the timer", () => {
    const rubiks = projects.find((p) => p.meta.slug === "rubiks-cube")!;
    expect(rubiks.meta.stats?.map((s) => s.value)).toEqual([
      "<1s",
      "<20",
      "$125",
      "6",
    ]);
    // No synced-timer artifacts should remain in the content.
    expect(rubiks.body).not.toMatch(/SOLVE TIME|toFixed|0\.997/);
  });

  it("reduces FitBox to a splash+landing dummy via PhoneMockup", () => {
    const fitbox = projects.find((p) => p.meta.slug === "fitbox")!;
    expect(fitbox.body).toContain("<PhoneMockup");
    expect(fitbox.body).not.toContain("IPhoneMockup");
  });
});

describe("site data", () => {
  it("keeps the personal Gmail contact address", () => {
    expect(site.email).toBe("henwchen@gmail.com");
    expect(site.gmailCompose).toContain("henwchen@gmail.com");
  });

  it("fixes the Athelete -> Athlete typo", () => {
    expect(hero.description).toContain("Student-Athlete");
    expect(hero.description).not.toContain("Athelete");
  });

  it("carries all four experience entries in order", () => {
    expect(experience).toHaveLength(4);
    expect(experience[0].org).toContain("Parametric");
    expect(experience[3].org).toContain("Management and Technology");
  });
});
