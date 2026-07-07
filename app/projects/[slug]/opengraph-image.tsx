import { ImageResponse } from "next/og";
import { getProject, getProjectSlugs } from "@/lib/content";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project preview";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta } = getProject(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f3ee",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#6b7280" }}>
          {meta.category}
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>
            {meta.title}
          </div>
          <div style={{ fontSize: 34, color: "#374151", marginTop: 20 }}>
            {meta.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6b7280" }}>
          {site.name} · henrychen.com
        </div>
      </div>
    ),
    size
  );
}
