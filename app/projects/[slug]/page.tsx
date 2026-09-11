import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getProject, getProjectSlugs } from "@/lib/content";
import { getImage } from "@/lib/projectImages";
import { makeMdxComponents } from "@/components/project/mdx";
import { ProjectLayout } from "@/components/project/ProjectLayout";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) return {};
  const { meta } = getProject(slug);
  const url = `${site.url}/projects/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) notFound();

  const { meta, body } = getProject(slug);
  const images = (await import("@/lib/projectImages")).projectImages[slug] ?? {};
  const components = makeMdxComponents(images);

  const { content } = await compileMDX({
    source: body,
    components,
    // Content is authored locally by the site owner, not user-submitted, so it's safe to
    // allow JS expressions (e.g. `<TechTags items={[...]} />`). next-mdx-remote v6 blocks
    // these by default as a hardening against untrusted MDX; blockDangerousJS stays on to
    // still reject genuinely dangerous constructs (eval, require, process, fs, etc.).
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm] },
      blockJS: false,
    },
  });

  return (
    <ProjectLayout meta={meta} heroSrc={getImage(slug, meta.heroImage)}>
      {content}
    </ProjectLayout>
  );
}
