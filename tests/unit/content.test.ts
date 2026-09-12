import { describe, it, expect } from "vitest";
import { getAllProjects, getProjectSlugs } from "@/lib/content";
import { site, hero, experience } from "@/lib/site";
import { projectImages } from "@/lib/projectImages";

describe("content data layer", () => {
  const projects = getAllProjects();

  it("exposes all five projects", () => {
    expect(getProjectSlugs().sort()).toEqual([
      "financial-derivatives",
      "fitbox",
      "gello-teleoperation",
      "rubiks-cube",
      "rubiks-cube-v2",
    ]);
  });

  it("sorts projects by order with rubiks-cube-v2 featured first", () => {
    expect(projects.map((p) => p.meta.slug)).toEqual([
      "rubiks-cube-v2",
      "gello-teleoperation",
      "financial-derivatives",
      "rubiks-cube",
      "fitbox",
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

  it("has real V2 copy for the redesigned mechanical and electrical systems", () => {
    const v2 = projects.find((p) => p.meta.slug === "rubiks-cube-v2")!;
    expect(v2.meta.tagline).not.toMatch(/TODO/);
    expect(v2.meta.heroTitle).not.toMatch(/TODO/);
    expect(v2.meta.heroSubtitle).not.toMatch(/TODO/);
    expect(v2.meta.description).not.toMatch(/TODO/);
    expect(v2.meta.tags).not.toContain("TODO");
    expect(v2.body).toMatch(/Pixy2\.1/);
    expect(v2.body).toMatch(/PCB/);
  });

  it("describes the GELLO leader arm's real hardware", () => {
    const gello = projects.find((p) => p.meta.slug === "gello-teleoperation")!;
    expect(gello.meta.tags).not.toContain("TODO");
    expect(gello.body).toMatch(/i2rt YAM/);
    expect(gello.body).not.toMatch(/iTurtle/);
    expect(gello.body).toMatch(/Feetech STS3215/);
    expect(gello.body).toMatch(/USB-C/);
  });

  it("orders V2's sections differently from V1's template order", () => {
    const v1 = projects.find((p) => p.meta.slug === "rubiks-cube")!;
    const v2 = projects.find((p) => p.meta.slug === "rubiks-cube-v2")!;
    expect(v1.body.indexOf("MECHANICAL DESIGN")).toBeLessThan(
      v1.body.indexOf("ELECTRICAL SYSTEM")
    );
    expect(v2.body.indexOf("ELECTRICAL SYSTEM")).toBeLessThan(
      v2.body.indexOf("MECHANICAL DESIGN")
    );
    expect(v2.body).toMatch(/WHAT'S NEW IN V2/);
  });

  it("reserves a GELLO demo slot and links the real repo", () => {
    const gello = projects.find((p) => p.meta.slug === "gello-teleoperation")!;
    expect(gello.body).toMatch(/SIMULATION DEMO/);
    expect(gello.meta.resources?.some((r) => r.url.includes("parametricpbc/pello"))).toBe(
      true
    );
  });

  it("adds a BOM section to V1 (placeholder) and GELLO (real data)", () => {
    const v1 = projects.find((p) => p.meta.slug === "rubiks-cube")!;
    const gello = projects.find((p) => p.meta.slug === "gello-teleoperation")!;
    expect(v1.body).toMatch(/BILL OF MATERIALS/);
    expect(gello.body).toMatch(/BILL OF MATERIALS/);
    expect(gello.body).toMatch(/373\.93/);
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
