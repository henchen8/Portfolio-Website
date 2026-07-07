import Image from "next/image";
import logo from "@/assets/logo.png";

/**
 * Single source of truth for the brand mark. Swap `assets/logo.png` (or this
 * component) when the design pass delivers a new logo — every usage updates.
 */
export function Logo({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={logo}
      alt="Henry Chen logo"
      width={size}
      height={size}
      className={className}
      style={{ height: size, width: "auto", objectFit: "contain" }}
      priority
    />
  );
}
