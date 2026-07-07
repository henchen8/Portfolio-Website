import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjectSlugs().map((slug) => ({
    url: `${site.url}/projects/${slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects,
  ];
}
