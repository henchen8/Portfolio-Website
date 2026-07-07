import Image from "next/image";
import { Children, isValidElement } from "react";
import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";
import { VideoDemo } from "./VideoDemo";
import { PhoneMockup } from "./PhoneMockup";

type Images = Record<string, StaticImageData>;

/**
 * Two-column editorial section. Renders one or two columns depending on how
 * many children (<Text>/<Media>) it's given; `reverse` swaps their order and
 * `alt` gives the muted background used on alternating rows.
 */
function Section({
  children,
  reverse,
  alt,
}: {
  children: ReactNode;
  reverse?: boolean;
  alt?: boolean;
}) {
  const count = Children.toArray(children).filter(isValidElement).length;
  const classes = [
    "shinkei-section",
    reverse ? "shinkei-section-reverse" : "",
    alt ? "shinkei-section-alt" : "",
    count < 2 ? "shinkei-section-single" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return <section className={classes}>{children}</section>;
}

function Text({
  label,
  heading,
  children,
}: {
  label?: string;
  heading?: string;
  children: ReactNode;
}) {
  return (
    <div className="shinkei-text">
      {label && <span className="shinkei-label">{label}</span>}
      {heading && <h2 className="shinkei-heading">{heading}</h2>}
      {children}
    </div>
  );
}

function Media({
  children,
  stacked,
}: {
  children: ReactNode;
  stacked?: boolean;
}) {
  return (
    <div className={`shinkei-image${stacked ? " shinkei-image-components" : ""}`}>
      {children}
    </div>
  );
}

function makeFigure(images: Images) {
  return function Figure({
    img,
    alt,
    blend,
    max,
  }: {
    img: string;
    alt: string;
    blend?: boolean;
    max?: number;
  }) {
    const src = images[img];
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        sizes="(max-width: 968px) 90vw, 45vw"
        className={blend ? "shinkei-blend" : undefined}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: max ? `${max}px` : undefined,
        }}
      />
    );
  };
}

function Equation({ children }: { children: ReactNode }) {
  return <div className="shinkei-equation">{children}</div>;
}

function CodeBlock({ children }: { children: ReactNode }) {
  return <div className="shinkei-code">{children}</div>;
}

function TechTags({ items }: { items: string[] }) {
  return (
    <div className="project-tech">
      {items.map((t) => (
        <span key={t} className="tech-tag">
          {t}
        </span>
      ))}
    </div>
  );
}

/** Build the MDX components map for a given project's image registry. */
export function makeMdxComponents(images: Images = {}) {
  return {
    Section,
    Text,
    Media,
    Figure: makeFigure(images),
    Equation,
    CodeBlock,
    TechTags,
    VideoDemo,
    PhoneMockup,
  };
}
